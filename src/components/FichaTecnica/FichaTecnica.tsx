import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import Image from 'next/image';
import styles from './FichaTecnica.module.css'
import {cactus} from "@/app/ui/fonts";

export default function Ficha() {
    return(
        <main className={styles.page}>
            <div>
                <ContactInformation/>
            </div>

            <div className={styles.mainAdressProperties}>
                <h1>Av. Avellaneda 987</h1>
                <Image
                    src={'/icons/share.png'}
                    alt={'Share Icon'}
                    width={30}
                    height={30}
                />
            </div>

            <div className={styles.mediaCarouselProperties}>
                <Image
                    src={'/backgrounds/fichaBackground.jpg'}
                    alt={'carousel de multimedia de la propiedad'}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className={styles.main}>
                <div className={styles.mainInfo}>
                    <h1>Av. Avellaneda 987</h1>
                    <h1>|</h1>
                    <h1>VENTA</h1>
                </div>
                <div>
                    <button type="button" className={`${styles.askBtn} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                </div>
            </div>

            <div className={styles.cityProperties}>
                <h5>Ciudad de Tandil</h5>
            </div>

            <div className={styles.mainBoxesGridProperties}>
                <div>
                    <DataCard />
                </div>
            </div>

        </main>
    )
}