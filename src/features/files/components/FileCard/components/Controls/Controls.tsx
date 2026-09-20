import './Controls.css'
import { ControlItem } from './components'
import type { File } from '@/features/files/file.types'

interface ControlsProps {
  data: Pick<File, 'id' | 'fileControls'>
}

export const Controls = ({ data: { id, fileControls } }: ControlsProps) => {
  return (
    <div className="cmp-controls">
      <ul className="ui-s">
        {fileControls.map(fc => (
          <ControlItem key={fc.id} fileId={id} data={fc} />
        ))}
      </ul>
    </div>
  )
}
