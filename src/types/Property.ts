import { Characteristic } from "@/types/Characteristic";

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
}

export interface Image {
    id_image: number;
    id_property: number;
    url: string;
}

export enum PropertyState {
    SALE = "venta",
    SOLD = "VENDIDA",
    RENT = "alquiler",
    RENTED = "ALQUILADA"
}

export enum PropertyType {
    HOME = "casa",
    APARTMENT = "departamento",
    FIELD = "campo",
    COMMERCIAL = "local_comercial",
    LAND = "lote"
}