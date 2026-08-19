import './ContentCard.css'
import type { ReactNode } from 'react'
import { useSelectedObraStore } from '@/features/obra/store/useSelectedObra.store'
import { Button, Icon, Loader } from '@/shared/components'

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

  const filePath = selectedObra?.files.find(f => f.id === id)?.path

  const contentMatch: Record<Status, ReactNode> = {
    loading: <Loader size="s" />,
    noContent: (
      <div className="void">
        <Icon iconClass="ti ti-circle-dashed-x" />
        <p>{noContentText}</p>
      </div>
    ),
    ready: children,
  }

  return (
    <article className="cmp-content-card show-animation-item">
      <header>
        <h1>
          <Icon {...{ iconClass }} />
          {filePath}
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
