<template>
  <div class="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-[390px] max-w-[100vw]">
    <UiToast
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @close="dismiss(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
const { toasts, dismiss } = useToast()
</script>
