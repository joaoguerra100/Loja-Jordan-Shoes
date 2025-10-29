import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

import JordanIcon from '../../assets/images/icon_jordan.svg'

function Header({ onOpenLogin }) {
    const { cartItemCount } = useCart()
    const { isAuthenticated, userName, logout } = useAuth()
    const navigate = useNavigate()

    const handleCartClick = () => {
        navigate('/cart')
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header className={styles.topo}>
            <div className={styles.marca}>
                <Link to="/" className={styles.link_home}>
                    <img src={JordanIcon} alt="Logo Jordan" />
                    <h1>Jordan Shoes</h1>
                </Link>
            </div>

            <div className={styles.btnCarrinho}>
                <div className={styles.btnCarrinhoIcone} onClick={handleCartClick}>
                    <span className={`material-symbols-outlined ${styles.icone}`}>
                        shopping_cart
                    </span>
                    {cartItemCount > 0 && (
                        <span className={styles.numeroItens}>{cartItemCount}</span>
                    )}
                </div>

                <div className={styles.btnCarrinhoUser}>
                    {!isAuthenticated ? (
                        <span
                            id='btn_open_login'
                            className={`material-symbols-outlined ${styles.icone}`}
                            onClick={onOpenLogin}
                        >
                            account_circle
                        </span>
                    ) : (
                        <>
                            <span id='nome_usuario' className={styles.nomeUsuario}>{userName}</span>
                            <span id='btn_logout' className={styles.btnLogout} onClick={handleLogout}>Sair</span>
                        </>
                    )}
                </div>

            </div>

        </header>
    );
}

export default Header