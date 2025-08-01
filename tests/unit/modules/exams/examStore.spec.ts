import { setActivePinia, createPinia } from 'pinia'
import { useExamStore } from '@/modules/exams/store/examStore'
import type { Exam } from '@/modules/exams/interfaces/Exam'

describe('ExamStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should set and get exams correctly', () => {
    const store = useExamStore()

    const fakeExams: Exam[] = [
      { id: '1', name: 'Exame 1', comment: '', laterality: 'OD', group: 'Grupo1' },
      { id: '2', name: 'Exame 2', comment: '', laterality: 'OE', group: 'Grupo2' },
    ]

    store.setExams(fakeExams)
    expect(store.exams).toHaveLength(2)
    expect(store.exams[0].name).toBe('Exame 1')
  })
})
