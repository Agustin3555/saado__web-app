import './ObraCard.css'
import type { Obra } from '../../store/useObras.store'

interface ObraCardProps {
  data: Obra
}

export const ObraCard = ({
  data: { numeroExpediente, name, updatedAt },
}: ObraCardProps) => {
  return (
    <li className="cmp-obra-card" title={name}>
      <h1>{numeroExpediente}</h1>
      <div className="details">
        <p>
          <span className="title">Obra:</span>
          <span className="value">{name}</span>
        </p>
        <p>
          <span className="title">Actualizado:</span>
          <span className="value">{updatedAt}</span>
        </p>
      </div>
    </li>
  )
}
