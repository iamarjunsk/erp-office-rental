<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div class="w-full max-w-md mx-4">
            <!-- Logo/Brand -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <Icon name="lucide:building-2" class="w-8 h-8 text-primary" />
                </div>
                <h1 class="text-3xl font-bold text-white">Create Account</h1>
                <p class="text-slate-400 mt-2">Join OfficeERP today</p>
            </div>

            <!-- Register Card -->
            <div class="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <form @submit.prevent="handleRegister" class="space-y-4">
                    <!-- Name Fields -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="first_name" class="block text-sm font-medium mb-2">First Name</label>
                            <input id="first_name" v-model="form.first_name" type="text" placeholder="John"
                                class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                        </div>
                        <div>
                            <label for="last_name" class="block text-sm font-medium mb-2">Last Name</label>
                            <input id="last_name" v-model="form.last_name" type="text" placeholder="Doe"
                                class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                        </div>
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium mb-2">Email</label>
                        <input id="email" v-model="form.email" type="email" placeholder="you@example.com"
                            class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium mb-2">Password</label>
                        <div class="relative">
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                                class="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                            <button type="button" @click="showPassword = !showPassword" aria-label="Toggle password visibility"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label for="password_confirm" class="block text-sm font-medium mb-2">Confirm Password</label>
                        <div class="relative">
                            <input id="password_confirm" v-model="form.password_confirm" :type="showPasswordConfirm ? 'text' : 'password'" placeholder="••••••••"
                                class="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                            <button type="button" @click="showPasswordConfirm = !showPasswordConfirm" aria-label="Toggle confirm password visibility"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <Icon :name="showPasswordConfirm ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error"
                        class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                        {{ error }}
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                        <span>{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
                    </button>
                </form>

                <!-- Login Link -->
                <p class="text-center mt-6 text-sm text-muted-foreground">
                    Already have an account?
                    <NuxtLink to="/login" class="text-primary hover:underline">Sign in</NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'blank',
})

const { register, isLoading, error } = useAuth()

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const form = ref({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
})

const handleRegister = async () => {
    const result = await register(form.value)
    if (result.success) {
        navigateTo('/admin')
    }
}
</script>
