import BookingProvider from '@/app/_context/BookingProvider'

type TProps = {
  children: React.ReactNode
}
const layout = ({ children }: TProps) => {
  return (
    <BookingProvider>
      <div className='max-sm:pb-12 sm:pb-16'>{children}</div>
    </BookingProvider>
  )
}

export default layout
