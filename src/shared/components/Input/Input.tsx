import './Input.css'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { classList } from '../../helpers'

export interface InputProps {
  size?: 'm' | 'l'
  handlingClass?: string
  htmlAttrs?: InputHTMLAttributes<HTMLInputElement>
  children?: ReactNode
}

export const Input = ({
  size = 'l',
  handlingClass,
  htmlAttrs,
  children,
}: InputProps) => (
  <div className={classList('cmp-input', `ui-${size}`, handlingClass)}>
    <input {...htmlAttrs} />
    {children && <div className="actions">{children}</div>}
  </div>
)
