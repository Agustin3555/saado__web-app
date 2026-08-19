import './FileCard.css'
import { Button, Icon, Toggle } from '@/shared/components'
import type { File } from '../../file.types'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { useSelectedContentStore } from '../../store/useSelectedContent.store'

interface FileCardProps {
  data: File
}

export const FileCard = ({
  data: { id, obraId, documentId, path, createdAt, updatedAt },
}: FileCardProps) => {
  const selected = useSelectedContentStore(s => s.selected)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const file = path?.split('/').pop()
  const name = `checkbox-${obraId}`

  return (
    <article className="cmp-file-card">
      <div className="status">
        <span>Aprobado</span>
        {/* <span>{statusId}</span> */}
      </div>
      <div className="content">
        <header>
          <button>
            <h1>{documentId}</h1>
            {/* <h1>{documentId}</h1> */}
            {/* TODO: span por Dropdown de actions */}
            <span>
              {/* <Button
                title="Reemplazar archivo"
                iconClass="ti ti-upload"
                size="s"
              />
              <Button
                title="Descargar archivo"
                iconClass="ti ti-download"
                size="s"
              /> */}
              <Icon iconClass="ti ti-file" />
              {file}
            </span>
          </button>
        </header>
        <div className="chips">
          <UserActivityChip dateTime={updatedAt} activity="updated" />
          <UserActivityChip dateTime={createdAt} />
        </div>
        <div className="logs"></div>
      </div>
      <div className="actions">
        <div className="container">
          <Toggle
            iconClass="ti ti-eye"
            title="Ver archivo"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'preview')}
            onChange={() => toggleFile(id, 'preview')}
          />
          <Toggle
            iconClass="ti ti-text-scan-ai"
            title="Ver contenido extraído"
            size="m"
            value={selected.some(
              i => i.id === id && i.type === 'extractedText',
            )}
            onChange={() => toggleFile(id, 'extractedText')}
          />
        </div>
      </div>
    </article>
  )
}
