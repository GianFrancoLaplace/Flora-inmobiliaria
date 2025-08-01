'use client';
import Admns from '@/components/Administracion/Administration'
import ContactInformation from '@/components/features/ContactInformation/ContactInformation'
import '../ui/fonts'
import styles from './adminStyles.module.css';
import UnifiedFilter from '@/components/FilterPropertiesAdmin/UnifiedFilter';
import SignOutButton from '@/components/botonSingOut/SignOutButton';
import { useUnifiedFilter } from '@/hooks/GetProperties';

export default function FichaPropiedad() {
  const { maxValue, handleMaxValueChange } = useUnifiedFilter();

  const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
  const filtrosTipoPropiedad = [
    "Casas",
    "Departamentos",
    "Locales",
    "Lotes",
    "Campos",
  ];

  return (
    <div className={styles.container}>
        {/*<div className="mt-4">
            <SignOutButton />
        </div>*/}
      <main>
        <ContactInformation />
      </main>
      <br />
      <div>
        <div className={styles.propertiesLayoutFilter}>
          <div className={styles.propertiesLayoutFilters}>
            <UnifiedFilter
              maxValue={maxValue}
              onMaxValueChange={handleMaxValueChange}
              filtrosOperacion={filtrosTipoTransaccion}
              filtrosPropiedad={filtrosTipoPropiedad}
            />
          </div>

          <div className={styles.containerContentRight}>
            <Admns />
          </div>
        </div>
      </div>
    </div>
  );
}