export interface Property {
  id: number;
  address: string;         // opcional, porque en Prisma es nullable
  city: string;            // si no existe en BD, mantenelo opcional o quitalo
  state: PropertyState;
  price: number;
  description: string;     // opcional
  ubication: string;       // lo mismo, opcional o sacalo si no está en BD
  characteristics: Characteristic[];  // ojo que en Prisma es plural: characteristics
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