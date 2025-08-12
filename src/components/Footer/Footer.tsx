import styles from './Footer.module.css';
import Image from "next/image";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Redes Sociales</h3>
                    <a href="https://instagram.com/floracordeiro_inmobiliaria" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <Image
                            src={'/socialMedia/instagram.png'}
                            alt={'Instagram logo'}
                            width={24}
                            height={24}
                        />
                        <span>floracordeiro_inmobiliaria</span>
                    </a>
                    <a href="https://facebook.com/inmob.flora.cordeiro" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
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

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Contacto</h3>
                    <a href="https://wa.me/2494208037" className={styles.contactItem}>
                        <span>2494 208037</span>
                    </a>
                    <a href="https://www.google.com/maps/search/?api=1&query=14+de+julio+796,Tandil" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <span>14 de Julio 796, Tandil.</span>
                    </a>
                </div>

                <div className={`${styles.footerSection} ${styles.logoContainer}`}>
                    <Link href="/" passHref>
                        <Image
                            src={'/logos/footerLogo.png'}
                            alt={'Logo de Flora Cordeiro Inmobiliaria'}
                            width={180}
                            height={108}
                            className={styles.footerLogo}
                        />
                    </Link>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=magno.itsystems@gmail.com&su=Consultar%20por%20servicios%20de%20desarrollo%20de%20software"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/logos/logoMagno.png"
                            alt="Logo magno"
                            width={100}
                            height={100}
                        />
                    </a>
                </div>

            </div>
            <div className={styles.footerCopyright}>
                <p>© {new Date().getFullYear()} Flora Cordeiro Inmobiliaria. Made by Magno IT Systems.</p>
            </div>
        </footer>
    )
}