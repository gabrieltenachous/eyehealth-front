import { defineStore } from 'pinia'
import { Exam } from '@/modules/exams/interfaces/Exam'

export const useExamStore = defineStore('exam', {
  state: () => ({
    exams: [] as Exam[],
  }),

  actions: {
    setExams(data: Exam[]) {
      this.exams = data
    },
    addExam(exam: Exam) {
      this.exams.push(exam)
    }
  },
})
