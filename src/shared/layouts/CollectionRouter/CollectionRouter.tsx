import './CollectionRouter.css'
import { type ReactNode } from 'react'
import { Route } from 'wouter'
import { classList } from '@/shared/helpers'

interface CollectionRouterProps {
  handlingClass?: string
  newResource?: ReactNode
  list?: ReactNode[]
  resource: ReactNode
}

export const CollectionRouter = ({
  handlingClass,
  newResource,
  list,
  resource,
}: CollectionRouterProps) => {
  // TODO: mostrar la carga de list de alguna manera
  return (
    <div className={classList('cmp-collection-router', handlingClass)}>
      <Route path="/">
        <article className="result">
          <ul>
            {newResource}
            {list}
          </ul>
        </article>
      </Route>
      <Route path={'/:id'}>{resource}</Route>
    </div>
  )
}
