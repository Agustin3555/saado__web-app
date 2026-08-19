import { useCallback, type MouseEvent, type MouseEventHandler } from 'react'
import { useActionState } from './useActionState.hook'

export const useHandleAction = <E = Element>(
  callback: (event: MouseEvent<E>) => Promise<void>,
) => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleAction = useCallback<MouseEventHandler<E>>(
    async e => {
      try {
        await setLoading()
        await callback(e)
        await setSuccess()
      } catch (error) {
        console.log(error)
        await setError()
      }
    },
    [callback, setError, setLoading, setSuccess],
  )

  return { actionState, onAction: handleAction }
}
