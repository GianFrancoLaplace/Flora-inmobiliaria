import {ValidationError } from "@/helpers/UpdateProperty";
import {PropertyInput, PropertyState, PropertyType,Property, PropertyUpdateData} from "@/types/Property";
import { CharacteristicCategory, CharacteristicValidationInput } from '@/types/Characteristic';
import { ValidationResult } from "@/types";
import { CharacteristicService } from "@/services/characteristicService";
import { OperationEnum, Prisma } from '@prisma/client';


type CreatePropertyResult =
    | { errors: string[]; property?: undefined }
    | { property: Property; errors?: undefined };




export class PropertyService {
    private rawTipos: string[] | undefined; //defino mis array de operaciones y tipos para los filtros
    private rawOperaciones: string[] | undefined;

    constructor(tipos: string[] | undefined, operaciones: string[] | undefined) {
        this.rawTipos = tipos;
        this.rawOperaciones = operaciones;
    }

    private propertyStateToOperationEnumMap: Record<PropertyState, OperationEnum> = {
    [PropertyState.SALE]: 'venta',
    [PropertyState.SOLD]: 'vendida',
    [PropertyState.RENT]: 'alquiler',
    [PropertyState.RENTED]: 'alquilada',
  };

    private isValidEnumValue(value: string, enumObject: Record<string, string>): boolean { //verifica la validez de un enum
        return Object.values(enumObject).includes(value);
    }

    private parseTipos(): PropertyType[] { //parsear tipos si es necesario para que sean aptos para validaciones
        if (!this.rawTipos) return [];
        return this.rawTipos.filter(tipo => this.isValidEnumValue(tipo, PropertyType)) as PropertyType[];
    }

    private parseOperaciones(): PropertyState[] { //parsear operaciones
        if (!this.rawOperaciones) return [];
        return this.rawOperaciones.filter(op => this.isValidEnumValue(op, PropertyState)) as PropertyState[];
    }


  public buildWhereClause(): Prisma.PropertyWhereInput {
  const tipos = this.parseTipos();
  const operaciones = this.parseOperaciones();

  const filters: Prisma.PropertyWhereInput = {};

  if (tipos.length > 0) {
    filters.type = { in: tipos };
  }

  if (operaciones.length > 0) {
    filters.category = { in: this.mapPropertyStateToOperationEnum(operaciones) };
  }

  return filters;
}


public mapPropertyStateToOperationEnum(states: PropertyState[]): OperationEnum[] {
  return states.map(state => this.propertyStateToOperationEnumMap[state]);
}


    public verifyFields(data: PropertyInput | PropertyUpdateData): ValidationError[] {
        const errors: ValidationError[] = [];

        if (data.address !== undefined) {
            if (typeof data.address !== 'string' || data.address.trim().length === 0) {
                errors.push({
                    field: 'address',
                    message: 'La dirección debe ser un texto válido y no puede estar vacía'
                });
            }

        }
        if (data.city !== undefined) {
            if (typeof data.address !== 'string' || data.address.trim().length === 0) {
                errors.push({
                    field: 'address',
                    message: 'La dirección debe ser un texto válido y no puede estar vacía'
                });
            }
        }

        if (data.state !== undefined) {
            if (!Object.values(PropertyState).includes(data.state)) {
                errors.push({
                    field: 'state',
                    message: 'El estado debe ser: EN VENTA, VENDIDA, EN ALQUILER o ALQUILADA'
                });
            }
        }

        if (data.price !== undefined) {
            if (data.price <= 0) {
                errors.push({
                    field: 'price',
                    message: 'El precio debe ser un número mayor a cero'
                });
            }
        }

        if (data.description !== undefined) {
            if ( data.description.trim().length === 0) {
                errors.push({
                    field: 'description',
                    message: 'La descripción debe ser un texto válido y no puede estar vacía'
                });
            }
        }


        return errors;
    }

