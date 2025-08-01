<template>
  <input
    v-bind="$attrs"
    :value="value"
    @input="onInput"
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</template>

<script lang="ts">
export default {
  name: 'BaseInput',
  props: {
    value: [String, Number],
  },
  methods: {
    onInput(event: Event) {
      this.$emit('input', (event.target as HTMLInputElement).value)
    },
  },
}
</script>
