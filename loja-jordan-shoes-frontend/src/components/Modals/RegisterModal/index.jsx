import styles from './RegisterModal.module.css'
import Modal from '../../Modal'
import { useAuth } from '../../../context/AuthContext'
import { useState } from 'react'

function RegisterModal({ isOpen, onClose }) {

    const { register } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (password.length < 5) {
            setError('A senha deve ter no minimo 5 caracteres.')
            return
        }
        if (password !== confirmPassword) {
            setError('As senhas nao coincidem.')
            return
        }

        const result = await register(email, password, confirmPassword)
        if (result.success) {
            onClose()
        } else {
            setError(result.message || 'Não foi possível registrar. Tente outro e-mail.')
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <h2>Cadastrar</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email_usuario">E-mail</label>
                        <input type="email" id="email_usuario" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="senha_usuario">Senha</label>
                        <input type="password" id="senha_usuario" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirma_senha_usuario">Confirme a Senha</label>
                        <input type="password" id="confirma_senha_usuario" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Cadastrar</button>
                    {error && <p className={styles.erro}>{error}</p>}
                </form>
            </div>
        </Modal>
    )
}

export default RegisterModal