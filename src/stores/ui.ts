import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: false as boolean,
    errorMessage: null as string | null,
  }),

  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    },

    setError(message: string | null) {
      this.errorMessage = message
    },

    clearError() {
      this.errorMessage = null
    },
  },
})
