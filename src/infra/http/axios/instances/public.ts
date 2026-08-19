import axios from 'axios'
import { catchError } from '../interceptors'

// TODO: obtener desde un store que sincroniza con localStorage
const baseURL = 'http://localhost:3000/v1'
const publicInstance = axios.create({ baseURL })

publicInstance.interceptors.response.use(undefined, catchError)

export { publicInstance }
