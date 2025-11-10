import styles from './Cart.module.css'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/helper'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrder, getMyClienteProfile } from '../../utils/api'

function Cart() {

    const { cart, removeFromCart, clearCart, totalPrice, cartItemCount } = useCart()
    const { isAuthenticated, token } = useAuth()
    const navigate = useNavigate()

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            toast.error("Você precisa estar logado para continuar.")
            // Idealmente, abrir o modal de login aqui
            return
        }

        try {
            // 1. VERIFICA se o usuário já tem um perfil de cliente
            const profile = await getMyClienteProfile(token)

            if (profile) {
                // 2. SE JÁ TEM PERFIL, vai direto para a página de pagamento
                toast.info("Seus dados já estão cadastrados. Indo para o pagamento.")
                navigate('/payment')
            } else {
                // 3. SE NÃO TEM PERFIL, vai para a página de identificação
                toast.info("Precisamos de alguns dados para a entrega. Por favor, complete seu cadastro.")
                navigate('/identification')
            }
        } catch (error) {
            toast.error("Não foi possível verificar seus dados. Tente novamente.")
        }
    }
    
    if (cartItemCount === 0) {
        return (
            <div className={styles.carrinhoVazio}>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos à sua cesta para vê-los aqui.</p>
                <Link to="/">Voltar para a loja</Link>
            </div>
        );
    }

    return (
        <div className={styles.carrinhoContainer}>
            <h2>Carrinho</h2>

            {/* Tabela de Produtos */}
            <table className={styles.tabela}>

                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Tamanho</th>
                        <th>Qtd.</th>
                        <th className={styles.colunaPreco}>Preço</th>
                        <th className={styles.colunaApagar}>Apagar</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <tr key={item.cartId}>
                            <td>{item.nome}</td>
                            <td className={styles.colunaTamanho}>{item.size}</td>
                            <td>{item.quantidade}</td>
                            <td className={styles.colunaPreco}>{formatCurrency(item.preco * item.quantidade)}</td>
                            <td className={styles.colunaApagar}>
                                <span className='material-symbols-outlined' onClick={() => removeFromCart(item.cartId)}>delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan="2"><strong>TOTAL</strong></td>
                        <td className={styles.colunaPreco}>{formatCurrency(totalPrice)}</td>
                    </tr>
                </tfoot>
            </table>

            {/* Detalhes do Carrinho frete,cupom e resumo */}
            <div className={styles.carrinhoDetalhes}>

                <div className={styles.detalhesBox}>
                    <label htmlFor="cep">Prazo de entrega</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id='cep' placeholder='00000-000' />
                        <button type='button'>Calcular</button>
                    </div>
                    <p>Tempo previsto para entrega</p>
                    <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank"
                        rel="noopener noreferrer">
                        Não sei meu CEP
                    </a>
                </div>

                <div className={styles.detalhesBox}>
                    <label htmlFor="cupom">Cupom de desconto</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id='cupom' placeholder='Insira seu cupom' />
                        <button type='button'>Aplicar</button>
                    </div>
                </div>

                <div className={`${styles.detalhesBox} ${styles.resumo}`}>
                    <h3>Resumo</h3>
                    <ul>
                        <li>
                            <span>Valor dos produtos</span>
                            <span>{formatCurrency(totalPrice)}</span>
                        </li>
                        <li>
                            <span>Frete</span>
                            <span>-</span>
                        </li>
                        <li>
                            <span>Desconto</span>
                            <span>-</span>
                        </li>
                        <li>
                            <strong>Total da compra</strong>
                            <strong>{formatCurrency(totalPrice)}</strong>
                        </li>
                    </ul>
                    <button type='button' className={styles.btnContinuar} onClick={handleCheckout}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart