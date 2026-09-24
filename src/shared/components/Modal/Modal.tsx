import './Modal.css'
import {
  type MouseEventHandler,
  useId,
  type ReactNode,
  type RefObject,
  type ButtonHTMLAttributes,
} from 'react'
import { classList } from '../../helpers'

export interface ModalProps {
  handlingClass?: string
  ref?: RefObject<HTMLDialogElement | null>
  opener?: (
    // FIXME: Sobreescribir el modulo global, en vez de unir tipos
    attrs: ButtonHTMLAttributes<HTMLButtonElement> & {
      command?: string
      commandFor?: string
    },
  ) => ReactNode
  children: ReactNode | ReactNode[]
}

export const Modal = ({ handlingClass, ref, opener, children }: ModalProps) => {
  const id = useId()

  const handleClick: MouseEventHandler<HTMLDialogElement> = e => {
    const element = e.target as HTMLElement
    if (element.id !== id) return

    const dialog = element as HTMLDialogElement
    dialog.close()
  }

  return (
    <div className={classList('cmp-modal', handlingClass)}>
      {opener && opener({ command: 'show-modal', commandFor: id })}
      <dialog popover="auto" onClick={handleClick} {...{ id, ref }}>
        <div className="content">{children}</div>
      </dialog>
    </div>
  )
}
