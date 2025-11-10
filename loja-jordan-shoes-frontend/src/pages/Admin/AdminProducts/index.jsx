import styles from './AdminProducts.module.css'
import { useAuth } from '../../../context/AuthContext'
import { getProdutcs, deleteProduct } from '../../../utils/api'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { formatCurrency } from '../../../utils/helper'

function AdminProducts() {
    const { token } = useAuth()
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const data = await getProdutcs()
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (productId) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            try {
                await deleteProduct(productId, token)
                toast.success("produto deletado com sucesso!")
                fetchProducts()
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h1>Gerenciamento de Produtos</h1>
                <button className={styles.addButton}>Adicionar Produto</button>
            </div>

            <table className={styles.table}>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td><img src={`/images/${product.image}`} alt={product.nome} width="50" /></td>
                            <td>{product.nome}</td>
                            <td>{formatCurrency(product.preco)}</td>
                            <td>
                                <button className={styles.editButton}>Editar</button>
                                <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    )
}

export default AdminProducts