import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // Estado mocado para simular o usuario logado

    const [user, setUser] = useState(null) // null = deslogado, { name: 'Usuário Teste' } = logado

    const login = async (email, password) => {
        // Simulação: em um app real, aqui haveria uma chamada de API
        if (email === "test@teste.com" && password === "senha") {
            setUser({ name: "Usuário Teste" })
            return true;
        }
        return false
    }

    const register = async (email, password) => {
        console.log("Registrando usuário:", email)
        setUser({ name: email.split('@')[0] })
        return true
    }

    const logout = () => {
        setUser(null); // Simplesmente define o usuário como nulo para deslogar
    };

    const isAuthenticated = !!user
    const userName = user ? user.name : ''

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)