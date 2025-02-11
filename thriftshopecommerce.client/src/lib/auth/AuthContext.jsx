import { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext(null);

// Provide the AuthContext
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("auth")) || null;
        } catch {
            return null;
        }
    });

    const login = (data) => {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);