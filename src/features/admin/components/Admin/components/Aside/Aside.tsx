import './Aside.css'
import { useLocation } from 'wouter'
import { Button, GlobalConfigButton } from '@/shared/components'
import { ViewButton, type ViewButtonProps } from '../ViewButton/ViewButton'
import { classList } from '@/shared/helpers'

const viewButtons: ViewButtonProps[] = [
  {
    name: 'dashboard',
    title: 'Panel',
    iconClass: 'ti ti-layout-dashboard',
  },
  {
    name: 'documentation',
    title: 'Documentaciones',
    iconClass: 'ti ti-folder-search',
  },
  {
    name: 'checks',
    title: 'Controles',
    iconClass: 'ti ti-list-check',
  },
]

interface AsideProps {
  isOpen: boolean
  handleClose: () => void
}

export const Aside = ({ isOpen, handleClose }: AsideProps) => {
  const [location] = useLocation()
  const currentView = location.slice(1)

  return (
    <aside className={classList('cmp-aside', { isOpen })}>
      <button title="Cerrar panel lateral" onClick={handleClose} />
      <div className="container">
        {/* TODO: todos los botones deben estar en ambos tipos */}

        <div className="aside expand">
          <img
            src="/imagotipo.png"
            alt="Imagotipo de la Dirección de Licitaciones y Contrataciones del Chaco"
          />
          <nav>
            {viewButtons.map(v => (
              <ViewButton
                key={v.name}
                selected={currentView === v.name}
                {...v}
              />
            ))}
          </nav>
        </div>

        <div className="aside collapse">
          <img
            src="/logo.png"
            alt="Logo de la Dirección de Licitaciones y Contrataciones del Chaco"
          />
          <nav>
            {viewButtons.map(v => (
              <ViewButton
                key={v.name}
                selected={currentView === v.name}
                onlyIcon
                {...v}
              />
            ))}
          </nav>
          <div className="bot">
            <Button title="Cambios" iconClass="ti ti-git-commit" size="l" />
            <Button title="Ayuda" iconClass="ti ti-help" size="l" />
            <GlobalConfigButton size="l" />
          </div>
        </div>
      </div>
    </aside>
  )
}
