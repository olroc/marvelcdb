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
  (cards) => (newCards) =>
    newCards.reduce(
      (allCards, newCard) =>
        allCards.find(isEqual(newCard))
          ? allCards.map((card) =>
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
