import './FileCard.css'
import { useSelectedContentStore } from '../../store/useSelectedContent.store'
import { useSelectedProcurementStore } from '@/features/procurements/store/useSelectedProcurement.store'
import {
  ChangeVerdictButton,
  Tabs,
  Toggle,
  type ChangeVerdictButtonProps,
  type TabsProps,
} from '@/shared/components'
import type { File } from '../../file.types'
import { Controls, FileCardHeader, Info, LogList } from './components'
import { classList } from '@/shared/helpers'
import { VERDICT_MATCH } from '../../file.const'
import { privateInstance } from '@/infra/http/axios/instances'

interface FileCardProps {
  data: File
}

export const FileCard = ({
  data: { id, document, path, verdict, createdAt, updatedAt, fileControls },
}: FileCardProps) => {
  const selected = useSelectedContentStore(s => s.selected)
  const toggleFile = useSelectedContentStore(s => s.toggleFile)

  const panels: TabsProps['panels'] = [
    {
      label: 'Resumen',
      iconClass: 'ti ti-info-square-rounded',
      component: <Info data={{ createdAt, updatedAt, fileControls }} />,
    },
    {
      label: 'Controles',
      iconClass: 'ti ti-checkbox',
      component: <Controls data={{ id, fileControls }} />,
    },
    // {
    //   label: 'Historial',
    //   iconClass: 'ti ti-history',
    //   component: <LogList fileId={id} />,
    // },
  ]

  const onChange: ChangeVerdictButtonProps['onChange'] = async data => {
    await privateInstance.patch(`files/${id}`, data)

    useSelectedProcurementStore.setState(s => {
      const { selectedProcurement } = s
      if (!selectedProcurement) return s

      const fileIndex = selectedProcurement.files.findIndex(f => f.id === id)
      if (fileIndex === -1) return s

      const newSelectedProcurement: typeof selectedProcurement = {
        ...selectedProcurement,
        files: selectedProcurement.files.map(f =>
          f.id === id ? { ...f, verdict: data.verdict } : f,
        ),
      }

      return { selectedProcurement: newSelectedProcurement }
    })
  }

  return (
    <article className="cmp-file-card">
      <div className={classList('verdict', VERDICT_MATCH[verdict].id)}>
        <ChangeVerdictButton
          orientation="vertical"
          {...{ verdict, onChange }}
        />
      </div>
      <div className="content">
        <FileCardHeader data={{ id, document, path }} />
        <Tabs {...{ panels }} />
      </div>
      <div className="toggles">
        <div className="container">
          <Toggle
            iconClass="ti ti-eye"
            title="Ver archivo"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'viewerUrl')}
            onChange={() => toggleFile(id, 'viewerUrl')}
          />
          <Toggle
            iconClass="ti ti-text-scan-2"
            title="Ver contenido extraído"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'text')}
            onChange={() => toggleFile(id, 'text')}
          />
          <Toggle
            iconClass="ti ti-hexagon-letter-d"
            title="Ver datos extraído"
            size="m"
            value={selected.some(i => i.id === id && i.type === 'data')}
            onChange={() => toggleFile(id, 'data')}
          />
        </div>
      </div>
    </article>
  )
}
