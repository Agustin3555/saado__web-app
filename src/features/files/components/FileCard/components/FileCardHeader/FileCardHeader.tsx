import './FileCardHeader.css'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { Button, Dropdown } from '@/shared/components'
import { OriginChip } from '@/features/origins/components/OriginChip/OriginChip'
import type { File } from '@/features/files/file.types'

interface FileCardHeaderProps {
  data: Pick<File, 'path' | 'document'>
}

export const FileCardHeader = ({
  data: { document, path },
}: FileCardHeaderProps) => {
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!

  const file = path?.split('/').pop()

  return (
    <header className="cmp-file-card-header">
      <div className="top">
        <h1 className="text">{documentsRecord[document.id].name}</h1>
        {/* TODO: eliminar, cambiar el tipo de documento (volver a identificar, forzar)  */}
        <Dropdown
          opener={attrs => (
            <Button
              iconClass="ti ti-dots-vertical"
              size="s"
              htmlAttrs={attrs}
            />
          )}
        >
          <Button
            text="Eliminar"
            title="Eliminar archivo"
            iconClass="ti ti-trash"
            type="primary"
            inverted
          />
        </Dropdown>
      </div>
      <div className="actions">
        <OriginChip id={document.originId} />
        <Dropdown
          opener={attrs => (
            <Button
              text={file}
              iconClass="ti ti-file"
              size="s"
              inverted
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
        {/* <Button
          handlingClass="verify"
          text="Verificar"
          iconClass="ti ti-zoom-check"
          size="s"
          type="primary"
          actionState={status === 'PROCESS' ? 'loading' : undefined}
        /> */}
      </div>
    </header>
  )
}
