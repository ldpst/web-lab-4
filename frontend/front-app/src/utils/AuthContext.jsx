import { useState, useContext, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthRouter = ({ children }) => {
    const [token, setToken] = useState(() => {return localStorage.getItem("token")});
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);

                setUser({
                    id: decoded.sub,
                    email: decoded.email
                });
            } catch (e) {
                console.error("Invalid token:", e);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}