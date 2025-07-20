export enum CharacteristicCategory {
    SUPERFICIE_TOTAL = "superficie_total",
    SUPERFICIE_DESCUBIERTA = "superficie_descubierta",
    SUPERFICIE_SEMICUBIERTA = "superficie_semicubierta",
    SUPERFICIE_CUBIERTA = "superficie_cubierta",
    AMBIENTES = "ambientes",
    DORMITORIOS = "dormitorios",
    DORMITORIOS_SUITE = "dormitorios_suite",
    BANOS = "banos",
    COCHERAS = "cocheras",
    COBERTURA_COCHERA = "cobertura_cochera",
    BALCON_TERRAZA = "balcon_terraza",
    EXPENSAS = "expensas",
    FECHA_EXPENSA = "fecha_expensa",
    AGUA = "agua",
    CANTIDAD_PLANTAS = "cantidad_plantas",
    TIPO_PISO = "tipo_piso",
    ESTADO_INMUEBLE = "estado_inmueble",
    ORIENTACION = "orientacion",
    LUMINOSIDAD = "luminosidad",
    DISPOSICION = "disposicion",
    ANTIGUEDAD = "antiguedad",
    UBICACION_CUADRA = "ubicacion_cuadra",
    OTROS = "otros"
}

export interface Characteristic {
    id: number;
    characteristic: string;
    data_type: 'integer' | 'text';
    value_integer?: number;
    value_text?: string;
    category?: CharacteristicCategory;
    iconUrl?: string; // URL del icono (opcional pero obligatorio para el get by id)
}

export interface CharacteristicValidationInput {
    characteristic: string;
    category: CharacteristicCategory;
    data_type: 'integer' | 'text';
    value_integer?: number;
    value_text?: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}
