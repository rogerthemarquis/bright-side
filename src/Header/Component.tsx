import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedPortfolios } from '@/utilities/getPortfolios'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const portfolios = await getCachedPortfolios()()

  return <HeaderClient data={headerData} portfolios={portfolios} />
}
