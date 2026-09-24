import './Procurement.css'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { useProcurementsStore } from '../../../../store/useProcurements.store'
import { useSelectedProcurementStore } from '../../../../store/useSelectedProcurement.store'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { Resource } from '@/shared/layouts'
import { ContentView } from './components'
import { FileList } from '@/features/files/components/FileList/FileList'
import { VerdictButton } from './components/VerdictButton/VerdictButton'
import { CompanyChip } from '@/features/companies/components/CompanyChip/CompanyChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { Loader } from '@/shared/components'
import { ProcurementTypeChip } from '../../../ProcurementTypeChip/ProcurementTypeChip'

export const Procurement = () => {
  const [, setLocation] = useLocation()
  const { id } = useParams<{ id: string }>()
  const procurements = useProcurementsStore(s => s.procurements)
  const selectedProcurement = useSelectedProcurementStore(
    s => s.selectedProcurement,
  )
  const refetchSelectedProcurement = useSelectedProcurementStore(
    s => s.refetchSelectedProcurement,
  )
  const reset = useSelectedContentStore(s => s.reset)

  useEffect(() => {
    reset()

    const numberId = parseInt(id)
    const exist = procurements?.some(o => o.id === numberId)

    if (exist) {
      refetchSelectedProcurement(numberId)
      return
    }

    if (window.history.length > 1) window.history.back()
    else setLocation('/')
  }, [id, procurements, refetchSelectedProcurement, reset, setLocation])

  if (!selectedProcurement) return <Loader size="l" />

  const {
    name,
    companyId,
    verdict,
    procurementType,
    numeroExpediente,
    updatedAt,
    createdAt,
    files,
  } = selectedProcurement

  return (
    <Resource
      handlingClass="cmp-procurement"
      title={numeroExpediente}
      subtitle={name ?? '-'}
      detailsSlot={
        <>
          <VerdictButton data={{ verdict }} />
          <ProcurementTypeChip value={procurementType} />
          <CompanyChip id={companyId} />
          <UserActivityChip dateTime={updatedAt} activity="updated" />
          <UserActivityChip dateTime={createdAt} />
        </>
      }
      contentSlot={
        <section>
          <FileList data={{ id: Number(id), files }} />
          <ContentView />
        </section>
      }
    />
  )
}
