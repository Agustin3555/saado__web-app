import './ControlItem.css'
import { useControlsStore } from '@/features/controls/store/useControls.store'
import { useSelectedProcurementStore } from '@/features/procurements/store/useSelectedProcurement.store'
import {
  ChangeVerdictButton,
  CurrentCommentButton,
  GlowIA,
  type ChangeVerdictButtonProps,
} from '@/shared/components'
import type { File } from '@/features/files/file.types'
import { classList } from '@/shared/helpers'
import { VERDICT_MATCH } from '@/features/files/file.const'

interface ControlItemProps {
  fileId: number
  data: File['fileControls'][number]
}

export const ControlItem = ({
  fileId,
  data: { controlId, verdict, verdictCommentary },
}: ControlItemProps) => {
  const controlsRecord = useControlsStore(s => s.controlsRecord)!
  const updateFileControlVerdict = useSelectedProcurementStore(
    s => s.updateFileControlVerdict,
  )

  const onChange: ChangeVerdictButtonProps['onChange'] = async data => {
    await updateFileControlVerdict({ fileId, controlId, ...data })
  }

  return (
    <li
      className={classList(
        'cmp-control-item',
        'verdict',
        VERDICT_MATCH[verdict].id,
      )}
    >
      <div className="verdict-group">
        <ChangeVerdictButton {...{ verdict, onChange }} />
        {verdictCommentary && (
          <CurrentCommentButton comment={verdictCommentary} />
        )}
      </div>
      <p className="text" title={controlsRecord[controlId].name}>
        {controlsRecord[controlId].name}
      </p>
      {/* <button className="verify ui-s">
        <GlowIA />
        Verificar
      </button> */}
    </li>
  )
}
