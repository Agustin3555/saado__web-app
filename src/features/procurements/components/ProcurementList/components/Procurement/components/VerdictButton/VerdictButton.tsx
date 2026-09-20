import './VerdictButton.css'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useOriginsStore } from '@/features/origins/store/useOrigins.store'
import { useSelectedProcurementStore } from '@/features/procurements/store/useSelectedProcurement.store'
import { Button, Icon, Modal } from '@/shared/components'
import type { Procurement } from '@/features/procurements/procurement.types'
import { VERDICT_MATCH } from '@/features/files/file.const'
import { classList } from '@/shared/helpers'

interface VerdictButtonProps {
  data: Pick<Procurement, 'verdict'>
}

export const VerdictButton = ({ data: { verdict } }: VerdictButtonProps) => {
  const documents = useDocumentsStore(s => s.documents)!
  const originsRecord = useOriginsStore(s => s.originsRecord)!
  const { files } = useSelectedProcurementStore(s => s.selectedProcurement)!

  const verdictInfo = VERDICT_MATCH[verdict]

  return (
    <li
      className={classList(
        'cmp-verdict-button',
        'ui-s',
        'verdict',
        verdictInfo.id,
      )}
    >
      <p className="verdict-value">{verdictInfo.title}</p>
      <Modal
        opener={attrs => (
          <Button
            iconClass="ti ti-list-check"
            size="s"
            type="primary"
            htmlAttrs={attrs}
          />
        )}
      >
        <article>
          <h1>Requisitos</h1>
          <p className="text">
            {verdict === 'APPROVED'
              ? 'Esta contratación cumple con todos los requisitos de documentación para avanzar.'
              : 'Se requiere la siguiente documentación:'}
          </p>
          <ol>
            {documents.map(({ id, name, originId }) => {
              const approve = files.some(f => f.document.id === id)
              const title = `${name} • ${originsRecord[originId!].name}`

              return (
                <li key={id} className={classList('ui-m', { approve })}>
                  <Icon iconClass="ti ti-file" />
                  <p className="text">{title}</p>
                </li>
              )
            })}
          </ol>
        </article>
      </Modal>
    </li>
  )
}
