type TProps = {
  children: React.ReactNode
}
const layout = ({ children }: TProps) => {
  return <div className='max-sm:pb-12 sm:pb-16'>{children}</div>
}

export default layout
