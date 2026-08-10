import './Documentation.css'
import { useEffect } from 'react'
import { useObrasStore } from '@/features/obra/store/useObras.store'
import { NewObraButton } from '@/features/obra/components/NewObraButton/NewObraButton'
import { ObraCard } from '@/features/obra/components/ObraCard/ObraCard'

export const Documentation = () => {
  const obras = useObrasStore(s => s.obras)
  const refetchObras = useObrasStore(s => s.refetchObras)

  useEffect(() => {
    if (!obras) refetchObras()
  }, [obras, refetchObras])

  return (
    <div className="cmp-documentation">
      <article className="result">
        <ul>
          <NewObraButton />
          {obras?.map(o => (
            <ObraCard key={o.id} data={o} />
          ))}
        </ul>
      </article>
    </div>
  )
}
