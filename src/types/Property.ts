export interface Property {
    id: number;
    address: string;
    city: string;
    state: PropertyState;
    price: number;
    description: string;
    ubication: string;
    characteristic: Characteristic[]; //usar push para agregar
    type: PropertyType;
}

export enum PropertyState {
    SALE = "EN VENTA",
    SOLD = "VENDIDA",
    RENT = "EN ALQUILER",
    RENTED = "ALQUILADA"
}

export enum PropertyType {
    HOME = "CASA",
    APARTMENT = "DEPARTAMENTO",
    FIELD = "CAMPO",
    DUPLEX = "DUPLEX",
    COMMERCIAL = "LOCAL_COMERCIAL",
    LAND = "LOTE"
}

export interface Characteristic {
    id: number;
    characteristic: string;
    amount: number;
}

export type PropertyMode = 'view' | 'create' | 'edit';
export type EditableFields = Record<keyof Property, boolean>;