import styles from './Modal.module.css'
import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null
    }

    // Usamos um Portal para renderizar o modal fora da hierarquia do App
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.btnClose} onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal