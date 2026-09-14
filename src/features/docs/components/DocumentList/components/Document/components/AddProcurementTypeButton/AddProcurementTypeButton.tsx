import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { Button, CheckboxList, Modal } from '@/shared/components'
import { PROCUREMENT_TYPE_OPTIONS } from '@/features/procurements/procurement.const'
import type { SimpleDocument } from '@/features/docs/document.types'
import { toast } from 'sonner'

interface AddProcurementTypeButtonProps {
  data: SimpleDocument
}

export const AddProcurementTypeButton = ({
  data: { name },
}: AddProcurementTypeButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const procurementTypes = formValues.getAll.string('procurementTypes')

      // await newProcurement(data)

      modal.close()
      toast.success('Documento editado con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <Button
          text="Administrar según la contratación"
          iconClass="ti ti-square-rounded-check"
          size="s"
          inverted
          htmlAttrs={attrs}
        />
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text">Administrar según la contratación</h1>
        <p className="text">
          Aquí puedes administrar en donde puede existir el documento{' '}
          <strong>"{name}"</strong> según el tipo de contratación.
        </p>
        <CheckboxList
          name="procurementTypes"
          options={PROCUREMENT_TYPE_OPTIONS}
        />
        <Button
          text="Confirmar"
          iconClass="ti ti-check"
          type="primary"
          submit
          {...{ actionState }}
        />
      </form>
    </Modal>
  )
}
