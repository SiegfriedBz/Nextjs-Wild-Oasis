import { motion } from 'framer-motion'

type TAnimatedWindowProps = {
  isFullHeight?: boolean
  children: React.ReactNode
}

const animationOptions = {
  isFullHeight: {
    initial: { translateY: '0%', translateX: '100%', opacity: 0 },
    animate: { translateY: '0%', translateX: '0%', opacity: 1 },
    exit: { translateY: '0%', translateX: '100%', opacity: 0 },
    transition: { type: 'spring', bounce: 0.25 }
  },
  default: {
    initial: { translateY: '-250%', translateX: '-50%', opacity: 0 },
    animate: { translateY: '-50%', translateX: '-50%', opacity: 1 },
    exit: { translateY: '250%', translateX: '-50%', opacity: 0 },
    transition: { type: 'spring', bounce: 0.5 }
  }
}

const AnimatedWindow = ({
  isFullHeight = false,
  children
}: TAnimatedWindowProps) => {
  const className = isFullHeight
    ? 'top-0 bottom-0 h-screen max-h-screen right-0 max-sm:w-[78vw] max-md:w-[64vw] max-lg:w-[48vw] max-xl:w-[42vw] xl:hidden'
    : 'left-1/2 top-1/2 w-[600px] max-w-[90vw]'

  const option =
    animationOptions[`${isFullHeight ? 'isFullHeight' : 'default'}`]

  return (
    <motion.div
      id='modal-window'
      className={`z-[99999] absolute ${className}`}
      initial={option.initial}
      animate={option.animate}
      exit={option.exit}
      transition={option.transition}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedWindow
