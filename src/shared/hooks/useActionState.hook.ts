import { useCallback, useState } from 'react'
import { sleep } from '../helpers'

const DELAY = 2000

export type ActionState = 'loading' | 'error' | 'success' | 'ready'

export const useActionState = () => {
  const [actionState, setActionState] = useState<ActionState>('ready')

  const setLoading = useCallback(async () => {
    setActionState('loading')
  }, [])

  const setError = useCallback(async () => {
    setActionState('error')
    await sleep(DELAY)
    setActionState('ready')
  }, [])

  const setSuccess = useCallback(async () => {
    setActionState('success')
    await sleep(DELAY)
    setActionState('ready')
  }, [])

  return { actionState, setLoading, setError, setSuccess }
}
