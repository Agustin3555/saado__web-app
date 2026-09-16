import './Document.css'
import { useEffect, useState } from 'react'
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
import { classList } from '@/shared/helpers'

export const Document = () => {
  const [isEditing, setIsEditing] = useState(false)
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

  const globalControls = controls.filter(c => !c.procurementType)

  return (
    <Resource
      handlingClass="cmp-document"
      title={name}
      detailsSlot={
        <>
          <Toggle
            title="Activar edición"
            iconClass="ti ti-pencil"
            size="s"
            style="switch"
            onChange={() => setIsEditing(prev => !prev)}
          />
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
        <section className={classList({ isEditing })}>
          <div className="in-procurement-type">
            <ProcurementTypeControls controls={globalControls} />
            {Object.keys(PROCUREMENT_TYPE_INFO).map(t => {
              const isActive = procurementTypes.find(
                ({ procurementType }) => procurementType === t,
              )?.isActive

              const typeControls = controls.filter(c => c.procurementType === t)

              return (
                <ProcurementTypeControls
                  key={t}
                  type={t as ProcurementType}
                  controls={typeControls}
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
