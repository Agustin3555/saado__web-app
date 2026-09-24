import './UpsertButton.css'
import { useRef, type ReactNode } from 'react'
import {
  useSubmitAction,
  type FormValues,
} from '@/shared/hooks/useSubmitAction.hook'
import { Banner, Button, Modal } from '@/shared/components'
import { toast } from 'sonner'

export interface UpsertButtonProps {
  resourceName: { name: string; gender?: 'male' | 'female' }
  action: 'NEW' | 'UPDATE'
  onSubmit: (formValues: FormValues<'create'>) => Promise<void>
  children: ReactNode[]
}

export const UpsertButton = ({
  resourceName: { name, gender = 'male' },
  action = 'NEW',
  onSubmit,
  children,
}: UpsertButtonProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const isMale = gender === 'male'

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues }) => {
      if (!modalRef.current) return
      const modal = modalRef.current

      await onSubmit(formValues)

      modal.close()

      toast.success(
        `${name} ${action === 'NEW' ? `cread${isMale ? 'o' : 'a'}` : `editad${isMale ? 'o' : 'a'}`} con éxito`,
      )
    },
  )

  return (
    <Modal
      handlingClass="cmp-upsert-button modal-form"
      ref={modalRef}
      opener={attrs =>
        action === 'NEW' ? (
          <button className="new hover-highlight" type="button" {...attrs}>
            <Banner
              text={`Nuev${isMale ? 'o' : 'a'} ${name.toLowerCase()}`}
              iconClass="ti ti-square-rounded-plus"
            />
          </button>
        ) : (
          <Button
            handlingClass="update"
            title={`Editar est${isMale ? 'e' : 'a'} ${name.toLowerCase()}`}
            iconClass="ti ti-pencil"
            size="s"
            htmlAttrs={attrs}
          />
        )
      }
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text">
          {action === 'NEW'
            ? `Nuev${isMale ? 'o' : 'a'}`
            : `Editar est${isMale ? 'e' : 'a'}`}{' '}
          {name.toLowerCase()}
        </h1>
        <div className="fields">{children}</div>
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
