import Image from 'next/image'
import CardDetails from '../cardDetails/CardDetails'
import Modal from '../modal/Modal'

const mapClassToBgColor = (aspect: Aspect | undefined) => {
  switch (aspect) {
    case 'basic':
      return 'bg-[#8D8D8D]'
    case 'agression':
      return 'bg-[#8A2327]'
    case 'justice':
      return 'bg-[#BEB430]'
    case 'leadership':
      return 'bg-[#428EA6]'
    case 'protection':
      return 'bg-[#4F962C]'
    case 'pool':
      return 'bg-purple-950'
    default:
      return ''
  }
}

type ModalCardDetailsProps = {
  card?: Pick<Card, 'id' | 'class' | 'name' | 'subName' | 'unique'>
  isShowing: boolean
  closeModal: () => void
}

export default function ModalCardDetails({
  card,
  isShowing,
  closeModal,
}: ModalCardDetailsProps) {
  const header = (
    <div className="flex flex-col py-2 font-bold">
      <div className="flex justify-center items-center">
        {card?.unique && (
          <Image
            className="mr-2"
            alt="unique"
            src="/img/pictos/uniq.png"
            width={20}
            height={26}
          />
        )}
        <div className="text-4xl">{card?.name}</div>
      </div>

      {card?.subName && <div className="text-lg">{card?.subName}</div>}
    </div>
  )

  return (
    <Modal
      header={header}
      showModal={isShowing}
      closeModal={closeModal}
      className={mapClassToBgColor(card?.class as Aspect)}
    >
      {card ? <CardDetails id={card.id} name={card.name} /> : null}
    </Modal>
  )
}
