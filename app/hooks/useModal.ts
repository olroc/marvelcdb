import { useMemo, useState } from 'react'

export default function useModal() {
  const [isShowing, setShowing] = useState(false)
  const toggle = () => setShowing(prevIsShowing => !prevIsShowing)
  const openModal = () => setShowing(true)
  const closeModal = () => setShowing(false)

  return useMemo(
    () => ({
      isShowing,
      toggle,
      openModal,
      closeModal,
    }),
    [isShowing]
  )
}
