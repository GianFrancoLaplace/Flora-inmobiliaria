import { useState, useEffect } from 'react';
import styles from './filterPropAdmin.module.css';
import FiltroToggle from '../FilterButtons/FilterButtons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mapOperacionReverse: Record<string, string> = {
      'venta': 'Quiero comprar',
      'alquiler': 'Quiero alquilar'
    };

    const mapPropiedadReverse: Record<string, string> = {
      'casa': 'Casas',
      'departamento': 'Departamentos',
      'local_comercial': 'Locales',
      'lote': 'Lotes',
      'campo': 'Campos'
    };

    const operacionParam = searchParams.get('operacion');
    const tipoParam = searchParams.get('tipo');

    if (operacionParam) {
      const ops = operacionParam.split(',').map(op => mapOperacionReverse[op]).filter(Boolean);
      setActivosOperacion(ops);
    }

    if (tipoParam) {
      const tipos = tipoParam.split(',').map(tp => mapPropiedadReverse[tp]).filter(Boolean);
      setActivosPropiedad(tipos);
    }

  }, [searchParams]);

  useEffect(() => {
    const mapOperacion: Record<string, string> = {
      'Quiero comprar': 'venta',
      'Quiero alquilar': 'alquiler',
    };

    const mapPropiedad: Record<string, string> = {
      Casas: 'casa',
      Departamentos: 'departamento',
      Locales: 'local_comercial',
      Lotes: 'lote',
      Campos: 'campo',
    };

    const operacionValues = activosOperacion.map((op) => mapOperacion[op]).filter(Boolean);
    const tipoValues = activosPropiedad.map((tp) => mapPropiedad[tp]).filter(Boolean);

    const params = new URLSearchParams();

    if (operacionValues.length > 0) {
      params.set('operacion', operacionValues.join(','));
    }
    if (tipoValues.length > 0) {
      params.set('tipo', tipoValues.join(','));
    }

    if (maxValue && maxValue.trim() !== '') {
      params.set('maxValue', maxValue);
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [activosOperacion, activosPropiedad, maxValue, pathname, router]);

  const toggleFiltro = (
    label: string,
    activos: string[],
    setActivos: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div className={styles.unifiedFilterWrapper}>
      <button className={styles.burgerButton} onClick={() => setShowFilters((prev) => !prev)}>
        ☰ Filtrar
      </button>

      <div
        className={`${styles.filterContainer} ${styles.vertical} ${
          showFilters ? styles.show : ''
        }`}
      >
        <div className={styles.flexCol}>
          <label htmlFor="maxValueInput" className={styles.filterSectionTitle}>
            Valor máximo
          </label>
          <div className={styles.inputWithSearchContainer}>
            <input
              id="maxValueInput"
              type="number"
              className={styles.maxValueInput}
              placeholder="Escribe el valor máximo"
              value={maxValue}
              onChange={onMaxValueChange}
              min="0"
            />
            <button className={styles.searchButton} type="button">
              <img
                src="/icons/search.png"
                alt="Buscar"
                className={styles.searchIcon}
              />
            </button>
          </div>
        </div>

        <div className={styles.flexCol}>
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

        <div className={styles.flexCol}>
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
