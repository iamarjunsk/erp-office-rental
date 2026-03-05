<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToastProvider />
    <UiSonner />
  </div>
</template>

<script setup lang="ts">
const { setupTokenRefresh } = useAuth()

onMounted(() => {
  setupTokenRefresh()
})
</script>
