import './Document.css'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useSelectedDocumentStore } from '@/features/docs/store/useSelectedDocument.store'
import { Resource } from '@/shared/layouts'
import { Chip, Loader, Toggle } from '@/shared/components'
import { OriginChip } from '@/features/origins/components/OriginChip/OriginChip'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { ProcurementTypeControls } from '@/features/procurements/components/ProcurementTypeControls/ProcurementTypeControls'
import { PROCUREMENT_TYPE_INFO } from '@/features/procurements/procurement.const'
import type { ProcurementType } from '@/features/procurements/procurement.types'

export const Document = () => {
  const [, setLocation] = useLocation()
  const { id } = useParams<{ id: string }>()
  const selectedDocument = useSelectedDocumentStore(s => s.selectedDocument)
  const refetchSelectedDocument = useSelectedDocumentStore(
    s => s.refetchSelectedDocument,
  )

  useEffect(() => {
    const numberId = parseInt(id)

    const exist = useDocumentsStore
      .getState()
      .documents?.some(document => document.id === numberId)

    if (exist) {
      refetchSelectedDocument(numberId)
      return
    }

    if (window.history.length > 1) window.history.back()
    else setLocation('/')
  }, [id, refetchSelectedDocument, setLocation])

  if (!selectedDocument) return <Loader size="l" />

  const { originId, name, updatedAt, createdAt, procurementTypes, controls } =
    selectedDocument

  return (
    <Resource
      handlingClass="cmp-document"
      title={name}
      detailsSlot={
        <>
          <OriginChip id={originId} />
          <Chip
            label="Controles"
            value={controls.length}
            iconClass="ti ti-stack-3"
          />
          <UserActivityChip dateTime={updatedAt} activity="updated" />
          <UserActivityChip dateTime={createdAt} />
        </>
      }
      contentSlot={
        <section>
          <Toggle
            title="Activar edición"
            iconClass="ti ti-pencil"
            size="s"
            style="switch"
          />
          <div className="in-procurement-type">
            <ProcurementTypeControls />
            {Object.keys(PROCUREMENT_TYPE_INFO).map(t => {
              const isActive = procurementTypes.find(
                ({ procurementType }) => procurementType === t,
              )?.isActive

              return (
                <ProcurementTypeControls
                  key={t}
                  type={t as ProcurementType}
                  {...{ isActive }}
                />
              )
            })}
          </div>
        </section>
      }
    />
  )
}
