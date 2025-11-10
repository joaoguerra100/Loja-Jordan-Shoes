import { NavLink, Outlet } from 'react-router-dom'
import styles from './AdminLayout.module.css'

function AdminLayout() {
    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <h3>Admin</h3>

                <nav>
                    <ul>
                        <li><NavLink to="/admin" end>Dashboard</NavLink></li>
                        <li><NavLink to="/admin/products">Produtos</NavLink></li>
                        <li><NavLink to="/admin/users">Usuários</NavLink></li>
                    </ul>
                </nav>

            </aside>
            <main className={styles.content}>
                <Outlet />{/* Aqui as páginas aninhadas serão renderizadas */}
            </main>
        </div>
    )
}

export default AdminLayout
