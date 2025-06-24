import styles from './Nosotros.module.css'

export default function Nosotros(){
    return(
        <main>
            <div className={`${styles.backgroundNavProperties}`}>
                <div className={styles.infoImageProperties}>
                    <div className={styles.h5Properties}>
                    <h2>Acerca de nosotros</h2>
                    </div>
                        <h5>Experiencia | Compromiso | Transparencia</h5>
                </div>
            </div>
            <div className={styles.generalInfoProperties}>
                <div className={styles.infoProperties}>
                    <h1>¿Quiénes somos?</h1>
                    <p>En Flora Cordeiro Inmobiliaria, sabemos que encontrar el hogar perfecto o la inversión ideal es mucho más que una simple transacción: es un paso importante en tu vida.

                        Con años de experiencia y un profundo conocimiento del mercado inmobiliario en [Tandil y sus alrededores / la región], nos dedicamos a hacer realidad tus sueños y objetivos.</p>
                </div>
                <div className={styles.infoProperties}>
                    <h1>¿Por qué elegirnos?</h1>
                    <p>En Flora Cordeiro Inmobiliaria, sabemos que encontrar el hogar perfecto o la inversión ideal es mucho más que una simple transacción: es un paso importante en tu vida.

                        Con años de experiencia y un profundo conocimiento del mercado inmobiliario en [Tandil y sus alrededores / la región], nos dedicamos a hacer realidad tus sueños y objetivos.</p>
                </div>
                <div className={styles.missionAndVisionProperties}>
                    <div className={styles.infoProperties}>
                        <h1>Misión</h1>
                        <p>Ser tu socio confiable en cada transacción inmobiliaria en Tandil, ofreciendo soluciones ágiles y transparentes.</p>
                    </div>
                    <div className={styles.infoProperties}>
                        <h1>Visión</h1>
                        <p>Consolidarnos como la inmobiliaria líder en Tandil, reconocida por la excelencia y la satisfacción de nuestros clientes.</p>
                    </div>
                </div>
            </div>
            <div className={styles.imgRealStateProperties}>

            </div>
        </main>
    );
}