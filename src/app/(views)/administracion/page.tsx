// app/(views)/administracion/page.tsx

"use client";
import { Suspense } from 'react'; // 1. Asegúrate de importar Suspense
import Admns from '@/components/Administracion/Administration';
import ContactInformation from '@/components/features/ContactInformation/ContactInformation';
import '../ui/fonts';
import styles from './adminStyles.module.css';
import UnifiedFilter from '@/components/FilterPropertiesAdmin/UnifiedFilter';
import { useUnifiedFilter } from '@/hooks/GetProperties';


function AdminPageContent() {
  const { maxValue, handleMaxValueChange } = useUnifiedFilter();

  const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
  const filtrosTipoPropiedad = ["Casas", "Departamentos", "Locales", "Lotes", "Campos"];

  return (
      <>
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
      </>
  );
}


export default function FichaPropiedad() {
  return (
      <div className={styles.container}>

        <Suspense fallback={<div>Cargando panel de administración...</div>}>
          <AdminPageContent />
        </Suspense>
      </div>
  );
}