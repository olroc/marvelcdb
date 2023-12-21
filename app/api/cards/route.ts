import { type NextRequest } from 'next/server'
import { filter, identity, pipe } from 'ramda'

import { MARVEL_CHAMPIONS_CARDS } from './cards'
import { filterByClasses, filterBySearchQuery } from '../../utils/cardUtils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const aspects = searchParams.get('aspects')?.split(',')

  const filteredCards = pipe(
    query ? filter(filterBySearchQuery(query)) : identity,
    aspects ? filter(filterByClasses(aspects)) : identity
  )(MARVEL_CHAMPIONS_CARDS)

  return Response.json(filteredCards)
}
