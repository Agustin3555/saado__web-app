import './ViewButton.css'
import { Icon } from '@/shared/components/Icon/Icon'
import { classList } from '@/shared/helpers'
import { Link } from 'wouter'

export interface ViewButtonProps {
  name: string
  title: string
  iconClass: string
  selected?: boolean
  onlyIcon?: boolean
}

export const ViewButton = ({
  name,
  title,
  iconClass,
  selected = false,
  onlyIcon = false,
}: ViewButtonProps) => {
  return (
    <Link
      className={classList('cmp-view-button', 'ui-l', {
        square: onlyIcon,
        selected,
      })}
      href={`/${name}`}
      {...{ title }}
    >
      <Icon {...{ iconClass }} />
      {!onlyIcon && title}
    </Link>
  )
}
