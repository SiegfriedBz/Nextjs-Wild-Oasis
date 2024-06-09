import type { TCloseButtonProps } from '@/app/_types/modal.types'

const CloseButton = ({
  isFullHeight = false,
  className = '',
  onClick,
  children
}: TCloseButtonProps) => {
  return (
    <button
      data-cy='modal-close-button'
      className={`z-[999] absolute top-4 ${
        isFullHeight ? 'left-4' : 'right-4'
      } ${className}`}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  )
}

export default CloseButton
