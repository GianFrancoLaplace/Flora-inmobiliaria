import styles from './Footer.module.css';
import Image from "next/image";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
                <h2>Redes Sociales</h2>
                <div className={styles.footerImgContent}>
                    <Image
                        src={'/redes/instagram.png'}
                        alt={'instagram logo (social media)'}
                        width={30}
                        height={30}
                    />
                    <h5>floracordeiro_inmobiliaria</h5>
                </div>
                <div className={styles.footerImgContent}>
                    <Image
                        src={'/redes/facebook.png'}
                        alt={'facebook logo (social media)'}
                        width={30}
                        height={30}
                    />
                    <h5>Flora Cordeiro Inmobiliaria</h5>
                </div>
                <div className={styles.footerImgContent}>
                    <Image
                        src={'/redes/gmail.png'}
                        alt={'gmail logo (social media)'}
                        width={30}
                        height={30}
                    />
                    <h5>floracordeiroinmobiliaria@gmail.com</h5>
                </div>
            </div>

            <div className={styles.footerSection}>
                <h2>Contacto</h2>
                <h5 className={styles.footerImgContent}>2494 11-2233</h5>
                <h5 className={styles.footerImgContent}>Alsina 421, Tandil.</h5>
            </div>

            <div className={styles.footerSectionDif}>
                <Image
                    src={'/logos/footerLogo.png'}
                    alt={'minimalist inmobiliaria yellow logo'}
                    width={200}
                    height={120}
                />
            </div>
        </footer>
    )
}