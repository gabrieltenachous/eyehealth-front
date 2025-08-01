import api from '@/services/api'
import { Exam } from '@/modules/exams/interfaces/Exam'
import type { ApiResponse } from '@/services/api'

export async function fetchExams(): Promise<Exam[]> {
  const response = await api.get<ApiResponse<Exam[]>>('/exams')
  return response.data.data
}

export async function createExam(dto: Partial<Exam>): Promise<Exam> {
  const { data } = await api.post<ApiResponse<Exam>>('/exams', dto)
  return data.data
}

export async function bulkCreateExams(dtos: Partial<Exam>[]): Promise<Exam[]> {
  try {
    const { data } = await api.post<ApiResponse<Exam[]>>('/exams/bulk', {
      exams: dtos,
    })
    return data.data
  } catch (error: any) {
    console.warn('[bulkCreateExams] Falha — usando fallback createExam()', error)
    const created = await Promise.all(dtos.map(dto => createExam(dto)))
    return created
  }
}