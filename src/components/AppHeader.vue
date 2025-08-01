<template>
  <header class="bg-white shadow-md p-4">
    <nav class="flex gap-4 justify-center text-sm font-semibold">
      <router-link to="/" class="hover:underline">Home</router-link>
      <router-link to="/exams/selection" class="hover:underline">Exames</router-link>
      <router-link to="/exams/solicitation" class="hover:underline">Solicitação</router-link>
      <router-link to="/exams/summary" class="hover:underline">Resumo</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'AppHeader',
};
</script>
