import React from 'react'

export default function QuestionsLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-250 dark:border-gray-805">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-4 w-96 bg-gray-150 dark:bg-gray-850 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-gray-250 dark:bg-gray-800 rounded-lg"></div>
      </div>

      {/* Navigation Tabs & Sorting Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Status Tabs skeleton */}
        <div className="flex gap-1 bg-gray-100/50 dark:bg-gray-900/40 p-1 rounded-xl border border-gray-150 dark:border-gray-850 w-full lg:w-auto overflow-hidden">
          <div className="h-9 w-16 bg-gray-250 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-9 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>

        {/* Sorting Buttons skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="flex rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="h-7 w-20 bg-gray-150 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-850"></div>
            <div className="h-7 w-20 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-850"></div>
            <div className="h-7 w-20 bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Cards List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-5 rounded-xl shadow-sm"
          >
            {/* Stats Sidebar Skeleton */}
            <div className="flex sm:flex-col gap-3 sm:gap-2 justify-between sm:justify-start items-center sm:items-stretch w-full sm:w-28 shrink-0">
              <div className="h-12 w-full bg-gray-150 dark:bg-gray-850 rounded-lg"></div>
              <div className="h-12 w-full bg-gray-100/50 dark:bg-gray-900/40 rounded-lg border border-gray-150 dark:border-gray-850"></div>
              <div className="h-4 w-16 bg-gray-150 dark:bg-gray-800 rounded self-center"></div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="h-5 w-20 bg-gray-250 dark:bg-gray-800 rounded-full"></div>
                </div>
                <div className="h-4 w-full bg-gray-150 dark:bg-gray-850 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-900 rounded"></div>
              </div>

              {/* Tags & User Metadata Skeleton */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100/50 dark:border-gray-800/30">
                {/* Tag pills skeleton */}
                <div className="flex gap-1.5">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                </div>

                {/* Author Badge skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-805"></div>
                  <div className="space-y-1">
                    <div className="h-3 w-16 bg-gray-205 dark:bg-gray-800 rounded"></div>
                    <div className="h-2 w-12 bg-gray-150 dark:bg-gray-850 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
