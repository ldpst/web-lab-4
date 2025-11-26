import { useState, useContext, createContext, useEffect } from "react";
// import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthRouter = ({ children }) => {
    const [token, setToken] = useState(() => {return localStorage.getItem("token")});
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            // setUser(jwt_decode(token).username);
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