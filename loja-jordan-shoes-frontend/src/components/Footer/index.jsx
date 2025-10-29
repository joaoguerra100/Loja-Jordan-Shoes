import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>

            <div className={styles.footerContent}>
                <p>&copy; {currentYear} Jordan Shoes. Todos os direitos reservados</p>
                <p>Desenvolvido com paixão por sneakers.</p>

                <nav className={styles.footerNav}>
                    <ul>
                        <li><Link to="/about">Sobre Nós</Link></li>
                        <li><Link to="/contact">Contato</Link></li>
                        <li><Link to="/privacy">Política de Privacidade</Link></li>
                        <li><Link to="/terms">Termos de Uso</Link></li>
                    </ul>
                </nav>

                <div className={styles.socialIcons}>
                    <a href="https://facebook.com" target='_blank' rel='noopener noreferrer'>
                        <span className='material-symbols-outlined'>facebook</span>
                    </a>

                    <a href="https://instagram.com" target='_blank' rel='noopener noreferrer'>
                        <span className='material-symbols-outlined'>camera_alt</span>
                    </a>

                    <a href="https://twitter.com" target='_blank' rel='noopener noreferrer'>
                        <span className='material-symbols-outlined'>alternate_email</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer