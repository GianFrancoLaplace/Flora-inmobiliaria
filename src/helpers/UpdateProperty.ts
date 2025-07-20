import {PropertyState, PropertyType} from "@/types/Property";

export interface PropertyUpdateData {
    address?: string;
    city?: string; //Puede haber propiedades de distintas ciudades?
    category?: PropertyState;
    ubication?: string;
    price?: number;
    description?: string;
    type?: PropertyType;
}

export interface CharacteristicUpdateData {
    bedrooms?: number;
    bathrooms?: number;
    squareMeters?: number;
}

export interface ValidationError {
    field: string;
    message: string;
}