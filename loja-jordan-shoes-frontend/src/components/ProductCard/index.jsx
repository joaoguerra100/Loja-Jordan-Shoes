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
                <img src={`/images/${product.image}`} alt={product.nome} />
            </figure>

            <div className={styles.cardProdutoDetalhes}>
                <h4>{product.nome}</h4>
                <h5>{product.descricao}</h5>
            </div>

            <h6>{formatCurrency(product.preco)}</h6>
        </div>
    )
}

export default ProductCard