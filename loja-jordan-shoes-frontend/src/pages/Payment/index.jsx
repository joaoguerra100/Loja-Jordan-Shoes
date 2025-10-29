import styles from './Payment.module.css'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').trim()
}

function Payment() {

    const navigate = useNavigate()
    const { cart, clearCart } = useCart()

    const [formData, setFormData] = useState({
        cardNumber: '', cardName: '', expiryDate: '', cvv: '', installments: '1',
        saveCard: false
    })
    const [formErrors, setFormErrors] = useState({})

    const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price, 0), [cart])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        let formattedValue = value
        if (name === 'cardNumber') formattedValue = formatCardNumber(value)
        if (name === 'expiryDate') formattedValue = formatExpiryDate(value)

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : formattedValue
        }))
    }

    const validateForm = () => {
        const errors = {}
        if (formData.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = "numero do cartao invalido."
        if (!formData.cardName) errors.cardName = "Nome impresso e obrigatorio."
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) errors.expiryDate = "Validade inválida (MM/AA)."
        if (formData.cvv.length < 3) errors.cvv = "CVV invalido"
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm()
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            const clienteData = JSON.parse(localStorage.getItem('dadosCliente') || '{}')
            const pedido = {
                id: new Date().getTime(),
                cliente: clienteData,
                itens: cart,
                total: totalPrice,
                pagamento: {
                    numeroCartao: formData.cardNumber.slice(-4),
                    parcelas: formData.installments
                },
                data: new Date().toISOString()
            }
            console.log("PEDIDO FINALIZADO:", pedido)
            // Aqui, em um app real, você enviaria o 'pedido' para o seu backend

            toast.success("Compra realizada com sucesso!")
            clearCart();
            localStorage.removeItem('dadosCliente')
            navigate('/');
        }
    }

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Seu carrinho esta vazio</h2>
                <button onClick={() => navigate('/')}>Voltar para a loja</button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h2>Pagamento</h2>
            <p>* campos obrigatórios</p>

            <div className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <h3>Dados do cartão</h3>

                    <div className={styles.inputGroup}>
                        <label htmlFor="cardNumber">Número do cartão*</label>
                        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength="19" placeholder="0000 0000 0000 0000" required className={formErrors.cardNumber ? styles.campoInvalido : ''} />
                        {formErrors.cardNumber && <span className={styles.erro}>{formErrors.cardNumber}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="cardName">Nome impresso no cartão*</label>
                        <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required className={formErrors.cardName ? styles.campoInvalido : ''} />
                        {formErrors.cardName && <span className={styles.erro}>{formErrors.cardName}</span>}
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="expiryDate">Validade*</label>
                            <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} maxLength="5" placeholder="MM/AA" required className={formErrors.expiryDate ? styles.campoInvalido : ''} />
                            {formErrors.expiryDate && <span className={styles.erro}>{formErrors.expiryDate}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="cvv">Código de Segurança*</label>
                            <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} maxLength="4" placeholder="CVV" required className={formErrors.cvv ? styles.campoInvalido : ''} />
                            {formErrors.cvv && <span className={styles.erro}>{formErrors.cvv}</span>}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="installments">Número de parcelas*</label>
                        <select id="installments" name="installments" value={formData.installments} onChange={handleChange}>
                            <option value="1">1x de {formatCurrency(totalPrice)}</option>
                            <option value="2">2x de {formatCurrency(totalPrice / 2)}</option>
                            <option value="3">3x de {formatCurrency(totalPrice / 3)}</option>
                        </select>
                    </div>

                    <div className={styles.bloco}>
                        <input type="checkbox" id="saveCard" name="saveCard" checked={formData.saveCard} onChange={handleChange} />
                        <label htmlFor="saveCard">Salvar cartão para minhas próximas compras</label>
                    </div>

                    <div className={styles.botao}>
                        <button type="submit">Finalizar Compra</button>
                    </div>

                </form>

                <div className={styles.resumo}>
                    <h3>Resumo do Pedido</h3>
                    <ul>
                        {cart.map(item => (
                            <li key={item.cartId}>
                                <span>{item.product_name} (Tam: {item.size})</span>
                                <span>{formatCurrency(item.price)}</span>
                            </li>
                        ))}
                        <li className={styles.total}>
                            <span>Total</span>
                            <span>{formatCurrency(totalPrice)}</span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Payment