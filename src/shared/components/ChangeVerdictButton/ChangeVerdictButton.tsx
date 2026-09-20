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
import type { VerdictType } from '@/features/files/file.types'
import { VERDICT_MATCH } from '@/features/files/file.const'
import { toast } from 'sonner'
import { classList } from '@/shared/helpers'

interface ChangeVerdictData {
  verdict: VerdictType
  verdictCommentary?: string
}

export interface ChangeVerdictButtonProps {
  verdict: VerdictType
  orientation?: 'horizontal' | 'vertical'
  onChange: (data: ChangeVerdictData) => Promise<void>
}

export const ChangeVerdictButton = ({
  verdict,
  orientation = 'horizontal',
  onChange,
}: ChangeVerdictButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const verdictOptions = Object.entries(VERDICT_MATCH).map(([key, value]) => ({
    value: key,
    label: value.title,
  }))

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      await onChange({
        verdict: formValues.get.string('verdict') as VerdictType,
        verdictCommentary: formValues.get.string('verdictCommentary'),
      })

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
          className={classList(
            'cmp-change-verdict-button',
            'verdict-value',
            'ui-s',
            orientation,
          )}
          title="Cambiar veredicto"
          {...attrs}
        >
          <Icon iconClass="ti ti-pencil" />
          {VERDICT_MATCH[verdict].title}
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
            <TextArea htmlAttrs={{ name: 'verdictCommentary' }} />
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
