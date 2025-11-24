import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const metadata: Metadata = {
  title: 'Artist Portfolios',
  description: 'Browse our talented artists and their work',
}

export default async function PortfoliosPage() {
  const payload = await getPayload({ config: configPromise })

  const portfolios = await payload.find({
    collection: 'portfolios',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.docs.map((portfolio) => (
          <Link key={portfolio.id} href={`/portfolios/${portfolio.slug}`} className="group block">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              {typeof portfolio.profile?.profileImage === 'object' &&
                portfolio.profile.profileImage !== null && (
                  <Media
                    resource={portfolio.profile.profileImage}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}
            </div>
            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
              {portfolio.profile?.artistName || portfolio.title}
            </h2>
            {portfolio.profile?.specialty && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">{portfolio.profile.specialty}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
