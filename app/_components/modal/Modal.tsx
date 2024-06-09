'use client'

import OpenButton from '@/app/_components/modal/OpenButton'
import Window from '@/app/_components/modal/Window'
import type { TBaseProps, TModalContext } from '@/app/_types/modal.types'
import { createContext, useState } from 'react'

export const ModalContext = createContext<TModalContext | null>(null)

const ModalProvider = ({ children }: TBaseProps) => {
  const [isPending, setIsPending] = useState(false)
  const [windowName, setWindowName] = useState('')
  const closeWindow = () => setWindowName('')
  const openWindowWithName = setWindowName

  return (
    <ModalContext.Provider
      value={{
        windowName,
        closeWindow,
        openWindowWithName,
        isPending,
        setIsPending
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider

ModalProvider.OpenButton = OpenButton
ModalProvider.Window = Window
