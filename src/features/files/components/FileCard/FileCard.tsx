import './FileCard.css'
import { useSelectedContentStore } from '../../store/useSelectedContent.store'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { Button, Dropdown, Toggle } from '@/shared/components'
import type { File } from '../../file.types'
import { LogList } from './components'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { OriginChip } from '@/features/origins/components/OriginChip/OriginChip'

interface FileCardProps {
  status?: 'PROCESS'
  data: File
}

export const FileCard = ({
  status,
  data: { id, obraId, document, path, createdAt, updatedAt },
}: FileCardProps) => {
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!
  const selected = useSelectedContentStore(s => s.selected)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const file = path?.split('/').pop()
  const name = `checkbox-${obraId}`

  return (
    <article className="cmp-file-card">
      <div className="status">
        <span className="status-text">Aprobado</span>
        {/* <span>{statusId}</span> */}
      </div>
      <div className="content">
        <header>
          <h1 className="text">{documentsRecord[document.id].name}</h1>
          <div className="actions">
            <Dropdown
              opener={attrs => (
                <Button
                  handlingClass="file"
                  text={file}
                  iconClass="ti ti-file"
                  size="s"
                  inverted
                  wrap
                  htmlAttrs={attrs}
                />
              )}
            >
              {/* TODO: descargar */}
              <Button
                text="Descargar"
                title="Descargar archivo"
                iconClass="ti ti-download"
                type="primary"
                inverted
              />
              {/* TODO: reemplazar abriendo un Modal y dentro UploadSection pero limitando a cargar solo 1 archivo */}
              <Button
                text="Reemplazar"
                title="Reemplazar archivo"
                iconClass="ti ti-upload"
                type="primary"
                inverted
              />
            </Dropdown>
            <Button
              handlingClass="verify"
              text="Verificar"
              iconClass="ti ti-zoom-check"
              size="s"
              type="primary"
              actionState={status === 'PROCESS' ? 'loading' : undefined}
            />
          </div>
        </header>
        <div className="chips">
          <OriginChip id={document.originId} />
          <UserActivityChip dateTime={updatedAt} activity="updated" />
          <UserActivityChip dateTime={createdAt} />
        </div>
        <LogList fileId={id} />
      </div>
      <div className="toggles">
        <div className="container">
          <Toggle
            iconClass="ti ti-eye"
            title="Ver archivo"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'viewerUrl')}
            onChange={() => toggleFile(id, 'viewerUrl')}
          />
          <Toggle
            iconClass="ti ti-text-scan-2"
            title="Ver contenido extraído"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'text')}
            onChange={() => toggleFile(id, 'text')}
          />
          <Toggle
            iconClass="ti ti-hexagon-letter-d"
            title="Ver datos extraído"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'data')}
            onChange={() => toggleFile(id, 'data')}
          />
        </div>
      </div>
    </article>
  )
}
