import { type ReactNode } from 'react'

export type TModalContext = {
  windowName: string
  closeWindow: () => void
  openWindowWithName: React.Dispatch<React.SetStateAction<string>>
  isPending: boolean
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
}

export type TBaseProps = {
  className?: string
  children: ReactNode
}

export type TOpenButtonProps = {
  windowNameToOpen: TModalContext['windowName']
} & TBaseProps

export type TWindow = TOpenButtonProps & {
  isFullHeight?: boolean
  closeBtnIsVisible?: boolean
}

export type TOverlayProps = {
  onClick: (event: React.MouseEvent) => void
} & TBaseProps

export type TCloseButtonProps = {
  isFullHeight?: boolean
  onClick: () => void
} & TBaseProps
