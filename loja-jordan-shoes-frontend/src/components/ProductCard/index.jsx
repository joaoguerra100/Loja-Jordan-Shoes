import { useNavigate } from 'react-router-dom'
import styles from './ProductCard.module.css'
import { formatCurrency } from '../../utils/helper'

function ProductCard({ product }) {
    const navigate = useNavigate()

    // Se não houver produto, não renderize nada
    if (!product) {
        return null
    }

    // Função que será chamada ao clicar no card
    const handleCardClick = () => {
        // Navega para a página de detalhes do produto, usando o ID do produto na URL
        navigate(`/product/${product.id}`)
    };

    return (
        <div className={styles.cardProduto} onClick={handleCardClick}>
            <figure>
                {/* As imagens dos produtos devem estar na pasta 'public/images' */}
                <img src={`/images/${product.image}`} alt={product.product_name} />
            </figure>

            <div className={styles.cardProdutoDetalhes}>
                <h4>{product.product_name}</h4>
                <h5>{product.product_model}</h5>
            </div>

            <h6>{formatCurrency(product.price)}</h6>
        </div>
    )
}

export default ProductCard