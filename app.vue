<script setup lang="ts">
const route = useRoute()
const layout = () => route?.path?.startsWith('/app') ? 'app' : 'default'
const { getSession } = useAuth();

onMounted(async () => {
  await getSession({ force: true });
});
</script>

<template>
  <NuxtLayout :name="layout()">
    <NuxtPage />
  </NuxtLayout>
</template>
