import axios from 'axios'
import { addToken, catchError } from '../interceptors'

const baseURL = 'http://localhost:3000/v1'
const privateInstance = axios.create({ baseURL })

privateInstance.interceptors.request.use(addToken)
privateInstance.interceptors.response.use(undefined, catchError)

export { privateInstance }
