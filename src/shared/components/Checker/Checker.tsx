import './Checker.css'
import { Icon } from '..'
import { classList } from '@/shared/helpers'

export interface CheckerProps {
  size?: 'm' | 'l'
}

export const Checker = ({ size = 'm' }: CheckerProps) => {
  return (
    <div className={classList('cmp-checker', `ui-${size}`)}>
      <Icon iconClass="ti ti-check" />
    </div>
  )
}
