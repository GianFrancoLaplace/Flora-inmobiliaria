// src/helpers/CharacteristicHelper.ts

import { Characteristic, CharacteristicCategory } from '@/types/Characteristic';
import { getIconByCategory } from './IconMapper'; // Asumiendo que IconMapper está en la misma carpeta

// Mapa de categorías a etiquetas legibles. Esta es la pieza que faltaba.
export const CHARACTERISTIC_LABEL_MAP: Record<CharacteristicCategory, string> = {
    [CharacteristicCategory.SUPERFICIE_TOTAL]: 'Superficie Total',
    [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: 'Superficie Descubierta',
    [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: 'Superficie Semicubierta',
    [CharacteristicCategory.SUPERFICIE_CUBIERTA]: 'Superficie Cubierta',
    [CharacteristicCategory.AMBIENTES]: 'Ambientes',
    [CharacteristicCategory.DORMITORIOS]: 'Dormitorios',
    [CharacteristicCategory.DORMITORIOS_SUITE]: 'Dormitorios en Suite',
    [CharacteristicCategory.BANOS]: 'Baños',
    [CharacteristicCategory.COCHERAS]: 'Cocheras',
    [CharacteristicCategory.COBERTURA_COCHERA]: 'Cobertura de Cochera',
    [CharacteristicCategory.BALCON_TERRAZA]: 'Balcón / Terraza',
    [CharacteristicCategory.EXPENSAS]: 'Expensas',
    [CharacteristicCategory.FECHA_EXPENSA]: 'Fecha de Expensas',
    [CharacteristicCategory.AGUA]: 'Tipo de Agua',
    [CharacteristicCategory.CANTIDAD_PLANTAS]: 'Cantidad de Plantas',
    [CharacteristicCategory.TIPO_PISO]: 'Tipo de Piso',
    [CharacteristicCategory.ESTADO_INMUEBLE]: 'Estado del Inmmueble',
    [CharacteristicCategory.ORIENTACION]: 'Orientación',
    [CharacteristicCategory.LUMINOSIDAD]: 'Luminosidad',
    [CharacteristicCategory.DISPOSICION]: 'Disposición',
    [CharacteristicCategory.ANTIGUEDAD]: 'Antigüedad',
    [CharacteristicCategory.UBICACION_CUADRA]: 'Ubicación en la Cuadra',
    [CharacteristicCategory.OTROS]: 'Otros Detalles'
};

/**
 * Toma una característica de la base de datos y la "enriquece" con
 * los datos estáticos (icono y etiqueta) necesarios para la UI.
 * @param characteristic - El objeto de característica de la BD.
 * @returns La característica con iconUrl y un `characteristic` (label) legible.
 */
export function enrichCharacteristic(characteristic: Characteristic): Characteristic {
    const category = characteristic.category;

    if (!category) {
        return {
            ...characteristic,
            iconUrl: getIconByCategory(CharacteristicCategory.OTROS),
        };
    }

    const label = CHARACTERISTIC_LABEL_MAP[category] || 'Característica Desconocida';
    const iconUrl = getIconByCategory(category);

    return {
        ...characteristic,
        characteristic: label, // Sobrescribimos el 'characteristic' con el label legible
        iconUrl: iconUrl,
    };
}