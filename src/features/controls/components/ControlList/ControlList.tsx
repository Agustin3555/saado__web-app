import './ControlList.css'
import { useControlsStore } from '../../store/useControls.store'
import { ControlCard, NewControlButton } from './components'

export const ControlList = () => {
  const controls = useControlsStore(s => s.controls)

  return (
    <div className="cmp-control-list">
      <article className="result">
        <ul>
          <NewControlButton />
          {controls?.map((c, i) => (
            <ControlCard key={c.id} data={c} {...{ i }} />
          ))}
        </ul>
      </article>
    </div>
  )
}
