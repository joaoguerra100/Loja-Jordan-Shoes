import styles from './Home.module.css'
import Hero from "../../components/Hero"
import TopFixed from '../../components/TopFixed'
import ProductCard from '../../components/ProductCard'
import { useEffect, useState } from "react"
import { getProdutcs } from '../../utils/api'

function Home() {
    const [producs, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const dataFromApi = await getProdutcs()
                setProducts(dataFromApi)
            } catch (error) {
                setError("Não foi possível carregar os produtos. Tente novamente mais tarde.")
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '100px' }}>Carregando produtos...</p>
    }

    if(error)
    {
        return <p style={{ textAlign: 'center', marginTop: '100px', color: 'red' }}>{error}</p>
    }

    return (
        <>
            <TopFixed />
            <Hero />

            <section className={styles.produtos}>

                <div className={styles.heading}>
                    <h3>Os melhores em um só lugar</h3>
                    <p>
                        A marca Jorda na JodarShoes é a escolha certa para os amantes de sneakers
                        <br />
                        que buscam estilo e conforto.
                    </p>
                </div>

                <div className={styles.listaProdutos}>
                    {producs.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </section>

        </>
    )
}

export default Home
