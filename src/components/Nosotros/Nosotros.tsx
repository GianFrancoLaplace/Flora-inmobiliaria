import styles from './Nosotros.module.css'
import Image from "next/image";

export default function Nosotros() {
    return (
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

            <div className={styles.imageProperties}>
                <Image
                    src="/images/imagen_nosotros.jpg"
                    alt="Imagen Nosotros"
                    width={1000}          // valor de referencia
                    height={200}          // altura delgada
                    priority
                    style={{ width: '100%' }} // esto hace que se escale al 100%
                />
            </div>

            <div className={styles.underline}/>

            <div>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <Image

                            src={"/backgrounds/homeBackground.jpg"}
                            alt={"Retrato de Flora Cordeiro, Martillera Pública"}
                            width={450} // Define un ancho base
                            height={550} // Define un alto base
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>Flora Cordeiro (Martillera Pública)</h2>

                        <p className={styles.description}>
                            Al frente de "Flora Cordeiro Inmobiliaria" se encuentra Flora Cordeiro,
                            Martillera Pública y Corredora de Comercio, y el corazón de nuestra empresa.
                        </p>
                        <p className={styles.description}>
                            Con una sólida trayectoria y un profundo conocimiento del mercado
                            inmobiliario de Tandil, ella lidera nuestro equipo con pasión y profesionalismo.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}