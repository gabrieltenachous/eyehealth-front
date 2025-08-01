<template>
  <BaseModal :visible="visible" @close="$emit('close')">
    <h2 class="text-lg font-semibold mb-4">Novo Exame</h2>
    <div class="space-y-4">
      <BaseInput v-model="name" placeholder="Nome do exame" />
      <BaseInput v-model="comment" placeholder="Comentário" />
      
      <select v-model="laterality" class="w-full border rounded p-2">
        <option value="">Selecione a lateralidade</option>
        <option value="OD">OD</option>
        <option value="OE">OE</option>
        <option value="AO">AO</option>
      </select>

      <select v-model="group" class="w-full border rounded p-2">
        <option value="">Selecione o grupo</option>
        <option>Individual</option>
        <option>Grupo1</option>
        <option>Grupo2</option>
        <option>Grupo3</option>
      </select>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <BaseButton variant="danger" @click="$emit('close')">Cancelar</BaseButton>
      <BaseButton :disabled="!name || !group" @click="handleSubmit">Salvar</BaseButton>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import BaseModal from '@/components/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { createExam } from '../services/examService'
import { useToast } from '@/composables/useToast'
import { useExamStore } from '../store/examStore'

export default defineComponent({
  name: 'ExamCreateForm',
  components: { BaseModal, BaseButton, BaseInput },
  props: {
    visible: Boolean,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const name = ref('')
    const comment = ref('')
    const laterality = ref('')
    const group = ref('')

    const toast = useToast()
    const examStore = useExamStore()

    async function handleSubmit() {
      try {
        const exam = await createExam({
          name: name.value,
          comment: comment.value,
          laterality: laterality.value || null,
          group: group.value,
        })

        examStore.addExam(exam)
        toast.success('Exame criado!')
        emit('close')
      } catch (err) {
        toast.error('Erro ao salvar exame.')
      }
    }

    return { name, comment, laterality, group, handleSubmit }
  },
})
</script>
