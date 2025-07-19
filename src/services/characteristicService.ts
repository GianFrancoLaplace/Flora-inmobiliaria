import { CharacteristicCategory, CharacteristicValidationInput, ValidationResult } from "@/types/Characteristic";

export class CharacteristicService {

    static validate(input: CharacteristicValidationInput): ValidationResult {
        const result: ValidationResult = {
            isValid: false,
            errors: []
        };

        // Validación básica de estructura
        if (!this.validateBasicStructure(input, result)) {
            return result;
        }

        // Validación específica por categoría
        switch (input.category) {
            case CharacteristicCategory.SUPERFICIE_TOTAL:
                return this.validateSuperficieTotal(input);

            case CharacteristicCategory.SUPERFICIE_DESCUBIERTA:
                return this.validateSuperficieDescubierta(input);

            case CharacteristicCategory.SUPERFICIE_SEMICUBIERTA:
                return this.validateSuperficieSemidescubierta(input);

            case CharacteristicCategory.SUPERFICIE_CUBIERTA:
                return this.validateSuperficieCubierta(input);

            case CharacteristicCategory.AMBIENTES:
                return this.validateAmbientes(input);

            case CharacteristicCategory.DORMITORIOS:
                return this.validateDormitorios(input);

            case CharacteristicCategory.DORMITORIOS_SUITE:
                return this.validateDormitoriosSuite(input);

            case CharacteristicCategory.BANOS:
                return this.validateBanos(input);

            case CharacteristicCategory.COCHERAS:
                return this.validateCocheras(input);

            case CharacteristicCategory.COBERTURA_COCHERA:
                return this.validateCoberturaCochera(input);

            case CharacteristicCategory.BALCON_TERRAZA:
                return this.validateBalconTerraza(input);

            case CharacteristicCategory.EXPENSAS:
                return this.validateExpensas(input);

            case CharacteristicCategory.FECHA_EXPENSA:
                return this.validateFechaExpensa(input);

            case CharacteristicCategory.AGUA:
                return this.validateAgua(input);

            case CharacteristicCategory.CANTIDAD_PLANTAS:
                return this.validateCantidadPlantas(input);

            case CharacteristicCategory.TIPO_PISO:
                return this.validateTipoPiso(input);

            case CharacteristicCategory.ESTADO_INMUEBLE:
                return this.validateEstadoInmueble(input);

            case CharacteristicCategory.ORIENTACION:
                return this.validateOrientacion(input);

            case CharacteristicCategory.LUMINOSIDAD:
                return this.validateLuminosidad(input);

            case CharacteristicCategory.DISPOSICION:
                return this.validateDisposicion(input);

            case CharacteristicCategory.ANTIGUEDAD:
                return this.validateAntiguedad(input);

            case CharacteristicCategory.UBICACION_CUADRA:
                return this.validateUbicacionCuadra(input);

            case CharacteristicCategory.OTROS:
                return this.validateOtros(input);

            default:
                result.errors.push('Categoría de característica no válida');
                return result;
        }
    }

    private static validateBasicStructure(
        input: CharacteristicValidationInput,
        result: ValidationResult
    ): boolean {
        if (!input.characteristic || input.characteristic.trim() === '') {
            result.errors.push('El nombre de la característica es requerido');
        }

        if (!input.data_type || !['integer', 'text'].includes(input.data_type)) {
            result.errors.push('El tipo de dato debe ser "integer" o "text"');
        }

        if (input.data_type === 'integer' && (input.value_integer === undefined || input.value_integer === null)) {
            result.errors.push('Se requiere valor numérico para tipo integer');
        }

        if (input.data_type === 'text' && (!input.value_text || input.value_text.trim() === '')) {
            result.errors.push('Se requiere valor de texto para tipo text');
        }

        return result.errors.length === 0;
    }

    private static validateSuperficieTotal(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 20-10,000 m², tipo integer, no negativo
        return { isValid: true, errors: [] };
    }

    private static validateSuperficieDescubierta(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateSuperficieSemidescubierta(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateSuperficieCubierta(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer, suma coherente con otras superficies
        return { isValid: true, errors: [] };
    }

    private static validateAmbientes(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-15, tipo integer, ≥ dormitorios, coherencia con superficie
        return { isValid: true, errors: [] };
    }

    private static validateDormitorios(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-8, tipo integer, coherencia con superficie (min 15m² por dormitorio)
        return { isValid: true, errors: [] };
    }

    private static validateDormitoriosSuite(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ total dormitorios, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateBanos(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-6, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateCocheras(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-6, tipo integer, coherencia con superficie total
        return { isValid: true, errors: [] };
    }

    private static validateCoberturaCochera(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "cubierta", "semicubierta", "descubierta", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateBalconTerraza(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, tipo integer, coherencia con superficie descubierta/semicubierta
        return { isValid: true, errors: [] };
    }

    private static validateExpensas(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-500,000 pesos, tipo integer, coherencia con precio propiedad
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateFechaExpensa(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar formato fecha, no futuro, máximo 6 meses atrás, tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateAgua(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "red", "pozo", "tanque", "mixta", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateCantidadPlantas(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-5, tipo integer, coherencia con tipo propiedad
        return { isValid: true, errors: [] };
    }

    private static validateTipoPiso(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "parquet", "porcelanato", "cerámico", "mármol", "madera", "laminado", "vinílico", "cemento alisado", "alfombra", "baldosa", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateEstadoInmueble(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "excelente", "muy bueno", "bueno", "a refaccionar", tipo text, coherencia con antigüedad
        return { isValid: true, errors: [] };
    }

    private static validateOrientacion(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "norte", "sur", "este", "oeste", "noreste", "noroeste", "sureste", "suroeste", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateLuminosidad(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "excelente", "muy buena", "buena", "regular", "escasa", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateDisposicion(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "interna", "externa", "mixta", "frente", "contrafrente", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateAntiguedad(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-150 años, tipo integer o text ("a estrenar"), coherencia con estado
        // TODO: Revisar posibilidad de que el campo de ficha pueda detectar números en un texto
        //  o poner un sufijo "años"
        return { isValid: true, errors: [] };
    }

    private static validateUbicacionCuadra(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "esquina", "media cuadra", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateOtros(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar longitud máxima 500 caracteres, tipo text, contenido apropiado
        return { isValid: true, errors: [] };
    }

    // Método utilitario para validaciones cruzadas futuras
    static validateCrossCharacteristics(characteristics: CharacteristicValidationInput[]): ValidationResult {
        // TODO: Implementar validaciones cruzadas entre características
        // - Suma de superficies = superficie total
        // - Coherencia dormitorios vs baños vs superficie
        // - Cocheras vs superficie mínima
        // - Estado vs antigüedad
        return { isValid: true, errors: [] };
    }
}