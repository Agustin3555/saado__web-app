import './PreviewContentCard.css'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { ContentCard } from '../ContentCard/ContentCard'

interface PreviewContentCardProps {
  fileId: number
}

export const PreviewContentCard = ({ fileId }: PreviewContentCardProps) => {
  const previewItems = useSelectedContentStore(s => s.previewItems)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const url = previewItems[fileId]

  return (
    <ContentCard
      status={
        url === undefined ? 'loading' : url === null ? 'noContent' : 'ready'
      }
      iconClass="ti ti-eye"
      noContentText="No se puede visualizar este tipo de archivo"
      onDelete={() => toggleFile(fileId, 'preview')}
      {...{ fileId }}
    >
      {url && (
        <iframe
          className="cmp-preview-content-card"
          title="Visor PDF"
          src={url}
          width="100%"
        />
      )}
    </ContentCard>
  )
}
