'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import SearchInput from './searchInput/SearchInput'
import AspectItem from './aspectItem/AspectItem'
import SearchResults from './searchResults/SearchResults'

import { buildUrl } from '../../../utils/urlBuilder'

const isAspectChecked = (aspect: Aspect) => (aspects: string[]) =>
  !!aspects.find(currentAspect => currentAspect === aspect)

type SearchProps = {
  results: Card[]
}

export default function Search({ results }: SearchProps) {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()

  const aspects = searchParams.getAll('aspects')
  const query = searchParams.get('query')

  const onQueryChange = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }

    router.replace(buildUrl({ path, searchParams: params }))
  }

  const onAspectChange = (aspect: Aspect) => {
    const params = new URLSearchParams(searchParams)
    if (aspects.includes(aspect)) {
      params.delete('aspects', aspect)
    } else {
      params.append('aspects', aspect)
    }
    router.replace(buildUrl({ path, searchParams: params }))
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="relative px-5">
          <AspectItem
            aspect="basic"
            checked={isAspectChecked('basic')(aspects)}
            onChange={onAspectChange}
          />

          <AspectItem
            aspect="justice"
            checked={isAspectChecked('justice')(aspects)}
            onChange={onAspectChange}
          />

          <AspectItem
            aspect="leadership"
            checked={isAspectChecked('leadership')(aspects)}
            onChange={onAspectChange}
          />

          <AspectItem
            aspect="agression"
            checked={isAspectChecked('agression')(aspects)}
            onChange={onAspectChange}
          />

          <AspectItem
            aspect="protection"
            checked={isAspectChecked('protection')(aspects)}
            onChange={onAspectChange}
          />

          <AspectItem
            aspect="pool"
            checked={isAspectChecked('pool')(aspects)}
            onChange={onAspectChange}
          />
        </div>

        <SearchInput onChange={onQueryChange} query={query} />
      </div>

      <div className="text-white text-center">
        <SearchResults results={results} />
      </div>
    </div>
  )
}
