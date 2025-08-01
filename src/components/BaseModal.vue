<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <button class="absolute top-2 right-2 text-gray-600" @click="$emit('close')">✕</button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts"> 
export default {
  name: 'BaseModal',
  props: {
    visible: { type: Boolean, required: true }
  },
}
</script>
