<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div class="w-full max-w-md mx-4">
            <!-- Logo/Brand -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <Icon name="lucide:building-2" class="w-8 h-8 text-primary" />
                </div>
                <h1 class="text-3xl font-bold text-white">OfficeERP</h1>
                <p class="text-slate-400 mt-2">Sign in to your account</p>
            </div>

            <!-- Loading State -->
            <div v-if="isAuthChecking" class="bg-card border border-border rounded-2xl p-8 shadow-2xl text-center">
                <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                <p class="text-muted-foreground">Checking authentication...</p>
            </div>

            <!-- Login Card -->
            <div v-else class="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <!-- Email -->
                    <div class="grid gap-2">
                        <Label for="email" :class="{ 'text-destructive': error }">Email</Label>
                        <div class="relative">
                            <Icon name="lucide:mail"
                                class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="you@example.com"
                                class="pl-10"
                                :class="{ 'border-destructive': error }"
                                :aria-invalid="!!error"
                                aria-describedby="auth-error"
                                required
                            />
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="grid gap-2">
                        <Label for="password" :class="{ 'text-destructive': error }">Password</Label>
                        <div class="relative">
                            <Icon name="lucide:lock"
                                class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password"
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="••••••••"
                                class="pl-10 pr-10"
                                :class="{ 'border-destructive': error }"
                                :aria-invalid="!!error"
                                aria-describedby="auth-error"
                                required
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
                                aria-label="Toggle password visibility"
                            >
                                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" id="auth-error"
                        class="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" role="alert">
                        {{ error }}
                    </div>

                    <!-- Submit Button -->
                    <Button type="submit" :disabled="isLoading" class="w-full">
                        <Icon v-if="isLoading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </Button>
                </form>

                <!-- Divider -->
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t border-border" />
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <!-- Demo Accounts -->
                <div class="grid gap-2">
                    <p class="text-sm text-muted-foreground text-center mb-1">Quick login for demo:</p>
                    <Button variant="outline" @click="loginAs('admin@officeerp.com', 'admin123')" class="w-full">
                        <Icon name="lucide:shield" class="mr-2 h-4 w-4" />
                        Login as Admin
                    </Button>
                    <Button variant="outline" @click="loginAs('manager@officeerp.com', 'manager123')" class="w-full">
                        <Icon name="lucide:user" class="mr-2 h-4 w-4" />
                        Login as Manager
                    </Button>
                </div>

                <!-- Register Link -->
                <p class="text-center mt-6 text-sm text-muted-foreground">
                    Don't have an account?
                    <NuxtLink to="/register" class="text-primary hover:underline font-medium">Sign up</NuxtLink>
                </p>
            </div>

            <!-- Footer -->
            <p class="text-center mt-6 text-sm text-muted-foreground">
                © 2024 OfficeERP. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

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
    // Wait for auth initialization
    if (!isInitialized.value) {
        await initAuth()
    }
    
    // If already authenticated, redirect to admin
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
