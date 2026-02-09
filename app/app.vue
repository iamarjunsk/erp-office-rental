<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { initAuth, setupTokenRefresh } = useAuth()

onMounted(async () => {
  // Initialize auth from localStorage
  await initAuth()
  
  // Setup automatic token refresh
  setupTokenRefresh()
})

// Also initialize on app setup for SSR compatibility
if (process.client) {
  await initAuth()
}
</script>
