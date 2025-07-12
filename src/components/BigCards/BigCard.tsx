import styles from './BigCard.module.css'
import {cactus} from "@/app/(views)/ui/fonts";
import Image from 'next/image';
import Link from "next/link";

type Props = {
    id:number,
    imageSrc: string;
    price: number;
    transaction: string;
    adress: string;
    city: string;
    rooms: number;
    dorms: number;
    bathrooms: number;
};

export default function BigCard({id,imageSrc, price, transaction, adress, city, rooms, dorms, bathrooms}: Props) {
    return(
        <main className={`${styles.page} ${cactus.className}`}>
            <Link href={`/propiedades/ficha/${id}`}>
                <Image
                    src={imageSrc}
                    alt={'imagen propiedad'}
                    fill
                    className={styles.cardBackground}
                />
            </Link>
                <div className={styles.detailsProperties}>
                    <h3>USD {price} | {transaction}</h3>
                    <div>
                        <h5>{adress}, {city}</h5>
                        <h6>{rooms} ambientes | {dorms} dormitorios | {bathrooms} baños</h6>
                    </div>
                </div>

        </main>
    )
}