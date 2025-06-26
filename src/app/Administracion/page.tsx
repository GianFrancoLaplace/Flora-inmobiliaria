'use client';
import Admns from '@/components/Administracion/Administration'
import ContactInformation from '@/components/features/ContactInformation/ContactInformation'
import { useState } from 'react';
import '../ui/fonts'
import styles from './adminStyles.module.css';
import UnifiedFilter from '@/components/FilterPropertiesAdmin/UnifiedFilter';


export default function FichaPropiedad() {
  const [maxValue, setMaxValue] = useState("");

  // Opciones de filtros
  const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
  const filtrosTipoPropiedad = [
    "Casas",
    "Departamentos",
    "Locales",
    "Lotes",
    "Campos",
  ];


  // Handler para input
  function handleMaxValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxValue(e.target.value);
  }

  return (
    <div>
      <main>
        <ContactInformation />
      </main>
      <br />
      <div>
        <div className={styles['properties-layout-filter']}>
          <div className={styles['properties-layout__filters']}>
            <UnifiedFilter
              maxValue={maxValue}
              onMaxValueChange={handleMaxValueChange}
              filtrosOperacion={filtrosTipoTransaccion}
              filtrosPropiedad={filtrosTipoPropiedad}
            />
          </div>

          <div className={styles['container-content-right']}>
            <Admns />
          </div>
        </div>


      </div>
    </div>
  );
}