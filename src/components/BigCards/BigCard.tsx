import styles from './BigCard.module.css'
import {cactus} from "@/app/ui/fonts";
import Image from 'next/image';

export default function BigCard() {
    return(
        <main className={`${styles.page} ${cactus.className}`}>
            <Image
                src={'/backgrounds/fichaBackground.jpg'}
                alt={'imagen propiedad'}
                fill
                className={styles.cardBackground}
            />
            <div className={styles.detailsProperties}>
                <h3>USD 340.000 | VENTA</h3>
                <div>
                    <h5>San Martin 999, Tandil</h5>
                    <h6>7 ambientes | 3 dormitorios | 2 baños</h6>
                </div>
            </div>
        </main>
    )
}