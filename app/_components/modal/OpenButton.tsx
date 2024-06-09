import useModal from '@/app/_hooks/useModal'
import type { TOpenButtonProps } from '@/app/_types/modal.types'

const OpenButton = ({
  className = '',
  windowNameToOpen,
  children
}: TOpenButtonProps) => {
  const { openWindowWithName } = useModal()

  return (
    <button
      className={`inline-flex ${className}`}
      onClick={() => openWindowWithName(windowNameToOpen)}
    >
      {children}
    </button>
  )
}

export default OpenButton
