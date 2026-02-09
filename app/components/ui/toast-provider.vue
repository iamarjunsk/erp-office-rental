<template>
  <ToastProvider>
    <ToastViewport class="fixed bottom-0 right-0 flex flex-col gap-2 p-4 w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    <UiToast
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @close="dismiss(toast.id)"
    />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'radix-vue'
const { toasts, dismiss } = useToast()
</script>
