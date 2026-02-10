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
    // Use localStorage-backed state for persistence
    const accessToken = useState<string | null>("access_token", () => null);
    const refreshToken = useState<string | null>("refresh_token", () => null);
    const user = useState<User | null>("auth_user", () => null);
    const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
    const isLoading = useState("auth_loading", () => false);
    const error = useState<string | null>("auth_error", () => null);
    const isInitialized = useState("auth_initialized", () => false);

    // Initialize from localStorage on client side
    const initFromStorage = () => {
        if (process.client) {
            const storedAccess = localStorage.getItem("access_token");
            const storedRefresh = localStorage.getItem("refresh_token");
            if (storedAccess) accessToken.value = storedAccess;
            if (storedRefresh) refreshToken.value = storedRefresh;
        }
    };

    // Get tokens
    const getAccessToken = () => accessToken.value;
    const getRefreshToken = () => refreshToken.value;

    // Save tokens to state and localStorage
    const saveTokens = (tokens: AuthTokens) => {
        accessToken.value = tokens.access;
        refreshToken.value = tokens.refresh;
        if (process.client) {
            localStorage.setItem("access_token", tokens.access);
            localStorage.setItem("refresh_token", tokens.refresh);
        }
    };

    // Clear tokens
    const clearTokens = () => {
        accessToken.value = null;
        refreshToken.value = null;
        user.value = null;
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

    // Refresh access token
    const refreshAccessToken = async (): Promise<boolean> => {
        const currentRefresh = getRefreshToken();
        if (!currentRefresh) {
            clearTokens();
            return false;
        }

        try {
            const response = await $fetch<{ access: string }>(
                `${API_BASE}/token/refresh/`,
                {
                    method: "POST",
                    body: { refresh: currentRefresh },
                },
            );

            if (response.access) {
                accessToken.value = response.access;
                if (process.client) {
                    localStorage.setItem("access_token", response.access);
                }
                return true;
            }
            return false;
        } catch (e: any) {
            console.error("Token refresh failed:", e);
            // Only clear tokens on 401 (invalid/expired refresh token)
            // Network errors should not log out the user
            if (e.statusCode === 401) {
                clearTokens();
            }
            return false;
        }
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
            error.value = e.data?.error || e.data?.detail || "Login failed";
            console.error("Login error:", e);
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
                e.data?.detail ||
                "Registration failed";
            console.error("Register error:", e);
            return { success: false, error: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // Logout
    const logout = () => {
        clearTokens();
        navigateTo("/login");
    };

    // Fetch user profile
    const fetchProfile = async (): Promise<User | null> => {
        const token = getAccessToken();
        if (!token) {
            return null;
        }

        try {
            const response = await $fetch<User>(`${API_BASE}/me/`, {
                headers: authHeaders(),
            });
            user.value = response;
            return response;
        } catch (e: any) {
            // If unauthorized, try to refresh token
            if (e.statusCode === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    // Retry fetching profile with new token
                    try {
                        const response = await $fetch<User>(`${API_BASE}/me/`, {
                            headers: authHeaders(),
                        });
                        user.value = response;
                        return response;
                    } catch (retryError) {
                        console.error("Retry fetch profile failed:", retryError);
                    }
                }
                // Token refresh failed (401), user will be redirected by middleware
                return null;
            }
            // For non-401 errors (network issues, server errors), don't clear tokens
            // Just log the error and return null - user stays "authenticated" with existing token
            console.error("Fetch profile error:", e);
            return null;
        }
    };

    // Initialize auth on app load
    const initAuth = async (): Promise<boolean> => {
        // Initialize from localStorage first
        initFromStorage();
        
        const token = getAccessToken();
        if (!token) {
            isInitialized.value = true;
            return false;
        }

        // Try to fetch profile, which will refresh token if needed
        const profile = await fetchProfile();
        isInitialized.value = true;
        return !!profile;
    };

    // Setup automatic token refresh (every 50 minutes since token expires in 1 hour)
    const setupTokenRefresh = () => {
        if (process.client) {
            // Refresh every 50 minutes (3000000 ms)
            setInterval(async () => {
                if (getRefreshToken()) {
                    await refreshAccessToken();
                }
            }, 3000000);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        isInitialized,
        error,
        login,
        register,
        logout,
        fetchProfile,
        initAuth,
        refreshAccessToken,
        getAccessToken,
        authHeaders,
        setupTokenRefresh,
    };
};

// Type export for use outside composables
export type { User, AuthTokens, LoginCredentials, RegisterData };
