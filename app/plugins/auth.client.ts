export default defineNuxtPlugin(async (nuxtApp) => {
    // Only run on client
    if (process.server) {
        return
    }
    
    const { initAuth, isInitialized } = useAuth()
    
    // Initialize auth before app renders
    if (!isInitialized.value) {
        await initAuth()
    }
})
