'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import AspectItem from '../aspectItem/AspectItem'
import { buildUrl } from '../../../../utils/urlBuilder'

const isAspectChecked = (aspect: Aspect) => (aspects: string[]) =>
  !!aspects.find(currentAspect => currentAspect === aspect)

export default function AspectsList() {
  const router = useRouter()
  const path = usePathname()

  const searchParams = useSearchParams()
  const aspects = searchParams.getAll('aspects')

  const onAspectChange = (aspect: Aspect) => {
    const params = new URLSearchParams(searchParams)
    if (aspects.includes(aspect)) {
      params.delete('aspects', aspect)
    } else {
      params.append('aspects', aspect)
    }
    router.replace(buildUrl({ path, searchParams: params }))
  }

  return (
    <div className="relative px-5">
      <AspectItem
        aspect="basic"
        checked={isAspectChecked('basic')(aspects)}
        onChange={onAspectChange}
      />

      <AspectItem
        aspect="justice"
        checked={isAspectChecked('justice')(aspects)}
        onChange={onAspectChange}
      />

      <AspectItem
        aspect="leadership"
        checked={isAspectChecked('leadership')(aspects)}
        onChange={onAspectChange}
      />

      <AspectItem
        aspect="agression"
        checked={isAspectChecked('agression')(aspects)}
        onChange={onAspectChange}
      />

      <AspectItem
        aspect="protection"
        checked={isAspectChecked('protection')(aspects)}
        onChange={onAspectChange}
      />

      <AspectItem
        aspect="pool"
        checked={isAspectChecked('pool')(aspects)}
        onChange={onAspectChange}
      />
    </div>
  )
}
