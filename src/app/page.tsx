import styles from "./page.module.css";
import { cactus } from "@/app/ui/fonts";
import HomeF from "@/components/Home/Home";
import FilterGroup from "@/components/FilterButtons/filtergroup";
import BigCardsGrid from "@/components/BigCards/BigCardsGrid";

import PropertyGrid from '@/components/SmallCards/SmallCardsGrid';
const FiltersSidebar = () => {
    const filterOptions = ['Campos', 'Departamentos', 'Casas', 'Locales', 'Lotes'];
    return (
        // Se combina el elemento del layout con el bloque del menú
        <aside className={`${styles['properties-layout__sidebar']} ${styles['filter-menu']}`}>
            <h2 className={styles['filter-menu__title']}>Filtrar por inmueble</h2>
            <div>
                {filterOptions.map((filter) => (
                    <div key={filter} className={styles['filter-menu__option']}>
                        <span>{filter}</span>
                        {/* Toggle switch aquí */}
                    </div>
                ))}
            </div>
        </aside>
    );
};


export default function Page() {
    const filtrosTipoPropiedad = [
        "Departamentos",
        "Lotes",
        "Casas",
        "Locales",
        "Campos",
    ];
    return (
        <div className={`${styles.page} ${cactus.className}`}>
            <div>
                <HomeF />
            </div>

            <div className={styles.presentationProperties}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Tu próxima propiedad, nuestra prioridad</h1>
                <h5>
                    Combinamos experiencia, compromiso y un trato cercano para ayudarte a encontrar el lugar que estás
                    buscando. Ya sea que quieras comprar, vender o alquilar, te acompañamos en cada paso con
                    asesoramiento personalizado y total transparencia. Descubrí una nueva forma de hacer negocios
                    inmobiliarios, centrada en vos.
                </h5>
                <div>
                    <FilterGroup
                        title=""
                        filters={filtrosTipoPropiedad}
                        direction="row"
                    />
                </div>

                <div>
                    <BigCardsGrid/>
                </div>

            </div>


        </div>
    );
}