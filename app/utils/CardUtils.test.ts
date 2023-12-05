import '@testing-library/jest-dom'

import {
  isEqual,
  mapJsonToCard,
  merge,
  filterBySearchQuery,
  filterByClass,
} from './CardUtils'

describe('CardUtils', () => {
  describe('isEqual', () => {
    it('should return true when given two cards with the same names, classes and types', () => {
      const cardA: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Événement',
      }
      const cardB: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Événement',
      }

      expect(isEqual(cardA)(cardB)).toBe(true)
    })

    it('should return false when given two cards with the same names and classes, but different types', () => {
      const cardA: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Amélioration',
      }
      const cardB: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Événement',
      }

      expect(isEqual(cardA)(cardB)).toBe(false)
    })

    it('should return false when given two cards with the same names and types, but different classes', () => {
      const cardA: CardID = {
        name: 'Uppercut',
        class: 'Justice',
        type: 'Amélioration',
      }
      const cardB: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Amélioration',
      }

      expect(isEqual(cardA)(cardB)).toBe(false)
    })

    it('should return false when given two cards with the same classes and types, but different names', () => {
      const cardA: CardID = {
        name: 'Assaut Implacable',
        class: 'Agressivité',
        type: 'Amélioration',
      }
      const cardB: CardID = {
        name: 'Uppercut',
        class: 'Agressivité',
        type: 'Amélioration',
      }

      expect(isEqual(cardA)(cardB)).toBe(false)
    })
  })

  describe('mapJsonToCard', () => {
    it('should return the same Card object, with the pack property being mapped to an array and moved to a new packs property', () => {
      const card = {
        id: '74',
        name: 'Motivé',
        pack: 'Boîte de base',
        class: 'Commandement',
        type: 'Amélioration',
        cost: 1,
        resources: ['physical'],
        traits: ['Condition'],
        ability: [
          'Attachez cette carte à un allié.',
          "L'allié gagne +1 CTR et +1 ATQ.",
        ],
        flavorText:
          '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
        occurences: 3,
      }

      expect(mapJsonToCard(card)).toEqual({
        id: '74',
        name: 'Motivé',
        packs: ['Boîte de base'],
        class: 'Commandement',
        type: 'Amélioration',
        cost: 1,
        resources: ['physical'],
        traits: ['Condition'],
        ability: [
          'Attachez cette carte à un allié.',
          "L'allié gagne +1 CTR et +1 ATQ.",
        ],
        flavorText:
          '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
        occurences: 3,
      })
    })
  })

  describe('merge', () => {
    describe('When adding a new card', () => {
      it('should return an array containing all the cards', () => {
        const cardA = {
          id: '74',
          name: 'Motivé',
          packs: ['Boîte de base'],
          class: 'Commandement',
          type: 'Amélioration',
          cost: 1,
          resources: ['physical'],
          traits: ['Condition'],
          ability: [
            'Attachez cette carte à un allié.',
            "L'allié gagne +1 CTR et +1 ATQ.",
          ],
          flavorText:
            '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
          occurences: 3,
        }

        const cardB = {
          id: '91',
          name: 'Manoir des Avengers',
          packs: ['Boîte de base'],
          class: 'Basique',
          type: 'Soutien',
          cost: 4,
          traits: ['Avenger', 'Lieu'],
          resources: ['mental'],
          ability: [
            '1 max par joueur.',
            '**Action** : inclinez le Manoir des Avengers → choisissez un joueur. Ce joueur pioche 1 carte.',
          ],
          flavorText:
            '"Tu n\'as pas oublié d\'éteindre le four ?" — Janet Van Dyne',
          occurences: 4,
        }

        expect(merge([cardA])([cardB])).toEqual([cardA, cardB])
      })
    })

    describe('When adding an already existing card', () => {
      it('should return an array containing all the cards, with the duplicates occurences and packs updated', () => {
        const cardA = {
          id: '74',
          name: 'Motivé',
          packs: ['Boîte de base'],
          class: 'Commandement',
          type: 'Amélioration',
          cost: 1,
          resources: ['physical'],
          traits: ['Condition'],
          ability: [
            'Attachez cette carte à un allié.',
            "L'allié gagne +1 CTR et +1 ATQ.",
          ],
          flavorText:
            '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
          occurences: 3,
        }

        const cardB = {
          id: '80',
          name: 'Motivé',
          packs: ['Thor'],
          class: 'Commandement',
          type: 'Amélioration',
          cost: 1,
          resources: ['physical'],
          traits: ['Condition'],
          ability: [
            'Attachez cette carte à un allié.',
            "L'allié gagne +1 CTR et +1 ATQ.",
          ],
          flavorText:
            '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
          occurences: 2,
        }

        expect(merge([cardA])([cardB])).toEqual([
          {
            ...cardA,
            occurences: 5,
            packs: ['Boîte de base', 'Thor'],
          },
        ])
      })
    })
  })

  describe('filterBySearchQuery', () => {
    describe('when given a query and a list of cards', () => {
      const card = {
        id: '74',
        name: 'Motivé',
        packs: ['Boîte de base'],
        class: 'Commandement',
        type: 'Amélioration',
        cost: 1,
        resources: ['physical'],
        traits: ['Condition'],
        ability: [
          'Attachez cette carte à un allié.',
          "L'allié gagne +1 CTR et +1 ATQ.",
        ],
        flavorText:
          '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
        occurences: 3,
      }

      it('should return true if a card name matches the query', () => {
        expect(filterBySearchQuery('otiv')(card)).toBe(true)
      })

      it('should return true if a card ability matches the query', () => {
        expect(filterBySearchQuery('gagne +1')(card)).toBe(true)
      })

      it('should return true if a card trait matches the query', () => {
        expect(filterBySearchQuery('ondit')(card)).toBe(true)
      })

      it('should be case insensitive', () => {
        expect(filterBySearchQuery('OnDiT')(card)).toBe(true)
      })

      it('should return false if the query matches none of these fields', () => {
        expect(filterBySearchQuery('noMatchQuery')(card)).toBe(false)
      })
    })
  })

  describe('filterByClass', () => {
    const card = {
      id: '74',
      name: 'Motivé',
      packs: ['Boîte de base'],
      class: 'Commandement',
      type: 'Amélioration',
      cost: 1,
      resources: ['physical'],
      traits: ['Condition'],
      ability: [
        'Attachez cette carte à un allié.',
        "L'allié gagne +1 CTR et +1 ATQ.",
      ],
      flavorText: '"Je suis content qu\'elle soit de notre côté." — Star-Lord',
      occurences: 3,
    }

    it('should return true if the card class equals the given class', () => {
      expect(filterByClass('Commandement')(card)).toBe(true)
    })

    it('should return false if the card class does not equal the given class', () => {
      expect(filterByClass('Basique')(card)).toBe(false)
    })
  })
})
