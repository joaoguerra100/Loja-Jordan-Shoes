import styles from './Hero.module.css'
import jordanLogo from '../../assets/images/logo-jordan.png'

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>

                <h1>
                    <img src={jordanLogo} alt="Logo Jordan" />
                    Jordan Shoes
                </h1>

                <h2>A melhor loja de Jordan</h2>

                <p>
                    O tênis Jordan é fruto de uma velha e forte <br />
                    parceria entre Nike e o jogador Michael Jordan
                </p>
            </div>
        </section>
    )
}

export default Hero