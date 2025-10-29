import styles from './Cart.module.css'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/helper'
import { Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

function Cart() {

    const { cart, removeFromCart, cartItemCount } = useCart()
    const navigate = useNavigate()

    // Calcula o preço total usando useMemo para otimização.
    // O cálculo só será refeito se o 'cart' mudar.
    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + item.price, 0)
    }, [cart])

    // Se o carrinho estiver vazio, exibe uma mensagem amigável
    if (cartItemCount === 0) {
        return (
            <div className={styles.carrinhoVazio}>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos à sua cesta para vê-los aqui.</p>
                <Link to="/">Voltar para a loja</Link>
            </div>
        )
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
                        <th className={styles.colunaPreco}>Preço</th>
                        <th className={styles.colunaApagar}>Apagar</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <tr key={item.cartId}>
                            <td>{item.product_name}</td>
                            <td className={styles.colunaTamanho}>{item.size}</td>
                            <td className={styles.colunaPreco}>{formatCurrency(item.price)}</td>
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
                    <button type='button' className={styles.btnContinuar} onClick={() => navigate('/identification')}>
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart