import useModal from '@/app/_hooks/useModal'
import type { TOpenButtonProps } from '@/app/_types/modal.types'
import SpinnerMini from '../SpinnerMini'

const OpenButton = ({
  className = '',
  windowNameToOpen,
  children
}: TOpenButtonProps) => {
  const { openWindowWithName, isPending } = useModal()

  return (
    <>
      {isPending ? (
        <span className={`inline-flex ${className}`}>
          <SpinnerMini />
        </span>
      ) : (
        <button
          className={`inline-flex ${className}`}
          onClick={() => openWindowWithName(windowNameToOpen)}
        >
          {children}
        </button>
      )}
    </>
  )
}

export default OpenButton
