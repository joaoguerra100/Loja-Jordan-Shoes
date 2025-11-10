import styles from './NotFound.module.css'
import jordanLost from '../../assets/images/jordan-lost.png'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.content}>
                <img src={jordanLost} alt="Ilustração de um tenis Jordan perdido"  className={styles.image}/>
                <h1 className={styles.title}>Oops! Pagina nao Encontrada</h1>
                <p className={styles.message}>Parece que voce pegou um caminho errado.A pagina que voce esta procurando nao exte</p>
                <Link to="/" className={styles.homeButton}>
                    Voltar para a Loja
                </Link>
            </div>
        </div>
    )
}

export default NotFound
