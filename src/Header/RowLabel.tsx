'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  let label = 'Row'

  if (data?.data?.type === 'artistsDropdown') {
    label = `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: Artists Dropdown`
  } else if (data?.data?.link?.label) {
    label = `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
  }

  return <div>{label}</div>
}
