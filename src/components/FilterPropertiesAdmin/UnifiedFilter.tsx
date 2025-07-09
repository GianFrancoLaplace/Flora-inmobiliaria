// components/UnifiedFilter.tsx
import { useState } from 'react';
import styles from './filterPropAdmin.module.css';
import FiltroToggle from '../FilterButtons/FilterButtons';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  maxValue: string;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filtrosOperacion: string[];
  filtrosPropiedad: string[];
}

const UnifiedFilter: React.FC<Props> = ({
  maxValue,
  onMaxValueChange,
  filtrosOperacion,
  filtrosPropiedad
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activosOperacion, setActivosOperacion] = useState<string[]>([]);
  const [activosPropiedad, setActivosPropiedad] = useState<string[]>([]);

  const toggleFiltro = (
    label: string,
    activos: string[],
    setActivos: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

const router = useRouter();
const pathname = usePathname();

useEffect(() => {
  const mapOperacion: Record<string, string> = {
    "Quiero comprar": "VENTA",
    "Quiero alquilar": "ALQUILER"
  };

  const mapPropiedad: Record<string, string> = {
    "Casas": "Casa",
    "Departamentos": "Departamento",
    "Locales": "Local",
    "Lotes": "Lote",
    "Campos": "Campo"
  };

  const operacionValues = activosOperacion.map(op => mapOperacion[op]).filter(Boolean);
  const tipoValues = activosPropiedad.map(tp => mapPropiedad[tp]).filter(Boolean);

  const params = new URLSearchParams();

  if (operacionValues.length > 0) {
    params.set('operacion', operacionValues.join(','));
  }
  if (tipoValues.length > 0) {
    params.set('tipo', tipoValues.join(','));
  }

  if (maxValue) {
    params.set('maxValue', maxValue);
  }

  // ✅ Redirige a la página actual con filtros aplicados
  router.push(`${pathname}?${params.toString()}`);
}, [activosOperacion, activosPropiedad, maxValue]);

  return (
    <div className={styles['unified-filter-wrapper']}>
      <button className={styles['burger-button']} onClick={() => setShowFilters((prev) => !prev)}>
        ☰ Filtrar
      </button>

      <div className={`${styles['filter-container']} ${styles['vertical']} ${showFilters ? styles['show'] : ''}`}>
        {/* Input valor máximo */}
        <div className={styles['flex-col']}>
          <label htmlFor="maxValueInput" className={styles['filter-section-title']}>
            Valor máximo
          </label>
          <div className={styles['input-with-search-container']}>
            <input
              id="maxValueInput"
              type="number"
              className={styles['max-value-input']}
              placeholder="Escribe el valor máximo"
              value={maxValue}
              onChange={onMaxValueChange}
            />
            <button className={styles['search-button']} type="button">
              <img src="/icons/search.png" alt="Buscar" className={styles['search-icon']} />
            </button>
          </div>
        </div>

        {/* Filtros operación */}
        <div className={styles['flex-col']}>
          <h3>Filtrar por operación</h3>
          {filtrosOperacion.map((item) => (
            <FiltroToggle
              key={item}
              label={item}
              isActive={activosOperacion.includes(item)}
              onToggle={() => toggleFiltro(item, activosOperacion, setActivosOperacion)}
            />
          ))}
        </div>

        {/* Filtros propiedad */}
        <div className={styles['flex-col']}>
          <h3>Filtrar por inmueble</h3>
          {filtrosPropiedad.map((item) => (
            <FiltroToggle
              key={item}
              label={item}
              isActive={activosPropiedad.includes(item)}
              onToggle={() => toggleFiltro(item, activosPropiedad, setActivosPropiedad)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnifiedFilter;
