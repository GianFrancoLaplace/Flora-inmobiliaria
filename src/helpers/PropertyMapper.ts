import { PropertyState, PropertyType } from "@/types/Property";

export function mapOperationToState(operation: string): PropertyState {
  switch (operation) {
    case 'venta':
      return PropertyState.SALE;
    case 'alquiler':
      return PropertyState.RENT;
    default:
      return PropertyState.SALE;
  }
}

export function mapPropertyType(type: string): PropertyType {
  switch (type) {
    case 'casa':
      return PropertyType.HOME;
    case 'departamento':
      return PropertyType.APARTMENT;
    case 'campo':
      return PropertyType.FIELD;
    case 'duplex':
      return PropertyType.DUPLEX;
    case 'local_comercial':
      return PropertyType.COMMERCIAL;
    case 'lote':
      return PropertyType.LAND;
    default:
      return PropertyType.HOME; // valor por defecto o error si querés ser estricta
  }
}