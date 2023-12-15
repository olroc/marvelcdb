import any from 'ramda/src/any'
import anyPass from 'ramda/src/anyPass'
import pipe from 'ramda/src/pipe'
import toLower from 'ramda/src/toLower'
import includes from 'ramda/src/includes'

export const isEqual = (cardA: CardID) => (cardB: CardID) =>
  cardA.name === cardB.name &&
  cardA.class === cardB.class &&
  cardA.type === cardB.type

export const mapJsonToCard: (card: JSONCard) => Card = (card: JSONCard) => {
  const { pack, ...rest } = card

  return {
    ...rest,
    packs: [pack],
  }
}

export const merge: (cards: Card[]) => (newCards: Card[]) => Card[] =
  cards => newCards =>
    newCards.reduce(
      (allCards, newCard) =>
        allCards.find(isEqual(newCard))
          ? allCards.map(card =>
              isEqual(newCard)(card)
                ? {
                    ...card,
                    occurences: card.occurences + newCard.occurences,
                    packs: [...card.packs, ...newCard.packs],
                  }
                : card
            )
          : [...allCards, newCard],
      cards
    )

export const filterBySearchQuery: (
  searchQuery: string
) => (card: Card) => boolean = searchQuery => {
  const testIgnoreCase = pipe(toLower, includes(toLower(searchQuery)))

  return anyPass([
    pipe(card => card.name, testIgnoreCase),
    pipe(card => card.ability, any(testIgnoreCase)),
    pipe(card => card.traits ?? [], any(testIgnoreCase)),
  ])
}

export const filterByClasses: (
  cardClasses: string[]
) => (card: Card) => boolean = cardClasses =>
  pipe(
    card => card.class,
    cardClass => includes(cardClass)(cardClasses)
  )
