export type User = {
    id_admin: number;
    admin_email: string;
    admin_password: string;
};

export interface Property {
  id: number;
  address: string;
  city: string;
  state: PropertyState;
  price: number;
  description: string;
  ubication: string;
  characteristics: Characteristic[];
  type?: PropertyType;
  // addressO: string;
}

export enum PropertyState {
    SALE = "EN VENTA",
    SOLD = "VENDIDA",
    RENT = "EN ALQUILER",
    RENTED = "ALQUILADA"
}

export enum PropertyType {
    HOME = "HOME",
    APARTMENT = "APARTMENT",
    FIELD = "FIELD",
    DUPLEX = "DUPLEX",
    COMMERCIAL = "COMMERCIAL",
    LAND = "LAND"
}

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
    amount: number;
    category?: CharacteristicCategory;
    iconUrl?: string; // URL del icono (opcional pero obligatorio para el get by id)
}

export type PropertyMode = 'view' | 'create' | 'edit';
export type EditableFields = Record<keyof Property, boolean>;