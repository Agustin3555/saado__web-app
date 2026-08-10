import { type SubmitEventHandler } from 'react'
import { useActionState } from './useActionState.hook'

type SubmitActionMode = 'create' | 'edit'
type EmptyValueForMode<M extends SubmitActionMode> = M extends 'create'
  ? undefined
  : null

interface FormValues<M extends SubmitActionMode = 'edit'> {
  get: {
    string: (key: string) => string | EmptyValueForMode<M>
    number: (key: string) => number | EmptyValueForMode<M>
    boolean: (key: string) => boolean | EmptyValueForMode<M>
  }
  getAll: {
    number: (key: string) => number[] | EmptyValueForMode<M>
  }
}

const DEFAULT_MODE: SubmitActionMode = 'create'

export const useSubmitAction = <
  M extends SubmitActionMode = typeof DEFAULT_MODE,
>(
  callback: (params: {
    form: HTMLFormElement
    formValues: FormValues<M>
  }) => Promise<void>,
  mode: M = DEFAULT_MODE as M,
) => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(e.currentTarget)

    const emptyValue: EmptyValueForMode<M> = (
      mode === 'create' ? undefined : null
    ) as EmptyValueForMode<M>

    const validateField = (key: string) => {
      if (!form.elements.namedItem(key)) {
        throw new Error(`The form field "${key}" was not found.`)
      }
    }

    const getFieldValue = (key: string) => {
      validateField(key)
      return formData.get(key)
    }

    const formValues: FormValues<M> = {
      get: {
        string: key => {
          const value = getFieldValue(key)

          if (value === null || value === '') return emptyValue

          return String(value)
        },

        number: key => {
          const value = getFieldValue(key)

          if (value === null || value === '') return emptyValue

          const parsedValue = Number(value)
          return Number.isNaN(parsedValue) ? emptyValue : parsedValue
        },

        boolean: key => {
          const value = getFieldValue(key)

          if (value === null || value === '') return emptyValue

          return value === 'on'
        },
      },
      getAll: {
        number: key => {
          validateField(key)
          const values = formData.getAll(key)

          if (values.length === 0) return emptyValue

          const parsedValues = values.map(value => {
            if (value === '') return null

            const parsedValue = Number(value)
            return Number.isNaN(parsedValue) ? null : parsedValue
          })

          return parsedValues.every(value => value === null)
            ? emptyValue
            : parsedValues.filter((value): value is number => value !== null)
        },
      },
    }

    try {
      await setLoading()

      await callback({ form, formValues })
      form.reset()

      await setSuccess()
    } catch (error) {
      console.log(error)
      await setError()
    }
  }

  return { handleSubmit, actionState }
}
