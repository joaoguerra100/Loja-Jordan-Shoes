import { useAuth } from '../../../context/AuthContext'

function AdminDashboard() {
    const {user} = useAuth()
    return (
        <div>
            <h2>Bem-vindo ao Painel de Administração!</h2>
            <p>Olá, <strong>{user?.email}</strong>Use o menu ao lado para gerenciar a loja.</p>
        </div>
    )
}

export default AdminDashboard