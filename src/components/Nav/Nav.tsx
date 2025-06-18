import styles from './Nav.module.css'
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import PropertiesSearchBar from "@/components/features/SearchBar/SearchBar";
export default function Nav() {
    return (
        <div className={styles.navImageProperties}>
            <nav className={`${styles.navProperties}`}>

                <ul className={`${styles.logoProperties}`}>
                    <Link href="./app/layout.tsx">
                        <Image
                            src={'/logos/fullLogo.png'}
                            alt={'minimalist inmobiliaria yellow logo'}
                            width={479}
                            height={102}
                        />
                    </Link>
                </ul>

                <ul className={`${styles.sectionProperties} ${cactus.className}`}>
                    <h2>Inicio</h2>
                    <h2>Propiedades</h2>
                    <h2>Nosotros</h2>
                    <h2>Ventas</h2>
                    <Image
                        src={'/icons/iconoUser.png'}
                        alt={'minimalist user icon'}
                        className={`${styles.iconoProperties}`}
                        width={35}
                        height={35}
                    />
                </ul>
            </nav>
            <PropertiesSearchBar/>
        </div>
    );
}