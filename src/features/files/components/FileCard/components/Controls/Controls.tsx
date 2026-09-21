import './Controls.css'
import { useHandleAction } from '@/shared/hooks/useHandleAction.hook'
import { useSelectedProcurementStore } from '@/features/procurements/store/useSelectedProcurement.store'
import { Button } from '@/shared/components'
import { ControlItem } from './components'
import type { File } from '@/features/files/file.types'

interface ControlsProps {
  data: Pick<File, 'id' | 'fileControls'>
}

export const Controls = ({ data: { id, fileControls } }: ControlsProps) => {
  const addFileControls = useSelectedProcurementStore(s => s.addFileControls)

  const addControlsAction = useHandleAction(async () => {
    await addFileControls(id)
  })

  return (
    <div className="cmp-controls">
      <div className="actions">
        <Button
          handlingClass="add-controls"
          text="Sincronizar"
          iconClass="ti ti-progress-down"
          size="s"
          type="secondary"
          inverted
          {...addControlsAction}
        />
      </div>
      <ul className="ui-s">
        {fileControls.map(fc => (
          <ControlItem key={fc.id} fileId={id} data={fc} />
        ))}
      </ul>
    </div>
  )
}
