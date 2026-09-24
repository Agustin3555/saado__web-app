import './ExtractedTextContentCard.css'
import { useHandleAction } from '@/shared/hooks/useHandleAction.hook'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { Button, Toggle } from '@/shared/components'
import { ContentCard } from '../ContentCard/ContentCard'
import { useState } from 'react'
import { classList } from '@/shared/helpers'

interface ExtractedTextContentCardProps {
  fileId: number
}

export const ExtractedTextContentCard = ({
  fileId,
}: ExtractedTextContentCardProps) => {
  const [textWrap, setTextWrap] = useState(false)
  const textRecord = useSelectedContentStore(s => s.textRecord)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const fileContent = textRecord[fileId]

  const copyAction = useHandleAction(async () => {
    if (fileContent) await navigator.clipboard.writeText(fileContent)
  })

  return (
    <ContentCard
      handlingClass="cmp-extracted-text-content-card"
      status={
        fileContent === undefined
          ? 'loading'
          : fileContent === null
            ? 'noContent'
            : 'ready'
      }
      iconClass="ti ti-text-scan-2"
      noContentText="No se encontró contenido extraído de este archivo"
      onDelete={() => toggleFile(fileId, 'text')}
      actions={
        <>
          <Toggle
            title="Ver saltos y espacios"
            iconClass="ti ti-text-wrap"
            size="s"
            value={textWrap}
            setValue={() => setTextWrap(prev => !prev)}
          />
          {fileContent && (
            <Button
              iconClass="ti ti-copy"
              title="Copiar contenido"
              size="s"
              {...copyAction}
            />
          )}
        </>
      }
      {...{ fileId }}
    >
      <p className={classList('text', { wrap: textWrap })}>{fileContent}</p>
    </ContentCard>
  )
}
