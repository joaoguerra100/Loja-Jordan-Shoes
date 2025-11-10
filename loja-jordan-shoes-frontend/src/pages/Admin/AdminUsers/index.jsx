import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { getAllUsers } from '../../../utils/api'
import styles from './AdminUsers.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function AdminUsers() {
    const { token } = useAuth()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            if (token) {
                const data = await getAllUsers(token)
                setUsers(data)
            }
        };
        fetchUsers();
    }, [token])

    return (
        <div className={styles.container}>

            <h1>Usuários Cadastrados</h1>

            <table className={styles.table}>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Papel (Role)</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    )
}

export default AdminUsers
