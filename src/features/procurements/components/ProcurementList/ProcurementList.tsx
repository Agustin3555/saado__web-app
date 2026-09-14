import { useEffect } from 'react'
import { useProcurementsStore } from '@/features/procurements/store/useProcurements.store'
import { CollectionRouter } from '@/shared/layouts'
import {
  NewProcurementButton,
  Procurement,
  ProcurementCard,
} from './components'

export const ProcurementList = () => {
  const procurements = useProcurementsStore(s => s.procurements)
  const refetchProcurements = useProcurementsStore(s => s.refetchProcurements)

  useEffect(() => {
    if (!procurements) refetchProcurements()
  }, [procurements, refetchProcurements])

  return (
    <CollectionRouter
      handlingClass="cmp-procurement-list"
      newResource={<NewProcurementButton />}
      list={procurements?.map((o, i) => (
        <ProcurementCard key={o.id} data={o} {...{ i }} />
      ))}
      resource={<Procurement />}
    />
  )
}
