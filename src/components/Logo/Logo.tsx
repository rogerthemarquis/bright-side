import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Bright Side Logo"
        width={320}
        height={320}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="w-16 h-16 object-contain"
        src="/api/media/file/bs_logo.jpg"
      />
      <span className="text-xl font-semibold hidden md:inline">Bright Side Tattoos</span>
    </div>
  )
}
