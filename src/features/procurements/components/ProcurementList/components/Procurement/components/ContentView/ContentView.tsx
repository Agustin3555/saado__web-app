import './ContentView.css'
import type { ReactNode } from 'react'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { ExtractedTextContentCard } from '@/features/files/components/ExtractedTextContentCard/ExtractedTextContentCard'
import { PreviewContentCard } from '@/features/files/components/PreviewContentCard/PreviewContentCard'

export const ContentView = () => {
  const selected = useSelectedContentStore(s => s.selected)

  return (
    <div className="cmp-content-view">
      {selected.map(({ id, type }) => {
        const key = [id, type].join('_')

        const components: Record<typeof type, ReactNode> = {
          viewerUrl: <PreviewContentCard key={key} fileId={id} />,
          text: <ExtractedTextContentCard key={key} fileId={id} />,
        }

        return components[type]
      })}
    </div>
  )
}
