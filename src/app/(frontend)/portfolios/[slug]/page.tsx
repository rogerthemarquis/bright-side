import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Portfolio as PortfolioType } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const portfolios = await payload.find({
    collection: 'portfolios',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = portfolios.docs
    ?.filter((doc): doc is PortfolioType => {
      return doc._status === 'published'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Portfolio({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/portfolios/' + slug
  const portfolio = await queryPortfolioBySlug({ slug })

  if (!portfolio) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <PageClient portfolio={portfolio} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const portfolio = await queryPortfolioBySlug({ slug })

  return generateMeta({ doc: portfolio })
}

const queryPortfolioBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolios',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
