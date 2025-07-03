import styles from './BigCard.module.css'
import {cactus} from "@/app/(views)/ui/fonts";
import BigCard from "@/components/BigCards/BigCard";
import Link from "next/link";
import React from "react";

export default function BigCardsGrid() {
    return(
        <main className={`${styles.grid} ${cactus.className}`}>
            {/*
            <div
                className={styles.messageButtonProperties}>
                <Link href={"https://wa.me/2494025527"} className={styles.linkProperties}>
                    <button className={`${styles.messageBtn} ${cactus.className}`}>Enviar un mensaje
                    </button>
                </Link>
            </div>
            */}

            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />
            <BigCard
                imageSrc={"/backgrounds/fichaBackground.jpg"}
                price={300000}
                transaction={"VENTA"}
                adress={"San Martin 333"}
                city={"Tandil"}
                rooms={6}
                dorms={3}
                bathrooms={2}
            />

            {/*
            <div className={`${styles.mainCardsGridProperties} ${isHome ? styles.viewButton : styles.notViewButton}`}>
                <Link href={"/Propiedades"} className={styles.linkProperties}>
                    <button className={`${styles.allPropertiesBtn} ${cactus.className}`}>Ver todas las propiedades
                    </button>
                </Link>
            </div>
            */}

        </main>
    )
}