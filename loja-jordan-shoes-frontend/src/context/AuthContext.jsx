import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser, loginUser } from '../utils/api';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            try {
                // Decodifica o token para extrair informações do usuário (email, id, role)
                const decodeUser = jwtDecode(token)
                setUser({
                    id: decodeUser.sub,
                    email: decodeUser.email,
                    role: decodeUser.role
                })
                localStorage.setItem('authToken', token)
            } catch (error) {
                console.error("Token inválido:", error)
                logout()
            }
        } else {
            localStorage.removeItem('authToken')
            setUser(null)
        }
    }, [token])

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password)
            setToken(data.token)
            toast.success('Login realizado com sucesso!')
            return { success: true }
        } catch (error) {
            toast.error(error.message || 'E-mail ou senha inválidos.')
            return { success: false, message: error.message }
        }
    }

    const register = async (email, password, confirmPassword) => {
        try {
            await registerUser(email, password, confirmPassword)
            toast.success('Cadastro realizado com sucesso! Faça o login para continuar.');
            return { success: true }
        } catch (error) {
            toast.error(error.message || 'Não foi possível registrar.')
            return { success: false, message: error.message }
        }
    }

    const logout = () => {
        setToken(null);
    };

    const isAuthenticated = !!user
    const userName = user ? user.email : ''

    const value = {
        token,
        user,
        isAuthenticated,
        userName,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)