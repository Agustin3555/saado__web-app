import './Dropdown.css'
import {
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react'
import { classList, varList } from '../../helpers'

interface DropdownProps {
  ref?: RefObject<HTMLDivElement | null>
  gallery?: { c: number; r?: number }
  opener: (attrs: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
  children: ReactNode | ReactNode[]
}

export const Dropdown = ({ ref, gallery, opener, children }: DropdownProps) => {
  const id = useId()

  return (
    <>
      {opener({ popoverTarget: id })}
      <div
        className={classList('cmp-dropdown', 'raised-panel', {
          gallery: !!gallery,
        })}
        style={varList({ c: gallery?.c, r: gallery?.r })}
        popover="auto"
        {...{ ref, id }}
      >
        {children}
      </div>
    </>
  )
}
