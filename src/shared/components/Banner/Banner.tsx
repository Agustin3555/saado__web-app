import './Banner.css'
import { Icon } from '../Icon/Icon'

interface BannerProps {
  iconClass?: string
  text: string
}

export const Banner = ({
  iconClass = 'ti ti-circle-dashed-x',
  text,
}: BannerProps) => {
  return (
    <div className="cmp-banner">
      <Icon {...{ iconClass }} />
      <small>{text}</small>
    </div>
  )
}
