'use client'
import { Suspense } from 'react'
import { useCallback, useState } from 'react'
import Image from 'next/image'

import Modal from '../../modal/Modal'
import useModal from '../../../../hooks/useModal'
import CardDetails from '../../cardDetails/CardDetails'
import { getImageUrl } from '../../../../utils/imageUtils'
import ModalCardDetails from '../../modalCardDetails/ModalCardDetails'

type SearchResultsProps = {
  results: Card[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [activeCard, setActiveCard] = useState<Card | undefined>(undefined)
  const { openModal, closeModal, isShowing } = useModal()

  const handleCardClick = useCallback(
    (cardName: string) => () => {
      setActiveCard(results.find(card => card.name === cardName))
      openModal()
    },
    [openModal, results]
  )

  return (
    <div className="flex flex-wrap">
      {results.map(card => (
        <button
          key={card.name}
          className="w-[262px] py-4 px-3 transition ease-in-out hover:scale-110"
        >
          <Image
            alt={card.name}
            src={getImageUrl(card.id)}
            width={300}
            height={419}
            onClick={handleCardClick(card.name)}
          />
        </button>
      ))}

      <ModalCardDetails
        isShowing={isShowing}
        closeModal={closeModal}
        card={activeCard}
      />
    </div>
  )
}
