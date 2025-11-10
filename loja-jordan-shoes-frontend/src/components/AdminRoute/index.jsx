import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminRoute({children}) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const location = useLocation()

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated || user?.role !== 'Admin') {
        console.error("Acesso negado:", { isAuthenticated, role: user?.role });
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children
}

export default AdminRoute
