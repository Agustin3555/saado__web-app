import axios from 'axios'
import { catchError } from '../interceptors'
import { useGlobalConfigStore } from '@/shared/store/useGlobalConfig.store'

const { apiUrl } = useGlobalConfigStore.getState()
const baseURL = `${apiUrl}/v1`
const publicInstance = axios.create({ baseURL })

publicInstance.interceptors.response.use(undefined, catchError)

export { publicInstance }
