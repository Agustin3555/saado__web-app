import './DocumentControl.css'
import { useControlsStore } from '@/features/controls/store/useControls.store'
import { GlowIA, Icon } from '@/shared/components'
import { UpsetControlButton } from '@/features/controls/components/UpsetControlButton/UpsetControlButton'
import { type RelDocumentControl } from '../../document.types'

interface DocumentControlProps {
  data: RelDocumentControl
}

export const DocumentControl = ({ data }: DocumentControlProps) => {
  const controlsRecord = useControlsStore(s => s.controlsRecord)!

  return (
    <li className="cmp-document-control">
      <UpsetControlButton
        procurementType={data.procurementType}
        action="update"
        data={{
          id: data.id,
          controlId: data.controlId,
          verifierId: data.verifierId,
        }}
      />
      <div className="content">
        <p>{controlsRecord[data.controlId].name}</p>
        <Icon iconClass="ti ti-arrow-narrow-right-dashed" />
        <div className="verifier ui-s">
          Verifier
          {data.verifierId && <GlowIA />}
        </div>
      </div>
    </li>
  )
}
