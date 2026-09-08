import './Procurement.css'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { useProcurementsStore } from '../../store/useProcurements.store'
import { useSelectedProcurementStore } from '../../store/useSelectedProcurement.store'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { Loader } from '@/shared/components'
import { ContentView, ProcurementHeader } from './components'
import { FileList } from '@/features/files/components/FileList/FileList'

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

  return (
    <div className="cmp-procurement">
      {selectedProcurement ? (
        <>
          <ProcurementHeader data={selectedProcurement} />
          <hr />
          <section>
            <FileList
              data={{
                id: selectedProcurement.id,
                files: selectedProcurement.files,
              }}
            />
            <ContentView />
          </section>
        </>
      ) : (
        <Loader size="m" />
      )}
    </div>
  )
}
