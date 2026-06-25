import './Icon.css'
import { classList } from '@/shared/helpers'

interface IconProps {
  handlingClass?: string
  iconClass: string
}

export const Icon = ({ handlingClass, iconClass }: IconProps) => (
  <i className={classList('cmp-icon', iconClass, handlingClass)} />
)
