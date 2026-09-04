import './VerdictButton.css'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useOriginsStore } from '@/features/origins/store/useOrigins.store'
import { useSelectedObraStore } from '@/features/obra/store/useSelectedObra.store'
import { Button, Icon, Modal } from '@/shared/components'
import { classList } from '@/shared/helpers'

export const VerdictButton = () => {
  const documents = useDocumentsStore(s => s.documents)!
  const originsRecord = useOriginsStore(s => s.originsRecord)!
  const { files } = useSelectedObraStore(s => s.selectedObra)!

  const verdict = documents.length === files.length ? 'approve' : 'reject'

  return (
    <li className={classList('cmp-verdict-button', 'ui-s', verdict)}>
      <p className="status-text">
        {verdict === 'approve' ? 'Aprobado' : 'Rechazado'}
      </p>
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
            {verdict === 'approve'
              ? 'Esta obra cumple con todos los requisitos de documentación para avanzar.'
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
