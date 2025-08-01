import { defineStore } from 'pinia'
import { Package } from '@/modules/exams'

interface State {
  packages: Package[]
}

export const usePackageStore = defineStore('package', {
  state: (): State => ({
    packages: [],
  }),

  actions: {
    setPackages(data: Package[]) {
      this.packages = data
    },

    addPackage(item: Package) {
      this.packages.push(item)
    },
  },
})
