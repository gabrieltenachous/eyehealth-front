<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-6">Resumo da Solicitação</h1>
    <div v-if="groupedExams.length === 0" class="text-gray-500">
      Nenhum exame selecionado.
    </div>

    <div
      v-for="(group, index) in groupedExams"
      :key="index"
      class="bg-white border rounded mb-6 shadow-sm p-4"
    >
      <h2 class="text-lg font-semibold mb-3">Página {{ index + 1 }}</h2>
      <ul class="space-y-2">
        <li
          v-for="exam in group"
          :key="exam.id"
          class="p-3 border rounded bg-gray-50"
        >
          <p class="font-medium">{{ exam.name }}</p>
          <p class="text-sm text-gray-600">{{ exam.comment }}</p>
          <p class="text-xs text-blue-600">
            Lateralidade: {{ exam.laterality || 'Não definida' }} | Grupo:
            {{ exam.group }}
          </p>
        </li>
      </ul>
    </div>

    <router-link to="/exams/selection">
      <BaseButton variant="secondary">Voltar à seleção</BaseButton>
    </router-link>
    <BaseButton class="mt-4 ml-4" variant="primary" @click="downloadPdf">
      Baixar PDF
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { Exam, useExamStore } from '@/modules/exams'
import BaseButton from '@/components/BaseButton.vue'
import { generatePdf } from '@/modules/exams/services/pdfService'
import { useUiStore } from '@/stores/ui'
import { useToast } from '@/composables/useToast'
export default {
  name: 'ExamSummaryPage',
  components: { BaseButton },
  data() {
    const examStore = useExamStore()
    return {
      exams: examStore.exams
    }
  },

  methods: {
    goBack() {
      this.$router.push('/exams/solicitation')
    },
    async downloadPdf() {
      const uiStore = useUiStore()
      const toast = useToast()

      if (!this.exams.length) return

      uiStore.setLoading(true)
      try {
        await generatePdf(this.exams)
      } catch (err) {
        console.error('Erro ao baixar PDF', err)
        toast.error('Erro ao gerar PDF. Tente novamente.')
      } finally {
        uiStore.setLoading(false)
      }
    },
  },
  computed: {
    groupedExams(): Exam[][] {
      const groups: Exam[][] = []
      const maxPerGroup = 4

      for (let i = 0; i < this.exams.length; i += maxPerGroup) {
        groups.push(this.exams.slice(i, i + maxPerGroup))
      }

      return groups
    },
  },
}
</script>
