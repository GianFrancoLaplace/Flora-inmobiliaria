import styles from './WhatsAppRedirection.module.css'
import Image from "next/image";

export default function WhatsAppRedirection() {
    return (
        <div className={styles.wpButton}>
            <Image
                src={'/redes/wpRedirect.png'}
                alt={'whatsapp redirection'}
                width={72}
                height={66}
            />
        </div>
    )
}