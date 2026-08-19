import './ExtractedTextContentCard.css'
import { useHandleAction } from '@/shared/hooks/useHandleAction.hook'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { Button } from '@/shared/components'
import { ContentCard } from '../ContentCard/ContentCard'

interface ExtractedTextContentCardProps {
  fileId: number
}

export const ExtractedTextContentCard = ({
  fileId,
}: ExtractedTextContentCardProps) => {
  const extractedTextItems = useSelectedContentStore(s => s.extractedTextItems)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const fileContent = extractedTextItems[fileId]

  const copyAction = useHandleAction(async () => {
    if (fileContent) await navigator.clipboard.writeText(fileContent)
  })

  return (
    <ContentCard
      status={
        fileContent === undefined
          ? 'loading'
          : fileContent === null
            ? 'noContent'
            : 'ready'
      }
      iconClass="ti ti-text-scan-ai"
      noContentText="No se encontró contenido extraído de este archivo"
      onDelete={() => toggleFile(fileId, 'extractedText')}
      actions={
        fileContent && (
          <Button
            iconClass="ti ti-copy"
            title="Copiar contenido"
            size="s"
            {...copyAction}
          />
        )
      }
      {...{ fileId }}
    >
      <p className="cmp-extracted-text-content-card text">{fileContent}</p>
    </ContentCard>
  )
}
