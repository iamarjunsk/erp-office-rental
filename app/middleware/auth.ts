export default defineNuxtRouteMiddleware(async (to, from) => {
    // Skip auth check for login and register pages
    if (to.path === '/login' || to.path === '/register') {
        return;
    }

    const { isInitialized, initAuth, isAuthenticated } = useAuth();
    
    // Wait for auth initialization on client side
    if (process.client && !isInitialized.value) {
        await initAuth();
    }
    
    // Check if authenticated
    if (!isAuthenticated.value) {
        return navigateTo("/login");
    }
});
