<template>
  <ToastRoot
    class="bg-white border rounded-md p-3 shadow-lg flex items-start gap-3 w-[360px] focus:outline-none"
    :class="toastClasses"
    :open="toast.open"
    :duration="toast.duration"
    @update:open="handleOpenChange"
  >
    <div class="flex items-start gap-3 flex-1 min-w-0">
      <Icon v-if="icon" :name="icon" class="h-5 w-5 flex-shrink-0 mt-0.5" :class="iconClass" />
      <div class="grid gap-1 min-w-0 flex-1">
        <ToastTitle v-if="toast.title" class="text-sm font-semibold break-words">
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription v-if="toast.description" class="text-sm opacity-90 break-words">
          {{ toast.description }}
        </ToastDescription>
      </div>
    </div>
    <ToastClose v-if="!toast.action" class="ml-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100" :class="iconClass">
      <Icon name="lucide:x" class="h-4 w-4" />
    </ToastClose>
    <ToastAction
      v-if="toast.action"
      class="ml-2 inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none"
      :alt-text="toast.action.label"
      @click="toast.action.onClick"
    >
      {{ toast.action.label }}
    </ToastAction>
  </ToastRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToastRoot, ToastTitle, ToastDescription, ToastClose, ToastAction } from 'radix-vue'
import type { Toast } from '~/composables/use-toast'

const props = defineProps<{
  toast: Toast
}>()

const emit = defineEmits<{
  (e: 'close', id: string): void
}>()

const toastClasses = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return 'border-green-200 bg-green-50 text-green-900'
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 text-yellow-900'
    case 'danger':
    case 'destructive':
      return 'border-red-200 bg-red-50 text-red-900'
    default:
      return 'border-slate-200 bg-white text-slate-900'
  }
})

const icon = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return 'lucide:check-circle'
    case 'warning':
      return 'lucide:alert-triangle'
    case 'danger':
    case 'destructive':
      return 'lucide:alert-circle'
    default:
      return 'lucide:bell'
  }
})

const iconClass = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'danger':
    case 'destructive':
      return 'text-red-500'
    default:
      return 'text-slate-500'
  }
})

const handleOpenChange = (open: boolean) => {
  if (!open) {
    emit('close', props.toast.id)
  }
}
</script>
