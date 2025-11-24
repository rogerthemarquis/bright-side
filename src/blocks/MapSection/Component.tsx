import React from 'react'
import type { MapSectionBlock } from '@/payload-types'

type Props = MapSectionBlock & {
  className?: string
}

export const MapSection: React.FC<Props> = ({
  title,
  description,
  mapEmbedUrl,
  directionsLink,
  className,
}) => {
  return (
    <section className={`py-12 px-4 ${className || ''}`}>
      <div className="container mx-auto">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">{title}</h2>
          )}
          {description && (
            <p className="text-sm sm:text-lg mb-6 max-w-xl mx-auto text-muted-foreground">
              {description}
            </p>
          )}
          {directionsLink && (
            <div className="mb-6">
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-md transition inline-block"
              >
                Get Directions
              </a>
            </div>
          )}
          {mapEmbedUrl && (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl aspect-square">
                <iframe
                  title="Google Maps Location"
                  src={mapEmbedUrl}
                  allowFullScreen={true}
                  loading="lazy"
                  className="rounded-lg border border-border w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
