import styles from './Home.module.css'
import Hero from "../../components/Hero"
import TopFixed from '../../components/TopFixed'
import ProductCard from '../../components/ProductCard'
import productsData from '../../data/products.json'
import { useEffect, useState } from "react"

function Home() {

    const [producs, setProducts] = useState([])

    useEffect(() => {
        // Aqui chamar a API
        setProducts(productsData)
    }, [])

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
