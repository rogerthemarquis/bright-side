import type { ArtistProfileBlock as ArtistProfileBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'

export const ArtistProfileBlock: React.FC<ArtistProfileBlockProps> = ({
  profileImage,
  artistName,
  specialty,
  bio,
}) => {
  return (
    <div className="container my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          {typeof profileImage === 'object' && profileImage !== null && (
            <Media resource={profileImage} className="object-cover w-full h-full" />
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">{artistName}</h2>
          {specialty && <p className="text-xl text-gray-600 dark:text-gray-400">{specialty}</p>}
          <p className="text-lg leading-relaxed whitespace-pre-line">{bio}</p>
        </div>
      </div>
    </div>
  )
}
