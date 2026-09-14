import './Header.css'
import { Icon } from '@/shared/components/Icon/Icon'
import { Button } from '@/shared/components/Button/Button'

interface HeaderProps {
  asideIsOpen: boolean
  handleAsideToggle: () => void
}

export const Header = ({ asideIsOpen, handleAsideToggle }: HeaderProps) => {
  return (
    <header className="cmp-header">
      <Button
        title="Controlar barra lateral"
        iconClass={`ti ti-layout-sidebar-left-${asideIsOpen ? 'collapse' : 'expand'}`}
        onAction={handleAsideToggle}
      />
      <label className="searchbar ui-m">
        <Icon iconClass="ti ti-search" />
        <input name="search" placeholder="Buscar expediente..." />
      </label>
      <div className="user"></div>
    </header>
  )
}
