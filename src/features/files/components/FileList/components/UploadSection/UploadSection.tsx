import './UploadSection.css'
import { useState, type ChangeEventHandler, type DragEventHandler } from 'react'
import { useHandleAction } from '@/shared/hooks/useHandleAction.hook'
import { Button, Icon } from '@/shared/components'
import { classList, varList } from '@/shared/helpers'
import { toast } from 'sonner'
import { privateInstance } from '@/infra/http/axios/instances'
import { useSelectedObraStore } from '@/features/obra/store/useSelectedObra.store'

const MAX_FILE_SIZE = 1024 * 1024 * 500

const VALID_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const VALID_EXTENSIONS = ['.pdf', '.xls', '.xlsx']

const normalizeFileName = (fileName: string) => fileName.trim().toLowerCase()

const validateFileType = (file: File) => {
  const normalizedName = normalizeFileName(file.name)
  const normalizedType = file.type.toLowerCase()

  return (
    VALID_MIME_TYPES.includes(normalizedType) ||
    VALID_EXTENSIONS.some(extension => normalizedName.endsWith(extension))
  )
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

interface UploadSectionProps {
  obraId: number
}

export const UploadSection = ({ obraId }: UploadSectionProps) => {
  const [dragOver, setDragOver] = useState(false)
  const [toUpload, setToUpload] = useState<File[]>([])
  const refetchSelectedObra = useSelectedObraStore(s => s.refetchSelectedObra)

  const addFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return

    setToUpload(prev => {
      const validIncomingFiles = Array.from(incomingFiles).filter(iFile => {
        const fileMsg = `El archivo '${iFile.name}' `

        if (MAX_FILE_SIZE <= iFile.size) {
          toast.error(fileMsg + 'supera el tamaño máximo')
          return false
        }

        if (!validateFileType(iFile)) {
          toast.error(fileMsg + 'no es un tipo válido')
          return false
        }

        if (prev.some(pFile => pFile.name === iFile.name)) {
          toast.warning(fileMsg + 'ya existe')
          return false
        }

        return true
      })

      return [...validIncomingFiles, ...prev]
    })
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDragOver: DragEventHandler<HTMLLabelElement> = e => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDrop: DragEventHandler<HTMLLabelElement> = e => {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
    setDragOver(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    addFiles(e.currentTarget.files)
  }

  const handleRemoveFile = (fileName: string) => () => {
    setToUpload(prev => prev.filter(file => file.name !== fileName))
  }

  const uploadAction = useHandleAction(async () => {
    if (toUpload.length === 0) return

    const formData = new FormData()
    formData.append('obraId', String(obraId))
    toUpload.forEach(file => formData.append('files', file))

    const {
      data: { omittedCount },
    } = await privateInstance.post<{
      created: []
      omittedCount: number
    }>('files', formData)

    // if (uploaded < 0) return
    // toast.success(
    //   `${uploaded} archivo${uploaded === 0 ? '' : 's'} subido${uploaded === 0 ? '' : 's'}`,
    // )

    // if (omit.length <= 0) return
    // toast.warning(
    //   `${omit.length} archivo${omit.length === 0 ? '' : 's'} omitido${omit.length === 0 ? '' : 's'}`,
    // )

    toast.warning(
      `${omittedCount} archivo${omittedCount === 0 ? '' : 's'} omitido${omittedCount === 0 ? '' : 's'}`,
    )

    await refetchSelectedObra()
    setToUpload([])
  })

  return (
    <div
      className="cmp-upload-section"
      inert={uploadAction.actionState !== 'ready'}
    >
      <label
        className={classList({ dragOver })}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name="files"
          accept=".pdf,.xls,.xlsx"
          multiple
          hidden
          onChange={handleChange}
        />
        <Icon iconClass="ti ti-file-plus" />
        <span className="text">
          Selecciona o suelta los archivos aquí (hasta{' '}
          {formatBytes(MAX_FILE_SIZE)} por archivo)
        </span>
      </label>
      {toUpload.length !== 0 && (
        <>
          <ul>
            {toUpload.map(({ name }, i) => (
              <li
                key={name}
                className="show-animation-item"
                style={varList({ i })}
              >
                <Button
                  title="Descartar"
                  iconClass="ti ti-x"
                  size="s"
                  type="primary"
                  onAction={handleRemoveFile(name)}
                />
                <span className="text">{name}</span>
              </li>
            ))}
          </ul>
          <Button
            text="Subir"
            iconClass="ti ti-upload"
            type="primary"
            {...uploadAction}
          />
        </>
      )}
    </div>
  )
}
