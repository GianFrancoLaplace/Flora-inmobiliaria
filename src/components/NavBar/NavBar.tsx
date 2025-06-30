'use client';

import styles from './NavBar.module.css'
import {cactus} from "@/app/(views)/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function NavBar() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isLogin = pathname === '/Login';
    const isI_WantSell = pathname === '/QuieroVender';
    const isOur = pathname === '/Nosotros';

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`${styles.navProperties} ${isHome ? styles.absoluteNav : isLogin ? styles.absoluteNav : isI_WantSell ? styles.absoluteNav : isOur ? styles.absoluteNav : styles.staticNav}`}>
            <ul className={`${styles.logoProperties}`}>
                <Link href="/">
                    <Image
                        src={'/logos/fullLogo.png'}
                        alt={'minimalist inmobiliaria yellow logo'}
                        width={479}
                        height={102}
                    />
                </Link>
            </ul>
            <ul className={styles.btnBurgerProperties}>
                <button onClick={toggleMenu}><Image src={'/icons/iconoMenu.png'} alt={"icono menú hamburguesa"} width={40} height={40}/> </button>
            </ul>

            <ul className={`${styles.sectionProperties} ${isOpen ? styles.openNav : styles.closeNav} ${cactus.className}`}>
                <li><a href={"/"}>Inicio</a></li>
                <li><a href={"/Propiedades"}>Propiedades</a></li>
                <li><a href={"/Nosotros"}>Nosotros</a></li>
                <li><a href={"/QuieroVender"}>Quiero vender</a></li>
                <li>
                    <a href={"/Login"}><Image src={'/icons/iconoUser.png'} alt={'minimalist user icon'} className={`${styles.iconoProperties}`}
                    width={20}
                    height={20}/>
                    </a>
                </li>
            </ul>
        </nav>
    );
}