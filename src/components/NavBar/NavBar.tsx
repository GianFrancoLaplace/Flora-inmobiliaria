'use client';

import styles from './NavBar.module.css'
import {cactus} from "@/app/(views)/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '../../lib/actions';

export default function NavBar() {
	const pathname = usePathname();
	const isHome = pathname === '/';
	const isLogin = pathname === '/login';
	const isI_WantSell = pathname === '/quiero-vender';
	const isOur = pathname === '/nosotros';
	const isAdmin = pathname === '/administracion';

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav className={`${styles.navProperties} ${isHome ? styles.absoluteNav : isLogin ? styles.absoluteNav : isI_WantSell ? styles.absoluteNav : isOur ? styles.absoluteNav : styles.staticNav}`}>
			<ul className={`${styles.logoProperties}`}>
				<Link href="/">
					<Image
						src={'/logos/fullLogo.png'}
						alt={'minimalist inmobiliaria yellow logo'}
						width={423}
						height={90}
					/>
				</Link>
			</ul>
			<ul className={styles.btnBurgerProperties}>
				<button onClick={toggleMenu}>
					<Image
						src={'/icons/iconoMenu.png'}
						alt={"icono menú hamburguesa"}
						width={40}
						height={40}
					/>
				</button>
			</ul>

			<ul className={`${styles.sectionProperties} ${isOpen ? styles.openNav : styles.closeNav} ${cactus.className}`}>
				<li><a href={"/"}>Inicio</a></li>
				<li><a href={"/propiedades"}>Propiedades</a></li>
				<li><a href={"/nosotros"}>Nosotros</a></li>
				<li><a href={"/quiero-vender"}>Quiero vender</a></li>
				<li>
					{pathname === '/administracion' ? (
						<button
							onClick={async () => {
								await handleSignOut();
								window.location.href = "/";
							}}
							className={` ${styles.logoutButton} ${cactus.className}`}
						>
							<h3>Cerrar Sesión</h3>
						</button>
					) : (
						<Link href="/login">
							<Image
								src={'/icons/iconoUser.png'}
								alt={'Iniciar sesión'}
								className={styles.iconoProperties}
								width={20}
								height={20}
							/>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}