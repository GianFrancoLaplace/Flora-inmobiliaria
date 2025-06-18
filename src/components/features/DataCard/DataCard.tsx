import Image from 'next/image';
import styles from './DataCard.module.css'

export default function dataCard() {
    return(
        <main>
            <div className={styles.infoCardProperties}>
                <Image
                    src={'/icons/share.png'}
                    alt={'icono acorde a la informacion proporcionada'}
                    width={20}
                    height={20}
                />
                <h5>Cantidad</h5>
                <h5>Caract. descripta</h5>
            </div>
        </main>
    )
}