    public static validateCharacteristicsByPropertyType(
        propertyType: PropertyType,
        characteristics: CharacteristicValidationInput[]
    ): ValidationResult {
        const result: ValidationResult = { isValid: true, errors: [] };

        // Obtener características prohibidas para este tipo de propiedad
        const prohibitedCharacteristics = this.getProhibitedCharacteristics(propertyType);

        // Verificar cada característica contra las prohibiciones
        characteristics.forEach(characteristic => {
            if (prohibitedCharacteristics.includes(characteristic.category)) {
                result.errors.push(
                    `La característica "${characteristic.category}" no es válida para el tipo de propiedad "${propertyType}"`
                );
                result.isValid = false;
            }
        });

        return result;
    }

    public static validateCompleteProperty(
        propertyType: PropertyType,
        characteristics: CharacteristicValidationInput[]
    ): ValidationResult {
        const consolidatedResult: ValidationResult = { isValid: true, errors: [] };

        // PASO 1: Validar cada característica individualmente
        characteristics.forEach(characteristic => {
            const individualResult = CharacteristicService.validate(characteristic);
            if (!individualResult.isValid) {
                consolidatedResult.errors.push(...individualResult.errors);
                consolidatedResult.isValid = false;
            }
        });

        // PASO 2: Validar coherencia entre características (validaciones cruzadas)
        const crossValidationResult = CharacteristicService.validateCrossCharacteristics(characteristics);
        if (!crossValidationResult.isValid) {
            consolidatedResult.errors.push(...crossValidationResult.errors);
            consolidatedResult.isValid = false;
        }

        // PASO 3: Validar compatibilidad con tipo de propiedad
        const typeCompatibilityResult = this.validateCharacteristicsByPropertyType(propertyType, characteristics);
        if (!typeCompatibilityResult.isValid) {
            consolidatedResult.errors.push(...typeCompatibilityResult.errors);
            consolidatedResult.isValid = false;
        }

        return consolidatedResult;
    }

    // Devuelve un arreglo con todas las caractristicas prohibidas según el tipo
    private static getProhibitedCharacteristics(propertyType: PropertyType): CharacteristicCategory[] {
        switch (propertyType) {
            case PropertyType.LAND:
                // Un lote es terreno sin construcción, por lo que no puede tener:
                // - habitaciones (dormitorios, baños, ambientes)
                // - Características de construcción (cocheras, tipo_piso, cantidad_plantas)
                // - Características de servicios (expensas, agua específica)
                return [
                    CharacteristicCategory.AMBIENTES,
                    CharacteristicCategory.DORMITORIOS,
                    CharacteristicCategory.DORMITORIOS_SUITE,
                    CharacteristicCategory.BANOS,
                    CharacteristicCategory.COCHERAS,
                    CharacteristicCategory.COBERTURA_COCHERA,
                    CharacteristicCategory.SUPERFICIE_CUBIERTA,
                    CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
                    CharacteristicCategory.BALCON_TERRAZA,
                    CharacteristicCategory.TIPO_PISO,
                    CharacteristicCategory.ESTADO_INMUEBLE,
                    CharacteristicCategory.LUMINOSIDAD,
                    CharacteristicCategory.DISPOSICION,
                    CharacteristicCategory.EXPENSAS,
                    CharacteristicCategory.FECHA_EXPENSA,
                    CharacteristicCategory.AGUA,
                    CharacteristicCategory.CANTIDAD_PLANTAS,
                    CharacteristicCategory.ANTIGUEDAD
                ];

            case PropertyType.APARTMENT:
                // Los departamentos son unidades de una sola planta por definición
                return [
                    CharacteristicCategory.CANTIDAD_PLANTAS
                ];

            case PropertyType.COMMERCIAL:
                // Los locales comerciales no son viviendas, por lo que no tienen:
                // - Dormitorios (no se duerme en un local comercial)
                // - Características específicas de vivienda
                return [
                    CharacteristicCategory.DORMITORIOS,
                    CharacteristicCategory.DORMITORIOS_SUITE,
                    CharacteristicCategory.AMBIENTES, // Los locales tienen "espacios" no "ambientes"
                    CharacteristicCategory.BALCON_TERRAZA // Los locales no tienen balcones residenciales
                ];

            case PropertyType.FIELD:
                // Los campos son propiedades rurales sin administración de consorcio
                return [
                    CharacteristicCategory.EXPENSAS,
                    CharacteristicCategory.FECHA_EXPENSA
                ];

            default:
                // Para tipos no reconocidos o para casas, no prohibir ninguna característica
                return [];
        }
    }
}
