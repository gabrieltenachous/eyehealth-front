import { Exam } from './Exam'

export interface Package {
  id: string
  name: string
  exams: Exam[]
}
