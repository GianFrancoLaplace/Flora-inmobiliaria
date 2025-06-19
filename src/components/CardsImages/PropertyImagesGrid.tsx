import PropertyCard from "@/components/CardsImages/PropertyCard";
import styles from './PropertyImagesGrid.module.css';

type Property = {
    id: number;
    imageUrl: string;
    price: number;
    address: string;
    city: string;
    rentOrSale: string;
    state: string;
    features:{
        rooms: number;
        bedrooms: number;
        bathrooms: number;
    };
};

type PropertyGridProps = {
    properties: Property[];
};

const PropertyGrid = ({ properties }: PropertyGridProps) => {
    return (
        <div className={styles['property-grid']}>
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    );
};

export default PropertyGrid;