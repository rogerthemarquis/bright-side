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
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdownIndex])

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        if (item.type === 'artistsDropdown') {
          const isOpen = openDropdownIndex === i

          return (
            <div
              key={i}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[i] = el
              }}
            >
              <button
                onClick={() => setOpenDropdownIndex(isOpen ? null : i)}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
              >
                Artists
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && portfolios.length > 0 && (
                <div className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {portfolios.map((portfolio) => (
                      <Link
                        key={portfolio.id}
                        href={`/portfolios/${portfolio.slug}`}
                        className="block px-4 py-2 text-sm text-primary hover:bg-accent transition-colors"
                        onClick={() => setOpenDropdownIndex(null)}
                      >
                        {portfolio.profile?.artistName || 'Untitled'}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        return <CMSLink key={i} {...item.link} appearance="link" />
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
