
import Image from "next/image";
import styles from './SmallCard.module.css';
import Link from "next/link";


type PropertyImage = {
    id: number;
    imageUrl: string;
    price: number;
    address: string;
    city: string;
    rentOrSale: string;
    features:{
        rooms: number;
        bedrooms: number;
        bathrooms: number;
    };
};

type PropertyCardProps = {
    property: PropertyImage;
}

const SmallCard = ({ property }: PropertyCardProps) => {
    const formattedPrice = new Intl.NumberFormat('es-AR').format(property.price);

    return (
        <article className={styles.card}>
            <Link href={'/Propiedades/Ficha'}>
            <Image
                src={property.imageUrl}
                alt={`Imagen de la propiedad en ${property.address}`}
                fill
                className={styles.card__image}
            />
            </Link>
            <div className={styles.card__overlay}>
                <h3 className={styles['card__price-status']}>
                    USD {formattedPrice} | {property.rentOrSale}
                </h3>
                <h5 className={styles.card__address}>
                    {property.address}, {property.city}
                </h5>
                <h6 className={styles.card__features}>
                    {property.features.rooms} ambientes
                </h6>
                <h6 className={styles.card__features}>
                    {property.features.bedrooms} dormitorios | {property.features.bathrooms} baños
                </h6>
            </div>
        </article>
    );
}

export default SmallCard;