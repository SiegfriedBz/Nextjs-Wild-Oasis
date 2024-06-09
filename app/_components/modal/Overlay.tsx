import type { TOverlayProps } from '@/app/_types/modal.types'

const Overlay = ({ onClick, children }: TOverlayProps) => {
  return (
    <div
      onClick={onClick}
      className='fixed 
        inset-0
        w-screen h-screen
        bg-primary-700 bg-opacity-70
        backdrop-blur-sm
        transition-all duration-300 ease-in-out
        z-[999999]
      '
    >
      {children}
    </div>
  )
}

export default Overlay
