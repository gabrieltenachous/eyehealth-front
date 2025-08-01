<template>
  <div>
    <AppHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>
