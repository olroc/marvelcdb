export {}

declare global {
  type JSONCard = {
    id: string
    name: string
    subName?: string
    unique?: boolean
    pack: string
    class: string
    type: string
    cost?: number
    traits?: string[]
    resources?: string[]
    ability: string[]
    flavorText?: string
    occurences: number
    boost?: number
  }

  type Card = {
    id: string
    name: string
    subName?: string
    unique?: boolean
    signature?: string
    packs: string[]
    class: string
    type: string
    cost?: number
    traits?: string[]
    resources?: string[]
    ability: string[]
    flavorText?: string
    occurences: number
    boost?: number
  }

  type CardID = Pick<Card, name | class | type>

  type Aspect =
    | 'basic'
    | 'justice'
    | 'agression'
    | 'leadership'
    | 'protection'
    | 'pool'
}
