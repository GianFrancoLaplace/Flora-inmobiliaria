import styles from './Us.module.css'
import Image from "next/image";
import CarrouselFotos from "@/components/TechnicalFile/Carrousel/CarrouselFotos";

export default function Us() {
    return (
        <main className={styles.page}>
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
                        <p>En Flora Cordeiro Inmobiliaria, sabemos que encontrar el hogar perfecto o la inversión ideal es mucho más que una simple transacción: es un paso importante en tu vida. Con años de experiencia y un profundo conocimiento del mercado inmobiliario en Tandil y sus alrededores, nos dedicamos a hacer realidad tus sueños y objetivos.Aquí te ofrecemos un servicio completo, diseñado para que te sientas seguro y respaldado en cada etapa</p>
                </div>
                <div className={styles.infoProperties}>
                    <h1>¿Por qué elegirnos?</h1>
                    <p> Asesoramiento personalizado para encontrar la propiedad perfecta
                        Negociación efectiva para obtener el mejor precio y complacer ambas partes
                        Asistencia en todo el proceso de compra o venta
                        Acceso a una amplia red de contactos y propiedades

                        🌈Pero más que nada, quiero ser tu guía y tu confidente  en este proceso. Estoy aquí para escucharte, para entender tus necesidades y para ayudarte a alcanzar tus objetivos inmobiliarios.</p>
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

            <div className={styles.underline}/>

            <div>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <Image

                            src={"/backgrounds/homeBackground.jpg"}
                            alt={"Retrato de Flora Cordeiro, Martillera Pública"}
                            width={450}
                            height={550}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>Flora Cordeiro (Martillera Pública)</h2>

                        <p className={styles.description}>
                            Hola!
                            Soy Flora Cordeiro.

                            Me apasiona mi trabajo que se trata de ayudar a las personas a encontrar su hogar soñado o a cerrar de forma segura una operación inmobiliaria.

                            Mi compromiso es acompañarte de la mano en cada paso del proceso, escuchando tus necesidades y haciendo que todo sea fácil, claro y especialmente que sea siempre una linda experiencia!

                            Con mi  conocimiento en el mercado inmobiliario, y la característica de mantenerme siempre actualizada en el sector, puedo ofrecerte:

                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}