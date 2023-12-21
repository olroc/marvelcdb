import pipe from 'ramda/src/pipe'
import replace from 'ramda/src/replace'

export const mapResourceToHTML: (text: string) => string = pipe(
  replace(/{physical}/, 'PHYSIQUE'),
  replace(/{energy}/, 'ENERGY'),
  replace(/{mental}/, 'MENTAL'),
  replace(/{wild}/, 'WILD')
)

export const mapTextToHTML: (text: string) => string = pipe(
  replace(/\*\*(.*?)\*\*/, '<b>$1</b>'),
  mapResourceToHTML
)
