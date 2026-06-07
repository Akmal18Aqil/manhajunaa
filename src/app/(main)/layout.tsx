import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { getCurrentUser } from '@/lib/actions/auth.actions'

export default async function QuestionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar currentUser={currentUser} />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Sidebar className="w-64 hidden md:block shrink-0 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-64px)]" />
        
        {/* Main Content Area */}
        <main className="flex-1 py-8 md:pl-8 overflow-x-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
