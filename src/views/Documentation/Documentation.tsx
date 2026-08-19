import './Documentation.css'
import { useEffect } from 'react'
import { useObrasStore } from '@/features/obra/store/useObras.store'
import { NewObraButton } from '@/features/obra/components/NewObraButton/NewObraButton'
import { ObraCard } from '@/features/obra/components/ObraCard/ObraCard'
import { Obra } from '@/features/obra/components/Obra/Obra'
import { Route } from 'wouter'

export const Documentation = () => {
  const obras = useObrasStore(s => s.obras)
  const refetchObras = useObrasStore(s => s.refetchObras)

  useEffect(() => {
    if (!obras) refetchObras()
  }, [obras, refetchObras])

  return (
    <div className="cmp-documentation">
      <Route path="/">
        <article className="result">
          <ul>
            <NewObraButton />
            {obras?.map((o, i) => (
              <ObraCard key={o.id} data={o} {...{ i }} />
            ))}
          </ul>
        </article>
      </Route>
      <Route path={'/:id'}>
        <Obra />
      </Route>
    </div>
  )
}
