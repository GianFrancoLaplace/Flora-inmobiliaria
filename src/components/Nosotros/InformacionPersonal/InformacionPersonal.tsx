import styles from "@/components/Nosotros/InformacionPersonal/InformacionPersonal.module.css";
import Image from "next/image";

export default function InformacionPersonal() {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image

                    src={"/backgrounds/homeBackground.jpg"}
                    alt={"Retrato de Flora Cordeiro, Martillera Pública"}
                    width={350} // Define un ancho base
                    height={450} // Define un alto base
                    className={styles.image}
                />
            </div>

            <div className={styles.textContainer}>
                <h2 className={styles.title}>Flora Cordeiro (Martillera Pública)</h2>

                <p className={styles.description}>
                    Al frente de Flora Cordeiro Inmobiliaria se encuentra Flora Cordeiro,
                    Martillera Pública y Corredora de Comercio, y el corazón de nuestra empresa.
                </p>
                <p className={styles.description}>
                    Con una sólida trayectoria y un profundo conocimiento del mercado
                    inmobiliario de Tandil, ella lidera nuestro equipo con pasión y profesionalismo.
                </p>
            </div>
        </div>
    );
}