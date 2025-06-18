import styles from './WhatsAppRedirection.module.css'
import Image from "next/image";
import Link from "next/link";

export default function WhatsAppRedirection() {
    return (
        <div className={styles.wpButton}>
            <Link href="https://wa.me/2494025527">
            <Image
                src={'/redes/wpRedirect.png'}
                alt={'whatsapp redirection'}
                width={72}
                height={66}
            />
            </Link>
        </div>
    )
}