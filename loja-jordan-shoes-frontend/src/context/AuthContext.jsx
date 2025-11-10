import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser, loginUser } from '../utils/api';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser({
                    id: decodedUser.sub,
                    email: decodedUser.email,
                    role: decodedUser.role || decodedUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                });
                localStorage.setItem('authToken', token)
            } catch (error) {
                console.error("Token inválido:", error)
                localStorage.removeItem('authToken')
                setUser(null)
            }
        } else {
            localStorage.removeItem('authToken')
            setUser(null)
        }
        setIsLoading(false)
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

    const value = {
        token,
        user,
        isAuthenticated: !!user,
        isLoading,
        userName: user ? user.email : '',
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