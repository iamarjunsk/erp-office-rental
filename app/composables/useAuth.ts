/**
 * Auth composable for managing authentication state and API calls.
 * Connects to Django backend at localhost:8000
 */

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    department: string;
    role: "super_admin" | "admin" | "manager" | "staff";
    profile_image: string | null;
    is_active: boolean;
}

interface AuthTokens {
    access: string;
    refresh: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    role?: string;
}

const API_BASE = "http://localhost:8000/api/users";

export const useAuth = () => {
    const user = useState<User | null>("auth_user", () => null);
    const isAuthenticated = computed(() => !!user.value);
    const isLoading = useState("auth_loading", () => false);
    const error = useState<string | null>("auth_error", () => null);

    // Get tokens from cookie
    const getAccessToken = () => {
        if (process.client) {
            return localStorage.getItem("access_token");
        }
        return null;
    };

    const getRefreshToken = () => {
        if (process.client) {
            return localStorage.getItem("refresh_token");
        }
        return null;
    };

    // Save tokens
    const saveTokens = (tokens: AuthTokens) => {
        if (process.client) {
            localStorage.setItem("access_token", tokens.access);
            localStorage.setItem("refresh_token", tokens.refresh);
        }
    };

    // Clear tokens
    const clearTokens = () => {
        if (process.client) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    };

    // Auth headers
    const authHeaders = () => {
        const token = getAccessToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Login
    const login = async (credentials: LoginCredentials) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<{ user: User; tokens: AuthTokens }>(
                `${API_BASE}/login/`,
                {
                    method: "POST",
                    body: credentials,
                },
            );

            user.value = response.user;
            saveTokens(response.tokens);

            return { success: true };
        } catch (e: any) {
            error.value = e.data?.error || "Login failed";
            return { success: false, error: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // Register
    const register = async (data: RegisterData) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<{ user: User; tokens: AuthTokens }>(
                `${API_BASE}/register/`,
                {
                    method: "POST",
                    body: data,
                },
            );

            user.value = response.user;
            saveTokens(response.tokens);

            return { success: true };
        } catch (e: any) {
            error.value =
                e.data?.email?.[0] ||
                e.data?.password?.[0] ||
                "Registration failed";
            return { success: false, error: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // Logout
    const logout = () => {
        user.value = null;
        clearTokens();
        navigateTo("/login");
    };

    // Fetch user profile
    const fetchProfile = async () => {
        const token = getAccessToken();
        if (!token) return null;

        try {
            const response = await $fetch<User>(`${API_BASE}/me/`, {
                headers: authHeaders(),
            });
            user.value = response;
            return response;
        } catch (e) {
            // Token might be expired, try refresh
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return fetchProfile();
            }
            logout();
            return null;
        }
    };

    // Refresh access token
    const refreshAccessToken = async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return false;

        try {
            const response = await $fetch<{ access: string }>(
                `${API_BASE}/token/refresh/`,
                {
                    method: "POST",
                    body: { refresh: refreshToken },
                },
            );

            if (process.client) {
                localStorage.setItem("access_token", response.access);
            }
            return true;
        } catch (e) {
            clearTokens();
            return false;
        }
    };

    // Initialize auth on app load
    const initAuth = async () => {
        if (getAccessToken()) {
            await fetchProfile();
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        fetchProfile,
        initAuth,
        getAccessToken,
        authHeaders,
    };
};
