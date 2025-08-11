import styles from './Footer.module.css';
import Image from "next/image";
import Link from 'next/link'; // Usaremos Link para la navegación interna si es necesario

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Contenedor principal para alinear las columnas en desktop */}
            <div className={styles.footerContent}>

                {/* --- SECCIÓN REDES SOCIALES --- */}
                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Redes Sociales</h3>
                    {/* Usamos <a> para enlaces externos */}
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <Image
                            src={'/socialMedia/instagram.png'}
                            alt={'Instagram logo'}
                            width={24} // Ligeramente más pequeños para un look refinado
                            height={24}
                        />
                        <span>floracordeiro_inmobiliaria</span>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <Image
                            src={'/socialMedia/facebook.png'}
                            alt={'Facebook logo'}
                            width={24}
                            height={24}
                        />
                        <span>Flora Cordeiro Inmobiliaria</span>
                    </a>
                    <a href="mailto:floracordeiroinmobiliaria@gmail.com" className={styles.contactItem}>
                        <Image
                            src={'/socialMedia/gmail.png'}
                            alt={'Gmail logo'}
                            width={24}
                            height={24}
                        />
                        <span>floracordeiroinmobiliaria@gmail.com</span>
                    </a>
                </div>

                {/* --- SECCIÓN CONTACTO --- */}
                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Contacto</h3>
                    {/* Enlace para llamar directamente en móviles */}
                    <a href="https://wa.me/2494208037" className={styles.contactItem}>
                        <span>2494 208037</span>
                    </a>
                    {/* Puedes hacer que la dirección abra Google Maps */}
                    <a href="https://www.google.com/maps/search/?api=1&query=Alsina+421,Tandil" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <span>14 de Julio 796, Tandil.</span>
                    </a>
                </div>

                {/* --- SECCIÓN LOGO --- */}
                <div className={`${styles.footerSection} ${styles.logoContainer}`}>
                    <Link href="/" passHref>
                        <Image
                            src={'/logos/footerLogo.png'}
                            alt={'Logo de Flora Cordeiro Inmobiliaria'}
                            width={180} // Ajustamos el tamaño
                            height={108}
                            className={styles.footerLogo}
                        />
                    </Link>
                </div>

            </div>
            <div className={styles.footerCopyright}>
                <p>© {new Date().getFullYear()} Flora Cordeiro Inmobiliaria. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}