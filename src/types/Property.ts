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
    SALE = "EN VENTA",
    SOLD = "VENDIDA",
    RENT = "EN ALQUILER",
    RENTED = "ALQUILADA"
}

export enum PropertyType {
    HOME = "HOME",
    APARTMENT = "APARTMENT",
    FIELD = "FIELD",
    COMMERCIAL = "COMMERCIAL",
    LAND = "LAND"
}