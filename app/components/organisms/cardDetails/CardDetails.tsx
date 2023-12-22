import { Suspense } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import length from 'ramda/src/length'
import has from 'ramda/src/has'

import { fetchData } from '../../../utils/fetch'
import { getImageUrl } from '../../../utils/imageUtils'
import { mapTextToHTML, mapResourceToHTML } from '../../../utils/text-utils'
import CardDetailsSkeleton from './CardDetails.skeleton'

type CardDetailsProps = {
  id: string
  name: string
}

export default function CardDetails({ id, name }: CardDetailsProps) {
  return (
    <div className="flex justify-center items-center m-2">
      <Image
        alt={name}
        src={getImageUrl(id)}
        width={300}
        height={419}
        className="my-6 mx-6"
      />
      <Suspense fallback={<CardDetailsSkeleton />}>
        <Details id={id} />
      </Suspense>
    </div>
  )
}

function Details({ id }: { id: string }) {
  const { data: card } = useSWR<Card>(`/api/cards/${id}`, fetchData, {
    suspense: true,
  })

  return (
    <span className="text-start my-6 mx-8 max-w-xl text-xl items-center justify-center">
      <div className="mb-4">Affinité {card?.class}</div>
      <div className="mb-8">
        <div>
          type: <span className="font-bold">{card?.type}</span>
        </div>
        {card?.traits && (
          <div>
            trait{length(card?.traits as string[]) > 1 ? 's' : ''}:{' '}
            <span className="font-bold">{card?.traits?.join(', ')}</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        {has('cost')(card) && (
          <div>
            Coût: <span className="font-bold">{card?.cost}</span>
          </div>
        )}
        <div className="flex">
          Ressource{length(card?.resources as string[]) > 1 ? 's' : ''}:{' '}
          <span
            dangerouslySetInnerHTML={{
              __html:
                card?.resources
                  ?.map(r => `{${r}}`)
                  .map(mapResourceToHTML)
                  .join('') || '',
            }}
          />
        </div>
      </div>

      <div className="mb-8 pl-4 border-l-2 border-white flex flex-col text-l">
        {card?.ability.map(ability => (
          <p
            className="[&:not(:first-child)]:pt-2"
            key={ability}
            dangerouslySetInnerHTML={{
              __html: mapTextToHTML(ability),
            }}
          />
        ))}
      </div>

      <div className="mb-8 italic text-sm">{card?.flavorText}</div>

      <div>{card?.packs.join(', ')}</div>
    </span>
  )
}
