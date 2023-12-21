import clsx from 'clsx'
import useClickOutside from '../../../hooks/useClickOutside'

type ModalProps = {
  title?: string
  showModal: boolean
  closeModal: () => void
  children: React.ReactNode
}

export default function Modal({
  title,
  showModal,
  closeModal,
  children,
}: ModalProps) {
  const ref = useClickOutside(closeModal)

  return (
    <div
      className={clsx(
        'flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/75',
        'transition-opacity',
        showModal ? 'opacity-100 z-50' : 'opacity-0 -z-10'
      )}
    >
      <div
        className="relative rounded-lg shadow bg-gray-950 bg-gradient-to-br from-blue-950"
        ref={ref}
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <div className="py-4">{title}</div>
          <button
            type="button"
            className="hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="relative w-full max-h-full">
          <div className="relative rounded-b-lg shadow">
            <div className="p-4 md:p-5 space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
