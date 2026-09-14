import './ProcurementTypeControls.css'
import type { ChangeEventHandler } from 'react'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useSelectedDocumentStore } from '@/features/docs/store/useSelectedDocument.store'
import { Checker } from '@/shared/components'
import { AddProcurementTypeButton } from '@/features/docs/components/DocumentList/components/Document/components'
import { PROCUREMENT_TYPE_INFO } from '../../procurement.const'
import type { ProcurementType } from '../../procurement.types'

interface ProcurementTypeControlsProps {
  type?: ProcurementType
  controls?: unknown[]
  isActive?: boolean
}

export const ProcurementTypeControls = ({
  type,
  controls,
  isActive = false,
}: ProcurementTypeControlsProps) => {
  const toggleProcurementType = useDocumentsStore(s => s.toggleProcurementType)
  const { id } = useSelectedDocumentStore(s => s.selectedDocument)!

  const handleToggleChange: ChangeEventHandler<HTMLInputElement> = async ({
    target: { checked },
  }) => {
    if (type) toggleProcurementType(id, type, checked)
  }

  return (
    <article className="cmp-procurement-type-controls">
      <header>
        {type && (
          <label>
            <input
              type="checkbox"
              name="procurementType"
              defaultChecked={isActive}
              hidden
              onChange={handleToggleChange}
            />
            <Checker />
          </label>
        )}
        <div className="group">
          <h1>{type ? PROCUREMENT_TYPE_INFO[type] : 'Global'}</h1>
          {!type && (
            <small>
              Estos controles se aplicarán a todos los tipos de contratación.
            </small>
          )}
        </div>
      </header>
      {controls && (
        <ul>
          {controls.map(c => (
            <li>{JSON.stringify(c, undefined, 2)}</li>
          ))}
          {/* <AddProcurementTypeButton /> */}
        </ul>
      )}
    </article>
  )
}
