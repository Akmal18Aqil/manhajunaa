import { NextResponse } from 'next/server'
import questions from '@/app/(main)/questions/api/mock/questions.json'

export function GET() {
  return NextResponse.json(questions)
}
