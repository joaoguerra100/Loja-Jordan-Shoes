import styles from './ProductDetails.module.css'
import { getProdutcById } from '../../utils/api'
import { formatCurrency } from '../../utils/helper'
import { useCart } from '../../context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// Lista de tamanhos
const SIZES = ["38", "39", "39,5", "40", "40,5", "41", "42", "42,5", "43",
    "43,5", "44", "45", "46", "47", "48", "49", "50", "51"]

function ProductDetails() {

    const { id } = useParams() //Pega o id da url
    const navigate = useNavigate()
    const { addToCart } = useCart() //Função para adicionar ao carrinho

    const [product, setProduct] = useState(null)
    const [loading, setloading] = useState(true)
    const [selectedSize, setSelectedSize] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            setloading(true)
            const productData = await getProdutcById(id)
            setProduct(productData)
            setloading(false)
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.warn("Por favor, selecione um tamanho.")
            return
        }
        addToCart(product, selectedSize)
        toast.success(`"${product.product_name}" adicionado ao carrinho!`)
        navigate('/cart')
    }

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando detalhes do produto...</div>
    }

    // Renderização condicional se o produto não for encontrado
    if (!product) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Produto não encontrado.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>

            <div className={styles.voltar} onClick={() => navigate('/')}>
                &larr; Voltar para a Home
            </div>

            <section className={styles.produtoDetalhes}>

                {/* Grid de Imagens */}
                <div className={styles.imagensGrid}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <figure key={i}>
                            <img src={`/images/${product.image}`} alt={`${product.product_name} - vista ${i}`} />
                        </figure>
                    ))}
                </div>

                {/* Informaçoes do Produto */}
                <div className={styles.infoProduto}>
                    <div className={styles.infoContainer}>
                        <h4>{product.product_name}</h4>
                        <h5>{product.product_model}</h5>
                        <h6>{formatCurrency(product.price)}</h6>
                    </div>

                    <div className={styles.tamanho}>
                        <h5>Tamanho</h5>
                        <div className={styles.tamanhosGrid}>
                            {SIZES.map(size => (
                                <div key={size}>
                                    <input
                                        className={styles.radio}
                                        type="radio"
                                        name='size'
                                        id={`size${size}`}
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    />
                                    <label htmlFor={`size${size}`}>{size}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.btnAddCarrinho}>
                        <button onClick={handleAddToCart} disabled={!selectedSize}>
                            Adicionar ao carrinho
                        </button>
                    </div>

                    <div className={styles.descricao}>
                        <p>
                            Inspirado no AJ1 original, essa edição cano médio mantém o
                            visual icônico que você ama, enquanto a escolha de cores e o
                            couro conferem uma identidade distinta.
                        </p>
                        <p>Beneficios:</p>
                        <ul>
                            <li>Cabedal em material genuíno, sintético e tecido para sensação de suporte.</li>
                            <li>Entressola de espuma e amortecimento Nike Air proporcionando conforto e leveza.</li>
                            <li>Solado de borracha com ponto de giro cria tração duradoura.</li>
                        </ul>
                    </div>

                    <details className={styles.frete}>
                        <summary>Calcular frete e entrega</summary>
                        <p>Calcule o frete e o prazo de entrega estimado para a sua região</p>
                        {/* Formulário de frete pode ser um componente separado no futuro */}
                        <label>Insira o seu cep</label>
                        <div>
                            <input type="text" placeholder="00000-000" />
                            <button type="button">Calcular</button>
                        </div>
                        <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank"
                            rel="noopener noreferrer">
                            Não sei meu CEP
                        </a>
                    </details>

                </div>

            </section>
        </div>
    )
}

export default ProductDetails