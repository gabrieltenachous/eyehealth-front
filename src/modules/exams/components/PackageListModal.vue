<template>
  <BaseModal :visible="visible" @close="$emit('close')">
    <h2 class="text-lg font-semibold mb-4">Pacotes disponíveis</h2>

    <div class="space-y-4 max-h-[60vh] overflow-y-auto">
      <label
        v-for="pkg in packages"
        :key="pkg.id"
        class="border rounded p-4 block cursor-pointer hover:shadow transition"
      >
        <input
          type="checkbox"
          :value="pkg.id"
          v-model="selectedIds"
          class="mr-2 align-top mt-1"
        />
        <div>
          <p class="font-medium">{{ pkg.name }}</p>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
            <li v-for="exam in pkg.exams" :key="exam.id">
              {{ exam.name }} ({{ exam.laterality || 'sem lateralidade' }}, grupo {{ exam.group }})
            </li>
          </ul>
        </div>
      </label>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <BaseButton variant="danger" @click="$emit('close')">Cancelar</BaseButton>
      <BaseButton :disabled="selectedIds.length === 0" @click="confirmSelection">
        Adicionar selecionados
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Package } from '@/modules/exams'
import { emit } from 'process'
const selectedIds = ref<string[]>([])

function emitSelected() {
  const selected = props.packages.filter(p => selectedIds.value.includes(p.id))
  const exams = selected.flatMap(p => p.exams)
  emit('select', exams)
}

export default defineComponent({
  name: 'PackageListModal',
  components: { BaseModal, BaseButton },

  props: {
    visible: { type: Boolean, required: true },
    packages: { type: Array as () => Package[], required: true },
  },

  emits: ['close', 'select'],
  
  setup(_, { emit }) {
    const selectedIds = ref<string[]>([])

    const confirmSelection = () => {
      emit('select', selectedIds.value)
      selectedIds.value = []
    }

    return { selectedIds, confirmSelection }
  },
})
</script>
