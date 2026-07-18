import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            authAPI.getProfile()
                .then((data) => setUser(data.user || data.data))
                .catch(() => localStorage.removeItem("token"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Login — saves token and sets user
    const login = async (credentials) => {
        const data = await authAPI.login(credentials);
        // Backend sends back a token — save it!
        localStorage.setItem("token", data.token || data.data?.token);
        setUser(data.user || data.data?.user);
        return data;
    };

    // Register — same as login after registering
    const register = async (userData) => {
        const data = await authAPI.register(userData);
        localStorage.setItem("token", data.token || data.data?.token);
        setUser(data.user || data.data?.user);
        return data;
    };

    // Logout — clear everything
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);