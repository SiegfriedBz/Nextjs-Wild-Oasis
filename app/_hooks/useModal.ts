import { ModalContext } from '@/app/_components/modal/Modal'
import { useContext } from 'react'

const useModal = () => {
  const contextValue = useContext(ModalContext)

  if (contextValue == null) {
    throw new Error('ModalContext must be used within its provider')
  } else {
    return contextValue
  }
}

export default useModal
