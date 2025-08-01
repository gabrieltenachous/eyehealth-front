export interface Exam {
  id: string
  name: string
  comment: string
  laterality: 'OD' | 'OE' | 'AO' | null
  group: 'Individual' | 'Grupo1' | 'Grupo2' | 'Grupo3'
}
