'use client';
import SmallCard from "@/components/SmallCards/SmallCard";
import styles from './SmallCardsGrid.module.css';
import Link from "next/link";
import {cactus} from "@/app/ui/fonts";
import React from "react";
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();
    const isHome = pathname === '/';
    return (
        <div className={styles.cardsProperties}>

            <div className={`${styles.messageButtonProperties} ${isHome ? styles.viewButton : styles.notViewButton}`}>
                <Link href={"https://wa.me/2494025527"} className={styles.linkProperties}>
                    <button className={`${styles.messageBtn} ${cactus.className}`}>Enviar un mensaje</button>
                </Link>
            </div>

            <div className={styles['property-grid']}>
                {properties.map((property) => (
                    <SmallCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>

            <div className={`${styles.mainCardsGridProperties} ${isHome ? styles.viewButton : styles.notViewButton}`}>
                <Link href={"/Propiedades"} className={styles.linkProperties}>
                    <button className={`${styles.allPropertiesBtn} ${cactus.className}`}>Ver todas las propiedades</button>
                </Link>
            </div>

        </div>
    );
};

export default PropertyGrid;