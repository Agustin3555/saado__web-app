import './ContentCard.css'
import type { ReactNode } from 'react'
import { useSelectedObraStore } from '@/features/obra/store/useSelectedObra.store'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useOriginsStore } from '@/features/origins/store/useOrigins.store'
import { Banner, Button, Icon, Loader } from '@/shared/components'

type Status = 'loading' | 'noContent' | 'ready'

interface ContentViewProps {
  fileId: number
  status: Status
  iconClass: string
  noContentText: string
  onDelete: () => void
  actions?: ReactNode
  children: ReactNode
}

export const ContentCard = ({
  fileId: id,
  status,
  iconClass,
  noContentText,
  actions,
  children,
  onDelete,
}: ContentViewProps) => {
  const selectedObra = useSelectedObraStore(s => s.selectedObra)
  const documentsRecord = useDocumentsStore(s => s.documentsRecord)!
  const originsRecord = useOriginsStore(s => s.originsRecord)!

  const file = selectedObra?.files.find(f => f.id === id)

  const title =
    file &&
    `${documentsRecord[file.document.id].name} • ${originsRecord[file.document.originId!].name}`

  const contentMatch: Record<Status, ReactNode> = {
    loading: <Loader size="s" />,
    noContent: (
      <div className="void">
        <Banner text={noContentText} />
      </div>
    ),
    ready: children,
  }

  return (
    <article className="cmp-content-card show-animation-item">
      <header>
        <h1>
          <Icon {...{ iconClass }} />
          {title}
        </h1>
        <div className="actions">
          {actions}
          <Button
            iconClass="ti ti-x"
            title="Eliminar selección"
            size="s"
            onAction={onDelete}
          />
        </div>
      </header>
      <div className="content">{contentMatch[status]}</div>
    </article>
  )
}
