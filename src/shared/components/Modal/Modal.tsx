import './Modal.css'
import {
  type MouseEventHandler,
  useId,
  type ReactNode,
  type RefObject,
  type ButtonHTMLAttributes,
} from 'react'
import { classList } from '../../helpers'

interface ModalProps {
  ref?: RefObject<HTMLDialogElement | null>
  // FIXME: Sobreescribir el modulo global
  opener?: (
    attrs: ButtonHTMLAttributes<HTMLButtonElement> & {
      command?: string
      commandFor?: string
    },
  ) => ReactNode
  children: ReactNode | ReactNode[]
  handlingClass?: string
}

export const Modal = ({ ref, opener, children, handlingClass }: ModalProps) => {
  const id = useId()

  const handleClick: MouseEventHandler<HTMLDialogElement> = e => {
    const element = e.target as HTMLElement
    if (element.id !== id) return

    const dialog = element as HTMLDialogElement
    dialog.close()
  }

  return (
    <>
      {opener && opener({ command: 'show-modal', commandFor: id })}
      <dialog
        className={classList('cmp-modal', handlingClass)}
        popover="auto"
        onClick={handleClick}
        {...{ id, ref }}
      >
        <div className="content">{children}</div>
      </dialog>
    </>
  )
}
