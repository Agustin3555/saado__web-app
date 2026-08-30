import './ChangeVerdictButton.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import {
  Button,
  Field,
  Icon,
  Modal,
  Select,
  TextArea,
} from '@/shared/components'
import type { File } from '@/features/files/file.types'
import { getVerdict } from '@/features/files/helpers/getVerdict.helper'
import { VERDICT_MATCH } from '@/features/files/file.const'
import { toast } from 'sonner'

interface ChangeVerdictButtonProps {
  verdict: File['verdict']
}

export const ChangeVerdictButton = ({ verdict }: ChangeVerdictButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const verdictOptions = Object.entries(VERDICT_MATCH).map(([key, value]) => ({
    value: key,
    label: value,
  }))

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const data = {
        verdict: formValues.get.string('verdict')!,
        comments: formValues.get.string('comments'),
      }

      // await newObra(data)
      modal.close()
      toast.success('Veredicto actualizado con éxito')
    },
  )

  return (
    <Modal
      handlingClass="modal-form"
      ref={modalRef}
      opener={attrs => (
        <button
          className="cmp-change-verdict-button status-text ui-s"
          title="Cambiar veredicto"
          {...attrs}
        >
          <Icon iconClass="ti ti-pencil" />
          {getVerdict(verdict).text}
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1>Cambiar veredicto</h1>
        <div className="fields">
          <Field label="Veredicto">
            <Select
              options={verdictOptions}
              htmlAttrs={{ name: 'verdict', required: true }}
            />
          </Field>
          <Field label="Comentarios">
            <TextArea htmlAttrs={{ name: 'comments' }} />
          </Field>
        </div>
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
