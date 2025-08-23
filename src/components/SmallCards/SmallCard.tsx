import Image from "next/image";
import styles from './SmallCard.module.css';
import Link from "next/link";

type PropertyImage = {
    id: number;
    imageUrl: string[];
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

    const showLabel =
        property.rentOrSale === "VENDIDA" ||
        property.rentOrSale === "ALQUILADA" ||
        property.rentOrSale === "Alquilada" ||
        property.rentOrSale === "alquilada" ||
        property.rentOrSale === "Vendida" ||
        property.rentOrSale === "vendida"
    ;

    return (
        <article className={styles.card}>
            {showLabel && <div className={styles.addedLabel}>{property.rentOrSale}</div>}

            <Link href={`/propiedades/ficha/${property.id}`}>
            <Image
                src={property.imageUrl[0]}
                alt={`Imagen de la propiedad en ${property.address}`}
                fill
                className={styles.cardImage}
            />
            </Link>
            <div className={styles.cardOverlay}>
                <h3 className={styles['cardPriceStatus']}>
                    USD {formattedPrice} | {property.rentOrSale}
                </h3>
                <h5 className={styles.cardAddress}>
                    {property.address}, {property.city}
                </h5>
                <h6 className={styles.cardFeatures}>
                    {property.features.rooms} ambientes
                </h6>
                <h6 className={styles.cardFeatures}>
                    {property.features.bedrooms} dormitorios | {property.features.bathrooms} baños
                </h6>
            </div>
        </article>
    );
}

export default SmallCard;