import { type NextRequest } from 'next/server'
import { filter, identity, pipe } from 'ramda'

import { MARVEL_CHAMPIONS_CARDS } from './cards'
import { filterByClass, filterBySearchQuery } from '../../utils/CardUtils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const classParam = searchParams.get('class')

  const filteredCards = pipe(
    query ? filter(filterBySearchQuery(query)) : identity,
    classParam ? filter(filterByClass(classParam)) : identity
  )(MARVEL_CHAMPIONS_CARDS)

  return Response.json(filteredCards)
}
