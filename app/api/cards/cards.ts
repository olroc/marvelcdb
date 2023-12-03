import { merge, mapJsonToCard } from '../../utils/CardUtils'
import pipe from 'ramda/src/pipe'

/* CORE SET */
import coreSet from '../../../cards/coreSet/coreSet.json'
import coreSetBasic from '../../../cards/coreSet/basic.json'
import coreSetAggression from '../../../cards/coreSet/aggression.json'
import coreSetJustice from '../../../cards/coreSet/justice.json'
import coreSetLeadership from '../../../cards/coreSet/leadership.json'
import coreSetProtection from '../../../cards/coreSet/protection.json'

const mapFilesAndMergeCards: (
  cardsSet: JSONCard[]
) => (mappedCards: Card[]) => Card[] = (cardsSet: JSONCard[]) =>
  merge(cardsSet.map(mapJsonToCard))

export const MARVEL_CHAMPIONS_CARDS = pipe(
  /* CORE SET */
  mapFilesAndMergeCards(coreSet),
  mapFilesAndMergeCards(coreSetBasic),
  mapFilesAndMergeCards(coreSetAggression),
  mapFilesAndMergeCards(coreSetJustice),
  mapFilesAndMergeCards(coreSetLeadership),
  mapFilesAndMergeCards(coreSetProtection)
)([])
