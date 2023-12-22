import clsx from 'clsx'
import useClickOutside from '../../../hooks/useClickOutside'
import { ReactNode } from 'react'

type ModalProps = {
  showModal: boolean
  closeModal: () => void
  className?: string
  header: ReactNode
  children: ReactNode
}

export default function Modal({
  showModal,
  closeModal,
  className,
  header,
  children,
}: ModalProps) {
  const ref = useClickOutside(closeModal)

  return (
    <div
      className={clsx(
        'flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/75',
        'transition-opacity',
        showModal
          ? 'duration-200 opacity-100 z-50'
          : 'duration-0 opacity-0 -z-10'
      )}
    >
      <div
        className="relative rounded-2xl shadow bg-gray-600 bg-gradient-to-br from-gray-500"
        ref={ref}
      >
        <div
          className={clsx(
            'flex items-center justify-between p-4 md:p-5 border-b rounded-t-2xl',
            className
          )}
        >
          <div />
          {header}
          <button
            type="button"
            className="hover:bg-gray-200 rounded-lg w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
