import { privateInstance } from '@/infra/http/axios/instances'
import type { Company, CompanyRef } from './company.types'

export class CompanyServices {
  static getAllRefs = async () => {
    const res = await privateInstance.get<CompanyRef[]>('companies/refs')

    return res.data
  }

  static getAll = async () => {
    const res = await privateInstance.get<Company[]>('companies')

    return res.data
  }

  static create = async (data: { name: string; email?: string }) => {
    const res = await privateInstance.post<Company>('companies', data)

    return res.data
  }

  static editOne = async (
    id: number,
    data: { name?: string; email?: string },
  ) => {
    const res = await privateInstance.patch<Company>(`companies/${id}`, data)

    return res.data
  }
}
