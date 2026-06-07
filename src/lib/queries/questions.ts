'use server'

import { createClient } from '@/lib/supabase/server'

export async function getQuestions(
  page: number = 1,
  limit: number = 20,
  status?: string,
  sortBy: 'latest' | 'popular' | 'answered' = 'latest',
  searchQuery?: string,
  tagSlug?: string
) {
  const supabase = (await createClient()) as any

  let selectString = `
    id,
    title,
    slug,
    content,
    content_text,
    status,
    views,
    upvotes,
    downvotes,
    total_answers,
    created_at,
    updated_at,
    user_id,
    profiles!questions_user_id_fkey (id, username, display_name, role, reputation),
    question_tags (
      tags (id, name, slug, color, icon)
    )
  `

  if (tagSlug && tagSlug.trim() !== '') {
    selectString = `
      id,
      title,
      slug,
      content,
      content_text,
      status,
      views,
      upvotes,
      downvotes,
      total_answers,
      created_at,
      updated_at,
      user_id,
      profiles!questions_user_id_fkey (id, username, display_name, role, reputation),
      question_tags!inner (
        tags!inner (id, name, slug, color, icon)
      )
    `
  }

  let query = supabase.from('questions').select(selectString, { count: 'exact' })

  // Apply filters
  if (status && status !== 'ALL') {
    query = query.eq('status', status)
  }

  // Apply search query
  if (searchQuery && searchQuery.trim() !== '') {
    query = query.or(`title.ilike.%${searchQuery.trim()}%,content_text.ilike.%${searchQuery.trim()}%`)
  }

  // Apply tag filter
  if (tagSlug && tagSlug.trim() !== '') {
    query = query.eq('question_tags.tags.slug', tagSlug.trim())
  }

  // Apply sorting
  if (sortBy === 'popular') {
    query = query.order('upvotes', { ascending: false })
  } else if (sortBy === 'answered') {
    query = query.order('total_answers', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  // Pagination
  const start = (page - 1) * limit
  query = query.range(start, start + limit - 1)

  const { data, count, error } = await query

  if (error) throw error

  return {
    questions: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getQuestionBySlug(slug: string) {
  const supabase = (await createClient()) as any

  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(slug)
  const filterColumn = isUuid ? 'id' : 'slug'

  const { data: question, error } = await supabase
    .from('questions')
    .select(
      `
      id,
      title,
      slug,
      content,
      content_text,
      status,
      views,
      upvotes,
      downvotes,
      total_answers,
      accepted_answer_id,
      created_at,
      updated_at,
      user_id,
      profiles!questions_user_id_fkey (id, username, display_name, role, reputation, avatar_url),
      question_tags (
        tags (id, name, slug, color, icon)
      )
      `
    )
    .eq(filterColumn, slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  if (!question) return null

  // Increment views
  await supabase
    .from('questions')
    .update({ views: (question.views || 0) + 1 })
    .eq('id', question.id)

  // Get answers
  const { data: answers } = await supabase
    .from('answers')
    .select(
      `
      id,
      content,
      content_text,
      is_accepted,
      upvotes,
      downvotes,
      created_at,
      updated_at,
      user_id,
      profiles!answers_user_id_fkey (id, username, display_name, role, reputation, avatar_url),
      references (
        id,
        jilid,
        bab,
        halaman,
        teks_arab,
        terjemah,
        validation_status,
        kitab_master (id, nama_latin, nama_arab, pengarang)
      )
      `
    )
    .eq('question_id', question.id)
    .order('is_accepted', { ascending: false })
    .order('upvotes', { ascending: false })

  // Get comments
  const { data: comments } = await supabase
    .from('comments')
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      profiles!comments_user_id_fkey (id, username, display_name, avatar_url)
      `
    )
    .eq('target_id', question.id)
    .eq('target_type', 'QUESTION')
    .order('created_at', { ascending: true })

  // Get user votes
  const { data: { user } } = await supabase.auth.getUser()
  const userVotes: Record<string, number> = {}

  if (user) {
    const targetIds = [question.id, ...(answers || []).map((a: any) => a.id)]
    const { data: votesData } = await supabase
      .from('votes')
      .select('target_id, value')
      .eq('user_id', user.id)
      .in('target_id', targetIds)

    if (votesData) {
      votesData.forEach((v: any) => {
        userVotes[v.target_id] = v.value
      })
    }
  }

  return {
    ...question,
    answers: answers || [],
    comments: comments || [],
    userVotes,
  }
}

export async function getAnswersByQuestion(questionId: string) {
  const supabase = (await createClient()) as any

  const { data, error } = await supabase
    .from('answers')
    .select(
      `
      id,
      content,
      content_text,
      is_accepted,
      upvotes,
      downvotes,
      created_at,
      updated_at,
      user_id,
      profiles!answers_user_id_fkey (id, username, display_name, role, reputation, avatar_url),
      references (
        id,
        jilid,
        bab,
        halaman,
        teks_arab,
        terjemah,
        validation_status,
        kitab_master (id, nama_latin, nama_arab, pengarang)
      )
      `
    )
    .eq('question_id', questionId)
    .order('is_accepted', { ascending: false })
    .order('upvotes', { ascending: false })

  if (error) throw error

  return data || []
}

export async function searchQuestions(query: string, limit: number = 10) {
  const supabase = (await createClient()) as any

  const { data, error } = await supabase
    .from('questions')
    .select(
      `
      id,
      title,
      slug,
      content_text,
      status,
      created_at,
      profiles!questions_user_id_fkey (username)
      `
    )
    .or(`title.ilike.%${query}%,content_text.ilike.%${query}%`)
    .limit(limit)

  if (error) throw error

  return data || []
}
