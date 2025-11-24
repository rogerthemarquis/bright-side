'use client'

import React, { useState, useRef, useEffect } from 'react'

import type { Header as HeaderType, Portfolio } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; portfolios: Portfolio[] }> = ({
  data,
  portfolios,
}) => {
  const navItems = data?.navItems || []
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="flex gap-3 items-center">
      {/* Artists Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
        >
          Artists
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && portfolios.length > 0 && (
          <div className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
            <div className="py-1">
              {portfolios.map((portfolio) => (
                <Link
                  key={portfolio.id}
                  href={`/portfolios/${portfolio.slug}`}
                  className="block px-4 py-2 text-sm text-primary hover:bg-accent transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {portfolio.profile?.artistName || 'Untitled'}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
