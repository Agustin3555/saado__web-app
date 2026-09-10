import './Procurements.css'
import { useEffect } from 'react'
import { useProcurementsStore } from '@/features/procurements/store/useProcurements.store'
import { NewProcurementButton } from '@/features/procurements/components/NewProcurementButton/NewProcurementButton'
import { ProcurementCard } from '@/features/procurements/components/ProcurementCard/ProcurementCard'
import { Procurement } from '@/features/procurements/components/Procurement/Procurement'
import { Route } from 'wouter'

export const Procurements = () => {
  const procurements = useProcurementsStore(s => s.procurements)
  const refetchProcurements = useProcurementsStore(s => s.refetchProcurements)

  useEffect(() => {
    if (!procurements) refetchProcurements()
  }, [procurements, refetchProcurements])

  return (
    <div className="cmp-procurements">
      <Route path="/">
        <article className="result">
          <ul>
            <NewProcurementButton />
            {procurements?.map((o, i) => (
              <ProcurementCard key={o.id} data={o} {...{ i }} />
            ))}
          </ul>
        </article>
      </Route>
      <Route path={'/:id'}>
        <Procurement />
      </Route>
    </div>
  )
}
