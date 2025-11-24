import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ title, images, columns = '3' }) => {
  const columnClass = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <div className="container my-16">
      {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
      <div className={`grid ${columnClass} gap-4`}>
        {Array.isArray(images) &&
          images.map((image, index) => {
            if (typeof image === 'object' && image !== null) {
              return (
                <div
                  key={image.id || index}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Media
                    resource={image}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
