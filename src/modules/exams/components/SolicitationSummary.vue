<template>
  <div class="space-y-6">
    <div v-for="(groupExams, group) in groupedExams" :key="group">
      <h2 class="text-lg font-semibold text-blue-700 mb-2">
        {{ formatGroup(group) }}
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BaseCard v-for="exam in groupExams" :key="exam.id">
          <p class="font-semibold">{{ exam.name }}</p>
          <p class="text-sm text-gray-600">{{ exam.comment }}</p>
          <p class="text-xs mt-1 text-gray-500">
            Lateralidade: {{ exam.laterality || 'Não definida' }}<br />
            Grupo: {{ exam.group }}
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Exam } from '@/modules/exams'
import BaseCard from '@/components/BaseCard.vue'

export default defineComponent({
  name: 'SolicitationSummary',
  components: { BaseCard },

  props: {
    exams: {
      type: Array as () => Exam[],
      required: true,
    },
  },

  setup(props) {
    const groupedExams = computed(() => {
      return props.exams.reduce<Record<string, Exam[]>>((acc, exam) => {
        if (!acc[exam.group]) acc[exam.group] = []
        acc[exam.group].push(exam)
        return acc
      }, {})
    })

    const formatGroup = (group: string) => {
      switch (group) {
        case 'Grupo1': return 'Grupo 1'
        case 'Grupo2': return 'Grupo 2'
        case 'Grupo3': return 'Grupo 3'
        case 'Individual': return 'Individual'
        default: return group
      }
    }

    return {
      groupedExams,
      formatGroup,
    }
  },
})
</script>
