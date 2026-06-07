'use server'

import { createClient } from '@/lib/supabase/server'
import { questionSchema, answerSchema } from '@/lib/validators'
import { createSlug } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function createQuestion(data: {
  title: string
  content: Record<string, unknown>
  contentText: string
  tagIds: string[]
}) {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const validated = questionSchema.parse(data)

  const slug = `${createSlug(validated.title)}-${Date.now()}`

  const { data: question, error } = await supabase
    .from('questions')
    .insert({
      title: validated.title,
      slug,
      content: validated.content,
      content_text: validated.contentText,
      user_id: user.id,
      status: 'HALL',
    })
    .select('id, slug')
    .single()

  if (error) throw error

  // Add tags
  if (validated.tagIds.length > 0) {
    await supabase.from('question_tags').insert(
      validated.tagIds.map(tagId => ({ question_id: question.id, tag_id: tagId }))
    )
  }

  revalidatePath('/questions')
  return { success: true, slug: question.slug }
}

export async function updateQuestionStatus(
  questionId: string,
  status: 'HALL' | 'MAUQUF' | 'TERSELESAIKAN' | 'MUGHLAQ',
  reason?: string
) {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Only MURAQI and MUDIR can change status, or owner can accept answer
  if (profile?.role !== 'MURAQI' && profile?.role !== 'MUDIR') {
    throw new Error('Insufficient permissions')
  }

  const { error } = await supabase
    .from('questions')
    .update({
      status,
      mughlaq_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq('id', questionId)

  if (error) throw error

  revalidatePath('/questions')
  return { success: true }
}

export async function acceptAnswer(answerId: string, questionId: string) {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // Check if user is question owner
  const { data: question } = await supabase
    .from('questions')
    .select('user_id')
    .eq('id', questionId)
    .single()

  if (question?.user_id !== user.id) {
    throw new Error('Only question owner can accept answer')
  }

  // Update question
  const { error: updateError } = await supabase
    .from('questions')
    .update({
      status: 'TERSELESAIKAN',
      accepted_answer_id: answerId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', questionId)

  if (updateError) throw updateError

  // Mark answer as accepted
  const { error: answerError } = await supabase
    .from('answers')
    .update({ is_accepted: true })
    .eq('id', answerId)

  if (answerError) throw answerError

  revalidatePath('/questions')
  return { success: true }
}

export async function submitAnswer(data: {
  questionId: string
  content: Record<string, unknown>
  contentText: string
}) {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const validated = answerSchema.parse({
    content: data.content,
    contentText: data.contentText,
  })

  const { error } = await supabase
    .from('answers')
    .insert({
      question_id: data.questionId,
      user_id: user.id,
      content: validated.content,
      content_text: validated.contentText,
    })

  if (error) throw error

  revalidatePath(`/questions`)
  return { success: true }
}

export async function castVote(
  targetId: string,
  targetType: 'QUESTION' | 'ANSWER',
  value: 1 | -1
) {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // Check for existing vote
  const { data: existing } = await supabase
    .from('votes')
    .select('id, value')
    .eq('user_id', user.id)
    .eq('target_id', targetId)
    .eq('target_type', targetType)
    .single()

  if (existing) {
    if (existing.value === value) {
      // Remove vote (toggle off)
      await supabase.from('votes').delete().eq('id', existing.id)
    } else {
      // Update vote value
      await supabase
        .from('votes')
        .update({ value })
        .eq('id', existing.id)
    }
  } else {
    // Insert new vote
    await supabase.from('votes').insert({
      user_id: user.id,
      target_id: targetId,
      target_type: targetType,
      value,
    })
  }

  revalidatePath('/questions')
  return { success: true }
}

export async function addComment(data: {
  content: string
  targetId: string
  targetType: 'QUESTION' | 'ANSWER'
  parentId?: string
}) {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('comments')
    .insert({
      content: data.content,
      user_id: user.id,
      target_id: data.targetId,
      target_type: data.targetType,
      parent_id: data.parentId,
    })

  if (error) throw error

  revalidatePath('/questions')
  return { success: true }
}
