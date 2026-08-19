import './FileList.css'
import { FileCard } from '@/features/files/components/FileCard/FileCard'
import type { Obra } from '@/features/obra/obra.types'
import { UploadSection } from './components'

interface FileListProps {
  data: Pick<Obra, 'id' | 'files'>
}

export const FileList = ({ data: { id, files } }: FileListProps) => {
  return (
    <div className="cmp-file-list">
      <UploadSection obraId={id} />
      {files.map(f => (
        <FileCard key={f.id} data={f} />
      ))}
    </div>
  )
}
