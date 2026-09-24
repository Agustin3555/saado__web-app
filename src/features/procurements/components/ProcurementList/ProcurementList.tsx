import { useEffect } from 'react'
import { useProcurementsStore } from '@/features/procurements/store/useProcurements.store'
import { CollectionRouter } from '@/shared/layouts'
import { Procurement, ProcurementCard } from './components'
import { ProcurementUpsertButton } from '../ProcurementUpsertButton/ProcurementUpsertButton'

export const ProcurementList = () => {
  const procurements = useProcurementsStore(s => s.procurements)
  const refetchProcurements = useProcurementsStore(s => s.refetchProcurements)

  useEffect(() => {
    if (!procurements) refetchProcurements()
  }, [procurements, refetchProcurements])

  return (
    <CollectionRouter
      handlingClass="cmp-procurement-list"
      newResource={<ProcurementUpsertButton action="NEW" />}
      list={procurements?.map((o, i) => (
        <ProcurementCard key={o.id} data={o} {...{ i }} />
      ))}
      resource={<Procurement />}
    />
  )
}
