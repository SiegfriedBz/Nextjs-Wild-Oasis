import Link from 'next/link'

type TProps = {
  href: string
  onClick?: () => void
  className: string
  children: React.ReactNode
}
const CustomNavLink = ({ children, ...rest }: TProps) => {
  return <Link {...rest}>{children}</Link>
}

export default CustomNavLink
