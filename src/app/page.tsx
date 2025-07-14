import styles from "./page.module.css";
import { cactus } from "@/app/(views)/ui/fonts";
import HomeF from "@/components/Home/Home";
import FilterGroup from "@/components/FilterButtons/FilterGroup";
import BigCardsGrid from "@/components/BigCards/BigCardsGrid";
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
    const filtrosTipoPropiedad = [
        "Departamentos",
        "Lotes",
        "Casas", 
        "Locales",
        "Campos",
    ];
    
    return (
        <div className={`${styles.page} ${cactus.className} ${styles.container}`}>
            <HomeF />

            <div className={styles.presentationProperties}>
                <h1>Tu próxima propiedad, nuestra prioridad</h1>
                <h5>
                    Combinamos experiencia, compromiso y un trato cercano para ayudarte a encontrar el lugar que estás
                    buscando. Ya sea que quieras comprar, vender o alquilar, te acompañamos en cada paso con
                    asesoramiento personalizado y total transparencia. Descubrí una nueva forma de hacer negocios
                    inmobiliarios, centrada en vos.
                </h5>

                <div className={styles.messageButtonProperties}>
                    <Link href={"https://wa.me/2494025527"} className={styles.linkProperties}>
                        <button className={`${styles.messageBtn} ${cactus.className}`}>Enviar un mensaje
                        </button>
                    </Link>
                </div>

                <div>
                    <FilterGroup
                        title=""
                        filters={filtrosTipoPropiedad}
                    />
                </div>

                <div>
                    <Suspense fallback={<div>Cargando propiedades...</div>}>
                        <BigCardsGrid />
                    </Suspense>
                </div>

                <div className={styles.mainCardsGridProperties}>
                    <Link href={"/propiedades"} className={styles.linkProperties}>
                        <button className={`${styles.allPropertiesBtn} ${cactus.className}`}>Ver todas las propiedades
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}