import any from 'ramda/src/any'
import anyPass from 'ramda/src/anyPass'
import includes from 'ramda/src/includes'
import pipe from 'ramda/src/pipe'
import equals from 'ramda/src/equals'

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
) => (card: Card) => boolean = searchQuery =>
  anyPass([
    pipe(card => card.name, includes(searchQuery)),
    pipe(card => card.ability, any(includes(searchQuery))),
    pipe(card => card.traits ?? [], any(includes(searchQuery))),
  ])

export const filterByClass: (
  cardClass: string
) => (card: Card) => boolean = cardClass =>
  pipe(card => card.class, equals(cardClass))
