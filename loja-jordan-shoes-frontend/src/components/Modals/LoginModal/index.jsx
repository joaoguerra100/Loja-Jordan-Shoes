import styles from './LoginModal.module.css'
import Modal from '../../Modal'
import { useAuth } from '../../../context/AuthContext'
import { useState } from 'react'

function LoginModal({isOpen, onClose, onSwitchToRegister}) {

    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const result = await login(email, password)
        if (result.success) {
            onClose()
        } else {
            setError(result.message || 'E-mail ou senha inválidos.')
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <h2>Entrar</h2>
                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email_login">E-mail</label>
                        <input
                            type="email"
                            id='email_login'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="senha_login">Senha</label>
                        <input
                            type="password"
                            id='senha_login'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit'>Entrar</button>
                    {error && <p className={styles.erro}>{error}</p>}

                </form>
                <div className={styles.centralizar}>
                    <span className={styles.linkCadastrar} onClick={onSwitchToRegister}>
                        Cadastrar Usuario
                    </span>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal