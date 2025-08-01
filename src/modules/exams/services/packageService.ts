import api, { ApiResponse } from '@/services/api'
import { Package } from '../interfaces/Package'

export async function fetchPackages(): Promise<Package[]> {
  const res = await api.get<ApiResponse<Package[]>>('/packages')
  return res.data.data
}

export async function createPackage(payload: {
  name: string
  exams: string[]
  observations?: string
}): Promise<Package> {
  const res = await api.post<ApiResponse<Package>>('/packages', payload)
  return res.data.data
}
