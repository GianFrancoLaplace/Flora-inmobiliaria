import { CharacteristicCategory } from '@/types/Characteristic';

// Mapeo de categorías a iconos
export const CHARACTERISTIC_ICON_MAP: Record<CharacteristicCategory, string> = {
    [CharacteristicCategory.SUPERFICIE_TOTAL]: '/icons/sup.png',
    [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: '/icons/supDesc.png',
    [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: '/icons/sup.png', //a chequear porque no estoy segura cual es
    [CharacteristicCategory.SUPERFICIE_CUBIERTA]: '/icons/supCub',
    [CharacteristicCategory.AMBIENTES]: '/icons/ambiente.png',
    [CharacteristicCategory.DORMITORIOS]: '/icons/dorms.png',
    [CharacteristicCategory.DORMITORIOS_SUITE]: '/icons/suite.png',
    [CharacteristicCategory.BANOS]: '/icons/baños.png',
    [CharacteristicCategory.COCHERAS]: '/icons/cochera.png',
    [CharacteristicCategory.COBERTURA_COCHERA]: '/icons/cobertura.png',
    [CharacteristicCategory.BALCON_TERRAZA]: '/icons/balcon.png',
    [CharacteristicCategory.EXPENSAS]: '/icons/expensas.png',
    [CharacteristicCategory.FECHA_EXPENSA]: '/icons/fecha.png',
    [CharacteristicCategory.AGUA]: '/icons/agua.png',
    [CharacteristicCategory.CANTIDAD_PLANTAS]: '/icons/plantas.png',
    [CharacteristicCategory.TIPO_PISO]: '/icons/piso.png',
    [CharacteristicCategory.ESTADO_INMUEBLE]: '/icons/estado.png',
    [CharacteristicCategory.ORIENTACION]: '/icons/orientacion.png',
    [CharacteristicCategory.LUMINOSIDAD]: '/icons/luminosidad.png',
    [CharacteristicCategory.DISPOSICION]: '/icons/disposicion.png',
    [CharacteristicCategory.ANTIGUEDAD]: '/icons/antiguedad.png',
    [CharacteristicCategory.UBICACION_CUADRA]: '/icons/ubi.png',
    [CharacteristicCategory.OTROS]: '/icons/estado.png'
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