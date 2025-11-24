import type { Portfolio } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const payload = await getPayload({ config })

  const { docs: portfolios } = await payload.find({
    collection: 'portfolios',
    depth: 1,
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: 'profile.artistName',
  })

  return portfolios
}

export const getCachedPortfolios =
  (depth = 0) =>
  async () => {
    const portfolios = await getPortfolios()
    return portfolios
  }
