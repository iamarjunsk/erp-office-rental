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
                    <div>
                        <label for="email" class="block text-sm font-medium mb-2">Email</label>
                        <div class="relative">
                            <Icon name="lucide:mail"
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input id="email" v-model="form.email" type="email" placeholder="you@example.com"
                                class="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                required />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium mb-2">Password</label>
                        <div class="relative">
                            <Icon name="lucide:lock"
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="••••••••"
                                class="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                required />
                            <button type="button" @click="showPassword = !showPassword"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" role="alert"
                        class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                        {{ error }}
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                        <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
                    </button>
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
                    <button @click="loginAs('admin@officeerp.com', 'admin123')"
                        class="w-full py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">
                        <Icon name="lucide:shield" class="w-4 h-4" />
                        Login as Admin
                    </button>
                    <button @click="loginAs('manager@officeerp.com', 'manager123')"
                        class="w-full py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">
                        <Icon name="lucide:user" class="w-4 h-4" />
                        Login as Manager
                    </button>
                </div>

                <!-- Register Link -->
                <p class="text-center mt-6 text-sm text-muted-foreground">
                    Don't have an account?
                    <NuxtLink to="/register" class="text-primary hover:underline">Sign up</NuxtLink>
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
    // But only if user didn't come from a protected page (avoiding redirect loops)
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
