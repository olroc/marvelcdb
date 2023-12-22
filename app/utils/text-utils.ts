import pipe from 'ramda/src/pipe'
import replace from 'ramda/src/replace'

export const mapResourceToHTML: (text: string) => string = pipe(
  replace(
    /{physical}/,
    '<span class="display: inline-block px-[0.1rem] relative top-[3px]"><img alt="physical" src="/img/pictos/physical.png" width="20px" height="20px" /></span>'
  ),
  replace(
    /{energy}/,
    '<span class="display: inline-block px-[0.1rem] relative top-[3px]"><img alt="energy" src="/img/pictos/energy.png" width="20px" height="20px" /></span>'
  ),
  replace(
    /{mental}/,
    '<span class="display: inline-block px-[0.1rem] relative top-[3px]"><img alt="mental" src="/img/pictos/mental.png" width="20px" height="20px" /></span>'
  ),
  replace(
    /{wild}/,
    '<span class="display: inline-block px-[0.1rem] relative top-[3px]"><img alt="wild" src="/img/pictos/wild.png" width="20px" height="20px" /></span>'
  )
)

export const mapTextToHTML: (text: string) => string = pipe(
  replace(/\_(.*?)\_/, '<i class="display: contents">$1</i>'),
  replace(/\*\*(.*?)\*\*/, '<b class="display: contents">$1</b>'),
  mapResourceToHTML
)
