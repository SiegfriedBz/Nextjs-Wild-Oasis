'use client'

import { useState } from 'react'

type TProps = {
  children: React.ReactNode
  className?: string
}

const TextExpander = ({ children, className = '' }: TProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayText = isExpanded
    ? children
    : typeof children === 'string'
    ? children.split(' ').slice(0, 40).join(' ') + '...'
    : children

  return (
    <span
      className={`max-sm:text-justify
      max-sm:text-base sm:text-lg ${className}`}
    >
      {displayText}{' '}
      <button
        className='text-primary-600 border-b border-primary-400 leading-1 pb-1'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  )
}

export default TextExpander
