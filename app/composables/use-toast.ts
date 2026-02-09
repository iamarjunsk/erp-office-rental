import { type ToastRootProps, ToastProvider, ToastViewport } from 'radix-vue'
import { ref, computed } from 'vue'

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'destructive'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  open?: boolean
}

const toasts = ref<Toast[]>([])
const toastCount = ref(0)

export function useToast() {
  const toast = (options: Omit<Toast, 'id' | 'open'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      open: true,
      variant: 'default',
      duration: 5000,
      ...options,
    }

    toasts.value = [...toasts.value, newToast]
    toastCount.value++

    return id
  }

  const dismiss = (id: string) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast) {
      toast.open = false
    }
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const toRefs = computed(() => toasts.value)

  const success = (title: string, description?: string) => {
    return toast({ title, description, variant: 'success' })
  }

  const error = (title: string, description?: string) => {
    return toast({ title, description, variant: 'danger' })
  }

  const warning = (title: string, description?: string) => {
    return toast({ title, description, variant: 'warning' })
  }

  const info = (title: string, description?: string) => {
    return toast({ title, description, variant: 'default' })
  }

  return {
    toasts: toRefs,
    toast,
    dismiss,
    remove,
    success,
    error,
    warning,
    info,
  }
}
