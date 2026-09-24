import './VerdictManager.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import {
  Button,
  Dropdown,
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

export interface VerdictManagerProps {
  data: {
    verdict: VerdictType
    verdictCommentary: string | null
  }
  orientation?: 'horizontal' | 'vertical'
  onChange: (data: {
    verdict: VerdictType
    verdictCommentary?: string
  }) => Promise<void>
}

export const VerdictManager = ({
  data: { verdict, verdictCommentary },
  orientation = 'horizontal',
  onChange,
}: VerdictManagerProps) => {
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
    <div className={classList('cmp-verdict-manager', 'ui-s', orientation)}>
      <div className="current">
        {verdictCommentary && (
          <Dropdown
            opener={attrs => (
              <button className="commentary" title="Ver comentario" {...attrs}>
                <Icon handlingClass="transformed" iconClass="ti ti-message" />
              </button>
            )}
          >
            <Icon iconClass="ti ti-quote" />
            <p className="text">{verdictCommentary}</p>
          </Dropdown>
        )}
        <p className="verdict-value">{VERDICT_MATCH[verdict].title}</p>
      </div>
      <Modal
        handlingClass="modal-form"
        ref={modalRef}
        opener={attrs => (
          <button className="edit" title="Cambiar veredicto" {...attrs}>
            <Icon handlingClass="transformed" iconClass="ti ti-pencil" />
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
    </div>
  )
}
