import './Loader.css'
import { classList } from '@/shared/helpers'

interface LoaderProps {
  size?: 's' | 'm' | 'l'
}

export const Loader = ({ size = 's' }: LoaderProps) => {
  return (
    <div className={classList('cmp-loader', size)}>
      <span />
    </div>
  )
}
