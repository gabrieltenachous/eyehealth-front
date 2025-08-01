import api from '@/services/api'
import { Exam } from '../interfaces/Exam'
import { downloadBlob } from './downloadUtil'

export async function generateExamPdf(exams: string[]): Promise<Blob> {
  const response = await api.post('/exams/pdf', { exams }, {
    responseType: 'blob',
  })

  return response.data
}

export async function generatePdf(exams: Exam[]): Promise<void> {
  try {
    const response = await api.post('/packages/pdf', { exams }, { responseType: 'blob' })
    const blob = new Blob([response.data], { type: 'application/pdf' })
    downloadBlob(blob, 'exames.pdf')
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    throw error
  }
}
