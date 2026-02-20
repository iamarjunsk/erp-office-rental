<script setup lang="ts">
import { Loader2, Mail, Lock, Eye, EyeOff, Building2, Shield, User } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

definePageMeta({
  layout: 'blank',
})

const { login, isLoading, error, isAuthenticated, isInitialized, initAuth } = useAuth()
const isAuthChecking = ref(true)

const form = ref({
  email: '',
  password: '',
})
const showPassword = ref(false)

// Check auth status on mount
onMounted(async () => {
  if (!isInitialized.value) {
    await initAuth()
  }

  if (isAuthenticated.value) {
    const redirectTo = useRoute().query.redirect as string
    navigateTo(redirectTo || '/admin')
  }

  isAuthChecking.value = false
})

const handleLogin = async () => {
  const result = await login(form.value)
  if (result.success) {
    navigateTo('/admin')
  }
}

const loginAs = async (email: string, password: string) => {
  form.value = { email, password }
  await handleLogin()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <Building2 class="w-8 h-8 text-primary" />
        </div>
        <h1 class="text-3xl font-bold text-white">OfficeERP</h1>
        <p class="text-slate-400 mt-2">Sign in to your account</p>
      </div>

      <!-- Loading State -->
      <Card v-if="isAuthChecking" class="w-full">
        <CardContent class="flex flex-col items-center justify-center py-12">
          <Loader2 class="w-8 h-8 animate-spin text-primary mb-4" />
          <p class="text-muted-foreground">Checking authentication...</p>
        </CardContent>
      </Card>

      <!-- Login Card -->
      <Card v-else class="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email -->
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <div class="relative">
                <Mail class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  class="pl-10"
                  required
                  :aria-invalid="!!error"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Lock class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="pl-10 pr-10"
                  required
                  :aria-invalid="!!error"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  class="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeOff v-if="showPassword" class="h-4 w-4 text-muted-foreground" />
                  <Eye v-else class="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="text-sm font-medium text-destructive" role="alert">
              {{ error }}
            </div>

            <!-- Submit Button -->
            <Button type="submit" class="w-full" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </Button>
          </form>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div class="space-y-2">
            <Button
              variant="outline"
              class="w-full"
              @click="loginAs('admin@officeerp.com', 'admin123')"
              :disabled="isLoading"
            >
              <Shield class="mr-2 h-4 w-4" />
              Login as Admin
            </Button>
            <Button
              variant="outline"
              class="w-full"
              @click="loginAs('manager@officeerp.com', 'manager123')"
              :disabled="isLoading"
            >
              <User class="mr-2 h-4 w-4" />
              Login as Manager
            </Button>
          </div>
        </CardContent>
        <CardFooter class="flex justify-center">
           <p class="text-sm text-muted-foreground">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary hover:underline font-medium">Sign up</NuxtLink>
          </p>
        </CardFooter>
      </Card>

      <!-- Footer -->
      <p class="text-center mt-6 text-sm text-slate-500">
        © 2024 OfficeERP. All rights reserved.
      </p>
    </div>
  </div>
</template>
