
import Image from "next/image";
import styles from './PropertyCard.module.css';


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

const PropertyCard = ({ property }: PropertyCardProps) => {
    const formattedPrice = new Intl.NumberFormat('es-AR').format(property.price);

    return (
        <article className={styles.card}>
            <Image
                src={property.imageUrl}
                alt={`Imagen de la propiedad en ${property.address}`}
                fill
                className={styles.card__image}
            />
            <div className={styles.card__overlay}>
                <h3 className={styles['card__price-status']}>
                    USD {formattedPrice} | {property.rentOrSale}
                </h3>
                <h4 className={styles.card__address}>
                    {property.address}, {property.city}
                </h4>
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

export default PropertyCard;