import './TextArea.css'
import type { TextareaHTMLAttributes } from 'react'
import { classList } from '../../helpers'

export interface TextAreaProps {
  handlingClass?: string
  htmlAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export const TextArea = ({ handlingClass, htmlAttrs }: TextAreaProps) => (
  <div className={classList('cmp-text-area', 'ui-l', handlingClass)}>
    <textarea {...htmlAttrs} />
  </div>
)
