import styles from "./page.module.css";
import {cactus} from "@/app/ui/fonts";
import HomeF from "@/components/Home/Home";
import FilterButtons from '@/components/FilterButtons/filterbuttons';
import FilterGroup from "@/components/FilterButtons/filtergroup";

export default function Page() {
  return (
      <div className={`${styles.page} ${cactus.className}`}>
          <div>
              <HomeF/>
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
                <FilterGroup direction="row" />
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