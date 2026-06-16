import React from 'react'

export default function LoadingProfile() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      {/* Profile Header Shimmer */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>
        <div className="flex-1 w-full text-center sm:text-left pt-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md mx-auto sm:mx-0 mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mx-auto sm:mx-0 mb-4"></div>
          <div className="space-y-2 max-w-md mx-auto sm:mx-0">
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
        <div className="flex gap-3 sm:flex-col shrink-0 w-full sm:w-32 mt-2 sm:mt-0">
          <div className="h-20 flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="h-20 flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>

      {/* Tabs Shimmer */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 mb-6">
        <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded-t-lg"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-t-lg opacity-50"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-t-lg opacity-50"></div>
      </div>

      {/* Content Shimmer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Badges/Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
              <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
              <div className="h-16 w-full bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
