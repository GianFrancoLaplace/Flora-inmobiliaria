import styles from "./page.module.css";
import {cactus} from "@/app/ui/fonts";

import PropertyGrid from '@/components/CardsImages/PropertyImagesGrid';
import PropertiesSearchBar from "@/components/features/SearchBar/SearchBar";
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
const loadImages = [
    {
        id: 1,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
    {
        id: 2,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
    {
        id: 3,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
    {
        id: 4,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
    {
        id: 5,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
    {
        id: 6,     imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
        address: 'San Martin 567', city: 'Tandil', state: 'disponible',
        features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
    },
];


export default function Home() {
  return (
      <div className={`${styles.page} ${cactus.className}`}>
          <div className={styles.navImageProperties}>
              <PropertiesSearchBar/>
          </div>


          <div className={styles.presentationProperties}>
              <h1>Tu próxima propiedad, nuestra prioridad</h1>
              <h5>
                  Combinamos experiencia, compromiso y un trato cercano para ayudarte a encontrar el lugar que estás
                  buscando. Ya sea que quieras comprar, vender o alquilar, te acompañamos en cada paso con
                  asesoramiento personalizado y total transparencia. Descubrí una nueva forma de hacer negocios
                  inmobiliarios, centrada en vos.
              </h5>

              <div className={styles['properties-layout']}>

                  <FiltersSidebar />


                  <main className={styles['properties-layout__main-content']}>
                      <PropertyGrid properties={loadImages} />
                  </main>
              </div>

              <button className={`${styles.messageBtn} ${cactus.className}`}>Enviar un mensaje</button>
          </div>



          <div className={styles.mainCardsGridProperties}>
              <div>
                  <p>cardsGrid</p>
              </div>
              <button className={`${styles.allPropertiesBtn} ${cactus.className}`}>Ver todas las propiedades</button>
          </div>
      </div>
  );
}