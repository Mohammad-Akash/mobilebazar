import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`motion-safe:animate-pulse bg-[#E9E7EF] dark:bg-[#2D2947] rounded-md ${className}`}
      aria-hidden="true"
      {...props}
    />
  )
}
