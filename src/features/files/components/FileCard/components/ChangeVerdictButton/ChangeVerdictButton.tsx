import './ChangeVerdictButton.css'
import { useRef } from 'react'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useSelectedObraStore } from '@/features/obra/store/useSelectedObra.store'
import {
  Button,
  Field,
  Icon,
  Modal,
  Select,
  TextArea,
} from '@/shared/components'
import type { File, VerdictType } from '@/features/files/file.types'
import { getVerdict } from '@/features/files/helpers/getVerdict.helper'
import { VERDICT_MATCH } from '@/features/files/file.const'
import { toast } from 'sonner'
import { privateInstance } from '@/infra/http/axios/instances'

interface ChangeVerdictButtonProps {
  fileId: number
  verdict: File['verdict']
}

export const ChangeVerdictButton = ({
  fileId,
  verdict,
}: ChangeVerdictButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const verdictOptions = Object.entries(VERDICT_MATCH).map(([key, value]) => ({
    value: key,
    label: value,
  }))

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      const newVerdict = formValues.get.string('verdict') as VerdictType

      const data = {
        verdict: newVerdict,
        comments: formValues.get.string('comments'),
      }

      await privateInstance.patch(`files/${fileId}`, data)

      useSelectedObraStore.setState(store => {
        const { selectedObra } = store
        if (!selectedObra) return store

        const fileIndex = selectedObra.files.findIndex(f => f.id === fileId)
        if (fileIndex === -1) return store

        const newSelectedObra: typeof selectedObra = {
          ...selectedObra,
          files: selectedObra.files.map(f =>
            f.id === fileId ? { ...f, verdict: newVerdict } : f,
          ),
        }

        return { selectedObra: newSelectedObra }
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
