<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Solicitação de Exames</h1>

      <div class="flex gap-2">
        <BaseButton @click="showListModal = true" variant="secondary">
          Pacotes
        </BaseButton>
        <BaseButton @click="showCreateModal = true"> Criar Pacote </BaseButton>
      </div>
    </div>

    <ExamSelection :exams="exams" @selected="handleSelect" />

    <div v-if="selected.length > 0" class="pt-4 border-t">
      <SolicitationSummary :exams="selected" />
      <BaseButton
        class="mt-6"
        variant="primary"
        :disabled="selected.length === 0"
        @click="goToSummary"
      >
        Visualizar resumo
      </BaseButton>
    </div> 

    <PackageListModal
      :visible="showListModal"
      :packages="packages"
      @close="showListModal = false"
      @select="handlePackageSelect"
    />

    <PackageCreateModal
      :visible="showCreateModal"
      :exams="exams"
      @close="showCreateModal = false"
      @create="handlePackageCreate"
    />
  </div>
</template>
<script lang="ts">
import { Exam, Package } from '@/modules/exams'
import { fetchExams, fetchPackages } from '@/modules/exams'
import { useExamStore, usePackageStore } from '@/modules/exams'
import ExamSelection from '@/modules/exams/components/ExamSelection.vue'
import PackageListModal from '@/modules/exams/components/PackageListModal.vue'
import PackageCreateModal from '@/modules/exams/components/PackageCreateModal.vue'
import SolicitationSummary from '@/modules/exams/components/SolicitationSummary.vue'
import BaseButton from '@/components/BaseButton.vue'

const LOCAL_STORAGE_KEY = 'selected_exams'

export default {
  name: 'SolicitationPage',
  components: {
    ExamSelection,
    PackageListModal,
    PackageCreateModal,
    SolicitationSummary,
    BaseButton,
  },
  data() {
    return {
      selected: [] as Exam[],
      showListModal: false,
      showCreateModal: false,
      exams: [] as Exam[],
      packages: [] as Package[],
    }
  },
  async mounted() {
    const examStore = useExamStore()
    const packageStore = usePackageStore()

    if (!examStore.exams.length) {
      const data = await fetchExams()
      examStore.setExams(data)
    }

    const data = await fetchPackages()
    packageStore.setPackages(data)

    this.exams = examStore.exams
    this.packages = packageStore.packages

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        this.selected = JSON.parse(saved)
      } catch (e) {
        console.error('Erro ao recuperar exames do localStorage', e)
        this.selected = []
      }
    }
  },
  methods: {
    handlePackageCreate(pkg: Package) {
      const packageStore = usePackageStore()
      const examStore = useExamStore()

      packageStore.addPackage(pkg)
      examStore.setExams(pkg.exams)

      this.packages = packageStore.packages 
      this.selected = pkg.exams
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pkg.exams))
      this.showCreateModal = false
    },
    resetSelection() {
      const examStore = useExamStore()
      examStore.setExams([])
      this.selected = []
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    },
    handleSelect(exams: Exam[]) {
      this.selected = exams
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exams))
    },
    handlePackageSelect(packageExams: Exam[]) {
      this.selected = packageExams
      this.showListModal = false
    },
    async handleCloseCreateModal() {
      this.showCreateModal = false
      const latestPackages = await fetchPackages()
      const packageStore = usePackageStore()
      packageStore.setPackages(latestPackages)
      this.packages = packageStore.packages
    },
    goToSummary() { 

      this.$router.push({
        path: '/exams/summary', 
      })
    },
  },
}
</script>
