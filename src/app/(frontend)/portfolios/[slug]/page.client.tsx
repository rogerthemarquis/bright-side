'use client'
import type { Portfolio } from '@/payload-types'

import { Media } from '@/components/Media'
import React from 'react'

export default function PortfolioClient({ portfolio }: { portfolio: Portfolio }) {
  const { profile, gallery, appointmentForm, formTitle, formDescription } = portfolio

  return (
    <article className="pb-24">
      {/* Artist Profile Section */}
      {profile && (
        <div className="container my-16">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden">
              {typeof profile.profileImage === 'object' && profile.profileImage !== null && (
                <Media resource={profile.profileImage} className="object-cover w-full h-full" />
              )}
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold">{profile.artistName}</h1>
              {profile.specialty && (
                <p className="text-xl text-gray-600 dark:text-gray-400">{profile.specialty}</p>
              )}
              <p className="text-lg leading-relaxed whitespace-pre-line">{profile.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {gallery?.images && Array.isArray(gallery.images) && gallery.images.length > 0 && (
        <div className="container my-16">
          {gallery.title && (
            <h2 className="text-3xl font-bold mb-8 text-center">{gallery.title}</h2>
          )}
          <div
            className={`grid ${
              gallery.columns === '2'
                ? 'grid-cols-1 md:grid-cols-2'
                : gallery.columns === '4'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            } gap-2 md:gap-4`}
          >
            {gallery.images.map((image, index) => {
              if (typeof image === 'object' && image !== null) {
                return (
                  <div
                    key={image.id || index}
                    className="relative aspect-square rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    <Media
                      resource={image}
                      imgClassName="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      )}

      {/* Appointment Form Section */}
      {appointmentForm && (
        <div className="container my-16">
          <div className="max-w-2xl mx-auto">
            {formTitle && <h2 className="text-3xl font-bold mb-4 text-center">{formTitle}</h2>}
            {formDescription && (
              <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
                {formDescription}
              </p>
            )}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
              <p className="text-center text-gray-500">Form component will be rendered here</p>
              {/* TODO: Integrate actual form rendering */}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
