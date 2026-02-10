export default defineNuxtRouteMiddleware(async (to, from) => {
    // Skip auth check for login and register pages
    if (to.path === '/login' || to.path === '/register') {
        return;
    }

    const { isInitialized, initAuth, isAuthenticated, getAccessToken, getRefreshToken } = useAuth();
    
    // On server side, we can't check localStorage, so allow the page to render
    // The client-side will handle auth properly
    if (process.server) {
        return;
    }
    
    // On client side, ensure auth is initialized
    if (!isInitialized.value) {
        // Check localStorage directly for tokens (before initAuth restores them)
        const storedAccess = localStorage.getItem("access_token");
        const storedRefresh = localStorage.getItem("refresh_token");
        const hadTokens = !!(storedAccess || storedRefresh);
        
        await initAuth();
        
        // After initAuth, check authentication state
        if (isAuthenticated.value) {
            // Successfully authenticated
            return;
        }
        
        // Not authenticated - check if we should redirect
        // Only redirect if we didn't have tokens at all
        // If we had tokens but auth failed, it means refresh token was 401
        // but we should still try to stay on page (API calls will handle it)
        if (!hadTokens) {
            return navigateTo({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
        
        // Had tokens but auth failed - user might see errors but won't be forced to login
        // This allows for temporary network issues without losing the session
        return;
    }
    
    // Only redirect if we're sure user is not authenticated
    if (!isAuthenticated.value) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
});
