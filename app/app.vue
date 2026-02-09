<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToastProvider />
  </div>
</template>

<script setup lang="ts">
const { initAuth, setupTokenRefresh } = useAuth()

onMounted(async () => {
  await initAuth()
  setupTokenRefresh()
})

if (process.client) {
  await initAuth()
}
</script>
