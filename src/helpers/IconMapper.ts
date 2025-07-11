import { CharacteristicCategory } from '@/types/Property';

// Mapeo de categorías a iconos
export const CHARACTERISTIC_ICON_MAP: Record<CharacteristicCategory, string> = {
    [CharacteristicCategory.SUPERFICIE_TOTAL]: '/icons/area-total.svg',
    [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: '/icons/area-outdoor.svg',
    [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: '/icons/area-semi.svg',
    [CharacteristicCategory.SUPERFICIE_CUBIERTA]: '/icons/area-indoor.svg',
    [CharacteristicCategory.AMBIENTES]: '/icons/rooms.svg',
    [CharacteristicCategory.DORMITORIOS]: '/icons/bedroom.svg',
    [CharacteristicCategory.DORMITORIOS_SUITE]: '/icons/bedroom-suite.svg',
    [CharacteristicCategory.BANOS]: '/icons/bathroom.svg',
    [CharacteristicCategory.COCHERAS]: '/icons/garage.svg',
    [CharacteristicCategory.COBERTURA_COCHERA]: '/icons/garage-roof.svg',
    [CharacteristicCategory.BALCON_TERRAZA]: '/icons/balcony.svg',
    [CharacteristicCategory.EXPENSAS]: '/icons/expenses.svg',
    [CharacteristicCategory.FECHA_EXPENSA]: '/icons/calendar.svg',
    [CharacteristicCategory.AGUA]: '/icons/water.svg',
    [CharacteristicCategory.CANTIDAD_PLANTAS]: '/icons/floors.svg',
    [CharacteristicCategory.TIPO_PISO]: '/icons/floor-type.svg',
    [CharacteristicCategory.ESTADO_INMUEBLE]: '/icons/status.svg',
    [CharacteristicCategory.ORIENTACION]: '/icons/compass.svg',
    [CharacteristicCategory.LUMINOSIDAD]: '/icons/light.svg',
    [CharacteristicCategory.DISPOSICION]: '/icons/layout.svg',
    [CharacteristicCategory.ANTIGUEDAD]: '/icons/age.svg',
    [CharacteristicCategory.UBICACION_CUADRA]: '/icons/location.svg',
    [CharacteristicCategory.OTROS]: '/icons/default.svg'
};

// Función para obtener el icono por categoría
export function getIconByCategory(category: CharacteristicCategory): string {
    return CHARACTERISTIC_ICON_MAP[category] || CHARACTERISTIC_ICON_MAP[CharacteristicCategory.OTROS];
}

// Función para mapear el enum de Prisma al enum de TypeScript
export function mapPrismaCharacteristicCategory(prismaCategory: string | null): CharacteristicCategory {
    switch (prismaCategory) {
        case 'superficie_total':
            return CharacteristicCategory.SUPERFICIE_TOTAL;
        case 'superficie_descubierta':
            return CharacteristicCategory.SUPERFICIE_DESCUBIERTA;
        case 'superficie_semicubierta':
            return CharacteristicCategory.SUPERFICIE_SEMICUBIERTA;
        case 'superficie_cubierta':
            return CharacteristicCategory.SUPERFICIE_CUBIERTA;
        case 'ambientes':
            return CharacteristicCategory.AMBIENTES;
        case 'dormitorios':
            return CharacteristicCategory.DORMITORIOS;
        case 'dormitorios_suite':
            return CharacteristicCategory.DORMITORIOS_SUITE;
        case 'banos':
            return CharacteristicCategory.BANOS;
        case 'cocheras':
            return CharacteristicCategory.COCHERAS;
        case 'cobertura_cochera':
            return CharacteristicCategory.COBERTURA_COCHERA;
        case 'balcon_terraza':
            return CharacteristicCategory.BALCON_TERRAZA;
        case 'expensas':
            return CharacteristicCategory.EXPENSAS;
        case 'fecha_expensa':
            return CharacteristicCategory.FECHA_EXPENSA;
        case 'agua':
            return CharacteristicCategory.AGUA;
        case 'cantidad_plantas':
            return CharacteristicCategory.CANTIDAD_PLANTAS;
        case 'tipo_piso':
            return CharacteristicCategory.TIPO_PISO;
        case 'estado_inmueble':
            return CharacteristicCategory.ESTADO_INMUEBLE;
        case 'orientacion':
            return CharacteristicCategory.ORIENTACION;
        case 'luminosidad':
            return CharacteristicCategory.LUMINOSIDAD;
        case 'disposicion':
            return CharacteristicCategory.DISPOSICION;
        case 'antiguedad':
            return CharacteristicCategory.ANTIGUEDAD;
        case 'ubicacion_cuadra':
            return CharacteristicCategory.UBICACION_CUADRA;
        default:
            return CharacteristicCategory.OTROS;
    }
}