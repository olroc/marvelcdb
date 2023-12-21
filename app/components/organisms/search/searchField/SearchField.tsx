'use client'
import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import SearchInput from '../searchInput/SearchInput'
import { buildUrl } from '../../../../utils/urlBuilder'

export default function SearchField() {
  const router = useRouter()
  const path = usePathname()

  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  const onQueryChange = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set('query', query)
      } else {
        params.delete('query')
      }

      router.replace(buildUrl({ path, searchParams: params }))
    },
    [path, router, searchParams]
  )

  return <SearchInput onChange={onQueryChange} query={query} />
}
