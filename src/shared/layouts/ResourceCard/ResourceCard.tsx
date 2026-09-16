import './ResourceCard.css'
import type { ReactNode } from 'react'
import { Link } from 'wouter'
import { varList } from '@/shared/helpers/varList.helper'
import { classList } from '@/shared/helpers'

export interface ResourceCardProps {
  handlingClass?: string
  i: number
  id: number
  title: string
  statusSlot?: ReactNode
  detailsStyle?: 'list' | 'matrix'
  children: ReactNode[] | ReactNode[][]
}

export const ResourceCard = ({
  handlingClass,
  i,
  id,
  title,
  statusSlot,
  detailsStyle = 'list',
  children,
}: ResourceCardProps) => {
  return (
    <li
      className={classList(
        'cmp-resource-card',
        'card-style',
        'hover-highlight',
        'show-animation-item',
        handlingClass,
      )}
      style={varList({ i })}
    >
      {statusSlot}
      <div className="content">
        <header>
          <Link className="text" href={`/${id}`}>
            {title}
          </Link>
        </header>
        <hr />
        <ul className={detailsStyle}>{children}</ul>
      </div>
    </li>
  )
}
