import './ConfirmModal.css'
import { useRef } from 'react'
import { Button, type ButtonProps } from '../Button/Button'
import { Modal, type ModalProps } from '../Modal/Modal'

interface ConfirmModalProps
  extends Pick<ModalProps, 'opener'>, Pick<ButtonProps, 'onAction'> {
  message: string
}

export const ConfirmModal = ({
  message,
  onAction,
  opener,
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const closeProps: ButtonProps['htmlAttrs'] = {
    commandFor: modalRef.current?.id,
    command: 'close',
  }

  return (
    <Modal handlingClass="cmp-confirm-modal" ref={modalRef} {...{ opener }}>
      <p className="text">{message}</p>
      <div className="buttons">
        <Button
          handlingClass="cancel"
          text="Cancelar"
          iconClass="ti ti-x"
          htmlAttrs={closeProps}
        />
        <Button
          handlingClass="yes"
          text="Confirmar"
          iconClass="ti ti-check"
          type="primary"
          htmlAttrs={closeProps}
          {...{ onAction }}
        />
      </div>
    </Modal>
  )
}
