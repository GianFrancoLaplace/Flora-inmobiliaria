'use client';

import styles from './Nav.module.css'
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function Nav() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isLogin = pathname === '/Login';
    const isI_WantSell = pathname === '/QuieroVender';

    return (
        <nav className={`${styles.navProperties} ${isHome ? styles.absoluteNav : isLogin ? styles.absoluteNav : isI_WantSell ? styles.absoluteNav : styles.staticNav}`}>
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

            <ul className={`${styles.sectionProperties} ${cactus.className}`}>
                <li><a href={"/"}>Inicio</a></li>
                <li><a href={"/Propiedades"}>Propiedades</a></li>
                <li><a href={"/Nosotros"}>Nosotros</a></li>
                <li><a href={"/Ventas"}>Ventas</a></li>
                <li><a href={"/Login"}><Image src={'/icons/iconoUser.png'} alt={'minimalist user icon'} className={`${styles.iconoProperties}`}
                    width={35}
                    height={35}/></a> </li>
            </ul>
        </nav>
    );
}