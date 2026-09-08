import './FileList.css'
import { FileCard } from '@/features/files/components/FileCard/FileCard'
import type { Procurement } from '@/features/procurements/procurement.types'
import { UploadSection } from './components'

interface FileListProps {
  data: Pick<Procurement, 'id' | 'files'>
}

export const FileList = ({ data: { id, files } }: FileListProps) => {
  return (
    <div className="cmp-file-list">
      <UploadSection procurementId={id} />
      {files.map(f => (
        <FileCard key={f.id} data={f} />
      ))}
    </div>
  )
}
