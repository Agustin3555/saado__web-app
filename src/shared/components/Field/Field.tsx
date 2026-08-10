import './Field.css'
import { type ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import { Dropdown } from '../Dropdown/Dropdown'

interface Field {
  label: string
  iconClass?: string
  desc?: string
  children: ReactNode
}

export const Field = ({ label, iconClass, desc, children }: Field) => (
  <label className="cmp-field">
    <header>
      <div className="title">
        {iconClass && <Icon {...{ iconClass }} />}
        <span>{label}</span>
        <Icon iconClass="ti ti-asterisk" />
      </div>
      {desc && (
        <Dropdown
          opener={popoverTarget => (
            <button type="button" {...{ popoverTarget }}>
              <Icon iconClass="fa-solid fa-info-circle" />
            </button>
          )}
        >
          <div className="tooltip text">
            <span>{label}</span>
            <div className="content">{desc}</div>
          </div>
        </Dropdown>
      )}
    </header>
    {children}
  </label>
)
