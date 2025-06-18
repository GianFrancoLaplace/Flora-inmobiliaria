import styles from "./page.module.css";
import {cactus} from "@/app/ui/fonts";
import PropertiesSearchBar from "@/components/features/SearchBar/SearchBar";
import FilterButtons from '@/components/FilterButtons/filterbuttons';

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
              <button className={`${styles.messageBtn} ${cactus.className}`}>Enviar un mensaje</button>
          </div>
          <div>
            <FilterButtons></FilterButtons>
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