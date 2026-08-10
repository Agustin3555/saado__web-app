import './Dropdown.css'
import { useId, type ReactNode, type RefObject } from 'react'
import { classList, varList } from '../../helpers'

interface DropdownProps {
  ref?: RefObject<HTMLDivElement | null>
  gallery?: { c: number; r?: number }
  opener: (popoverTarget: string) => ReactNode
  children: ReactNode | ReactNode[]
}

export const Dropdown = ({ ref, gallery, opener, children }: DropdownProps) => {
  const id = useId()

  return (
    <>
      {opener(id)}
      <div
        className={classList('cmp-dropdown', { gallery: !!gallery })}
        style={varList({ c: gallery?.c, r: gallery?.r })}
        popover="auto"
        {...{ ref, id }}
      >
        {children}
      </div>
    </>
  )
}
