"use client";
import { Suspense } from 'react';
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
    <Suspense fallback={<div>Cargando administración...</div>}>
      <div className={styles.container}>
        {/*<div className="mt-4">
              <SignOutButton />
          </div>*/}
        <main>
          <Suspense fallback={<div>Cargando filtros...</div>}>
            <ContactInformation />
          </Suspense>
        </main>
        <br />
        <div>
          <div className={styles.propertiesLayoutFilter}>
            <div className={styles.propertiesLayoutFilters}>
              <Suspense fallback={<div>Cargando filtros...</div>}>
                <UnifiedFilter
                  maxValue={maxValue}
                  onMaxValueChange={handleMaxValueChange}
                  filtrosOperacion={filtrosTipoTransaccion}
                  filtrosPropiedad={filtrosTipoPropiedad}
                />
              </Suspense>
            </div>

            <div className={styles.containerContentRight}>
              <Suspense fallback={<div>Cargando admin...</div>}>
                <Admns />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
