import Search from './components/organisms/search/Search'
import { fetchData } from './utils/fetch'
import { buildUrl } from './utils/urlBuilder'

export default async function Page({
  searchParams: { query, aspects },
}: {
  searchParams: { query: string; aspects: string }
}) {
  const url = buildUrl({
    baseUrl: process.env.API_URL,
    path: '/api/cards',
    searchParams: new URLSearchParams({
      ...(query ? { query } : {}),
      ...(aspects ? { aspects } : {}),
    }),
  })
  const results = await fetchData<Card[]>(url)

  return (
    <div className="flex justify-center items-center">
      <Search results={results} />
    </div>
  )
}
