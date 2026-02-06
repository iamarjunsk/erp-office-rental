export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuth();

    // Skip on server side to avoid hydration mismatch with localStorage
    if (process.server) return;

    if (!isAuthenticated.value) {
        return navigateTo("/login");
    }
});
