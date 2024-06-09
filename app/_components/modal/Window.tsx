'use client'
import AnimatedWindow from '@/app/_components/modal/AnimatedWindow'
import CloseButton from '@/app/_components/modal/CloseButton'
import Overlay from '@/app/_components/modal/Overlay'
import useModal from '@/app/_hooks/useModal'
import type { TWindow } from '@/app/_types/modal.types'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Window = ({
  isFullHeight = false,
  windowNameToOpen,
  children,
  closeBtnIsVisible = true
}: TWindow) => {
  const [isClient, setIsClient] = useState(false)
  const { windowName, closeWindow } = useModal()
  let modalRootRef = useRef<HTMLElement | null>(null)

  const isVisible = windowNameToOpen === windowName

  useEffect(() => {
    setIsClient(true)
    modalRootRef.current = document.getElementById('root-portal-modal')
  }, [])

  if (!isClient || !modalRootRef?.current) return null

  return createPortal(
    <AnimatePresence key={`modal-overlay-${windowNameToOpen}`}>
      {isVisible && (
        <Overlay
          onClick={(e) => {
            const targetElement = e.target as Element
            const isClickedModalWindow = targetElement.closest('#modal-window')
            if (!isClickedModalWindow) closeWindow()
          }}
        >
          <AnimatedWindow isFullHeight={isFullHeight}>
            <CloseButton
              isFullHeight={isFullHeight}
              onClick={closeWindow}
              className={`text-primary-100 ${
                closeBtnIsVisible ? '' : 'hidden'
              }`}
            >
              <XCircleIcon width='24' height='24' />
            </CloseButton>

            {children}
          </AnimatedWindow>
        </Overlay>
      )}
    </AnimatePresence>,
    modalRootRef.current
  )
}

export default Window
