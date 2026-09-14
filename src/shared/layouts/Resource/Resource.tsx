import './Resource.css'
import type { ReactNode } from 'react'
import { classList } from '@/shared/helpers'

interface ResourceProps {
  handlingClass?: string
  title: string
  subtitle?: string
  detailsSlot: ReactNode
  contentSlot: ReactNode
}

export const Resource = ({
  handlingClass,
  title,
  subtitle,
  detailsSlot,
  contentSlot,
}: ResourceProps) => {
  return (
    <article className={classList('cmp-resource', handlingClass)}>
      <header>
        <h1 className="text">
          <span>{title}</span>
          {subtitle && <strong>{subtitle}</strong>}
        </h1>
        <ul>{detailsSlot}</ul>
      </header>
      <hr />
      {contentSlot}
    </article>
  )
}
