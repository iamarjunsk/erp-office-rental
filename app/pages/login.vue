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
                    <div class="space-y-2">
                        <Label for="email" :class="{ 'text-destructive': emailError }">Email</Label>
                        <div class="relative">
                            <Icon name="lucide:mail"
                                class="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="you@example.com"
                                class="pl-9 bg-background"
                                :class="{ 'border-destructive focus-visible:ring-destructive': emailError }"
                                @blur="validateEmail"
                                @input="emailError && validateEmail()"
                                required
                            />
                        </div>
                        <p v-if="emailError" class="text-sm text-destructive font-medium slide-in-from-top-1 animate-in duration-200">
                            {{ emailError }}
                        </p>
                    </div>

                    <!-- Password -->
                    <div class="space-y-2">
                        <Label for="password">Password</Label>
                        <div class="relative">
                            <Icon name="lucide:lock"
                                class="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="password"
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="••••••••"
                                class="pl-9 pr-10 bg-background"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                @click="showPassword = !showPassword"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                            >
                                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error"
                        class="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium flex items-center gap-2">
                        <Icon name="lucide:alert-circle" class="w-4 h-4" />
                        {{ error }}
                    </div>

                    <!-- Submit Button -->
                    <Button type="submit" :disabled="isLoading || !!emailError" class="w-full" size="lg">
                        <Icon v-if="isLoading" name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
                        <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
                    </Button>
                </form>

                <!-- Divider -->
                <div class="flex items-center my-6">
                    <div class="flex-1 border-t border-border"></div>
                    <span class="px-4 text-sm text-muted-foreground">or</span>
                    <div class="flex-1 border-t border-border"></div>
                </div>

                <!-- Demo Accounts -->
                <div class="space-y-2">
                    <p class="text-sm text-muted-foreground text-center mb-3">Quick login for demo:</p>
                    <Button variant="outline" class="w-full justify-start pl-4" @click="loginAs('admin@officeerp.com', 'admin123')">
                        <Icon name="lucide:shield" class="w-4 h-4 mr-2" />
                        Login as Admin
                    </Button>
                    <Button variant="outline" class="w-full justify-start pl-4" @click="loginAs('manager@officeerp.com', 'manager123')">
                        <Icon name="lucide:user" class="w-4 h-4 mr-2" />
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
            <p class="text-center mt-6 text-sm text-slate-500">
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
const emailError = ref('')

// Check auth status on mount
onMounted(async () => {
    // Wait for auth initialization
    if (!isInitialized.value) {
        await initAuth()
    }
    
    // If already authenticated, redirect to admin
    // But only if user didn't come from a protected page (avoiding redirect loops)
    if (isAuthenticated.value) {
        const redirectTo = useRoute().query.redirect as string
        navigateTo(redirectTo || '/admin')
    }
    
    isAuthChecking.value = false
})

const validateEmail = () => {
    if (!form.value.email) {
        // We generally don't show "required" error until submit or blur with empty,
        // but existing behavior relied on browser required.
        // Let's strictly validate format if present.
        emailError.value = ''
        return
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(form.value.email)) {
        emailError.value = 'Please enter a valid email address'
    } else {
        emailError.value = ''
    }
}

const handleLogin = async () => {
    validateEmail()
    if (emailError.value) return

    const result = await login(form.value)
    if (result.success) {
        navigateTo('/admin')
    }
}

const loginAs = async (email: string, password: string) => {
    form.value = { email, password }
    validateEmail()
    await handleLogin()
}
</script>
