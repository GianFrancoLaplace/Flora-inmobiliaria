import styles from './NavCss.module.css'
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
export default function Nav() {
    return (
        <div className={styles.navImageProperties}>
            <nav className={`${styles.navProperties}`}>

                <ul className={`${styles.logoProperties}`}>
                    <Link href="./app/layout.tsx">
                        <Image
                            src={'/logos/footerLogo.png'}
                            alt={'minimalist inmobiliaria yellow logo'}
                            width={200}
                            height={120}
                        />
                    </Link>

                    <div className={`${styles.nameProperties} ${cactus.className}`}>
                        <div className={`${cactus.className}`}>
                            <h1>Flora Cordeiro</h1>
                        </div>
                        <div className={`${cactus.className}`}>
                            <h3>Negocios inmobiliarios</h3>
                        </div>
                    </div>
                </ul>

                <ul className={`${styles.sectionProperties} ${cactus.className}`}>
                    <h2>Inicio</h2>
                    <h2>Propiedades</h2>
                    <h2>Nosotros</h2>
                    <h2>Ventas</h2>
                    <Image
                        src={'/logos/iconoUser.png'}
                        alt={'minimalist inmobiliaria yellow logo'}
                        className={`${styles.iconoProperties}`}
                        width={35}
                        height={35}
                    />
                </ul>
            </nav>
        </div>
    );
}