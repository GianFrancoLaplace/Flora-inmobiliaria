export interface Property {
    id: number;
    address: string;
    city: string;
    state: PropertyState;
    price: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    squareMeters: number;
    type: PropertyType;
}

export enum PropertyState {
    SALE = "EN VENTA",
    SOLD = "VENDIDA",
    RENT = "EN ALQUILER",
    RENTED = "ALQUILADA"
}

export enum PropertyType {
    HOME = "HOME"
}

export type PropertyMode = 'view' | 'create' | 'edit';
export type EditableFields = Record<keyof Property, boolean>;