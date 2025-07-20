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
                return this.validateTotalSurface(input);

            case CharacteristicCategory.SUPERFICIE_DESCUBIERTA:
                return this.validateOpenSurface(input);

            case CharacteristicCategory.SUPERFICIE_SEMICUBIERTA:
                return this.validateSemiOpenSurface(input);

            case CharacteristicCategory.SUPERFICIE_CUBIERTA:
                return this.validateCoveredSurface(input);

            case CharacteristicCategory.AMBIENTES:
                return this.validateRooms(input);

            case CharacteristicCategory.DORMITORIOS:
                return this.validateBedrooms(input);

            case CharacteristicCategory.DORMITORIOS_SUITE:
                return this.validateBedroomSuites(input);

            case CharacteristicCategory.BANOS:
                return this.validateBathrooms(input);

            case CharacteristicCategory.COCHERAS:
                return this.validateGarages(input);

            case CharacteristicCategory.COBERTURA_COCHERA:
                return this.validateGarageCoverage(input);

            case CharacteristicCategory.BALCON_TERRAZA:
                return this.validateBalconyTerrace(input);

            case CharacteristicCategory.EXPENSAS:
                return this.validateMaintenanceDate(input);

            case CharacteristicCategory.FECHA_EXPENSA:
                return this.validateMaintenanceDate(input);

            case CharacteristicCategory.AGUA:
                return this.validateWaterSupply(input);

            case CharacteristicCategory.CANTIDAD_PLANTAS:
                return this.validateFloorCount(input);

            case CharacteristicCategory.TIPO_PISO:
                return this.validateFloorType(input);

            case CharacteristicCategory.ESTADO_INMUEBLE:
                return this.validatePropertyCondition(input);

            case CharacteristicCategory.ORIENTACION:
                return this.validateOrientation(input);

            case CharacteristicCategory.LUMINOSIDAD:
                return this.validateLighting(input);

            case CharacteristicCategory.DISPOSICION:
                return this.validateDisposition(input);

            case CharacteristicCategory.ANTIGUEDAD:
                return this.validateAge(input);

            case CharacteristicCategory.UBICACION_CUADRA:
                return this.validateBlockLocation(input);

            case CharacteristicCategory.OTROS:
                return this.validateOthers(input);

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

    // ================================
    // VALIDACIONES INDIVIDUALES (SIN CONTEXTO CRUZADO)
    // ================================


    private static validateTotalSurface(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 20-10,000 m², tipo integer, no negativo
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('La superficie total debe ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const totalSurface = input.value_integer!;

        // Validar rango válido: 20m² - 10,000m² REVISAR!!!
        if (totalSurface < 20) {
            result.errors.push('La superficie total mínima es de 20 m²');
            result.isValid = false;
        }

        if (totalSurface > 10000) {
            result.errors.push('La superficie total máxima es de 10,000 m²');
            result.isValid = false;
        }

        // Validar que sea entero (no decimal)
        if (!Number.isInteger(totalSurface)) {
            result.errors.push('La superficie total debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateOpenSurface(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateSemiOpenSurface(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateCoveredSurface(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ superficie total, tipo integer, suma coherente con otras superficies
        return { isValid: true, errors: [] };
    }

    private static validateRooms(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-15, tipo integer, ≥ dormitorios, coherencia con superficie
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('Los ambientes deben ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const roomsCount = input.value_integer!;

        // Validar rango válido: 1-15
        if (roomsCount < 1 || roomsCount > 15) {
            result.errors.push('El número de ambientes debe estar entre 1 y 15');
            result.isValid = false;
        }

        // Validar que sea entero
        if (!Number.isInteger(roomsCount)) {
            result.errors.push('El número de ambientes debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateBedrooms(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-8, tipo integer, coherencia con superficie (min 15m² por dormitorio)
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('Los dormitorios deben ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const bedroomsCount = input.value_integer!;

        // Validar que sea positivo
        if (bedroomsCount <= 0) {
            result.errors.push('El número de dormitorios debe ser mayor a 0');
            result.isValid = false;
        }

        // Validar rango válido: 1-8
        if (bedroomsCount < 1 || bedroomsCount > 8) {
            result.errors.push('El número de dormitorios debe estar entre 1 y 8');
            result.isValid = false;
        }

        // Validar que sea entero
        if (!Number.isInteger(bedroomsCount)) {
            result.errors.push('El número de dormitorios debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateBedroomSuites(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, ≤ total dormitorios, tipo integer
        return { isValid: true, errors: [] };
    }

    private static validateBathrooms(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-6, tipo integer
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('Los baños deben ser un valor numérico');
            result.isValid = false;
            return result;
        }

        const bathroomsCount = input.value_integer!;

        // Validar que sea positivo
        if (bathroomsCount <= 0) {
            result.errors.push('El número de baños debe ser mayor a 0');
            result.isValid = false;
        }

        // Validar rango válido: 1-6
        if (bathroomsCount < 1 || bathroomsCount > 6) {
            result.errors.push('El número de baños debe estar entre 0.5 y 6');
            result.isValid = false;
        }

        if (!Number.isInteger(bathroomsCount)) {
            result.errors.push('El número de baños debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateGarages(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-6, tipo integer, coherencia con superficie total
        return { isValid: true, errors: [] };
    }

    private static validateGarageCoverage(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "cubierta", "semicubierta", "descubierta", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateBalconyTerrace(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar ≥ 0, tipo integer, coherencia con superficie descubierta/semicubierta
        return { isValid: true, errors: [] };
    }

    private static validateMaintenanceFees(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-500,000 pesos, tipo integer, coherencia con precio propiedad
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateMaintenanceDate(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar formato fecha, no futuro, máximo 6 meses atrás, tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateWaterSupply(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "red", "pozo", "tanque", "mixta", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateFloorCount(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-5, tipo integer, coherencia con tipo propiedad
        return { isValid: true, errors: [] };
    }

    private static validateFloorType(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "parquet", "porcelanato", "cerámico", "mármol", "madera", "laminado", "vinílico", "cemento alisado", "alfombra", "baldosa", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validatePropertyCondition(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "excelente", "muy bueno", "bueno", "a refaccionar", tipo text, coherencia con antigüedad
        return { isValid: true, errors: [] };
    }

    private static validateOrientation(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "norte", "sur", "este", "oeste", "noreste", "noroeste", "sureste", "suroeste", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateLighting(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "excelente", "muy buena", "buena", "regular", "escasa", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateDisposition(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "interna", "externa", "mixta", "frente", "contrafrente", tipo text
        // Revisar valores propuestos
        return { isValid: true, errors: [] };
    }

    private static validateAge(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-150 años, tipo integer o text ("a estrenar"), coherencia con estado
        // TODO: Revisar posibilidad de que el campo de ficha pueda detectar números en un texto
        //  o poner un sufijo "años"
        return { isValid: true, errors: [] };
    }

    private static validateBlockLocation(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "esquina", "media cuadra", tipo text
        return { isValid: true, errors: [] };
    }

    private static validateOthers(input: CharacteristicValidationInput): ValidationResult {
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

    private static validateBedroomsSuiteVsTotal(
        charMap: Map<CharacteristicCategory, CharacteristicValidationInput>,
        result: ValidationResult
    ): void {
        const bedrooms = charMap.get(CharacteristicCategory.DORMITORIOS)?.value_integer;
        const bedroomsSuite = charMap.get(CharacteristicCategory.DORMITORIOS_SUITE)?.value_integer;

        if (bedrooms !== undefined && bedroomsSuite !== undefined) {
            if (bedroomsSuite > bedrooms) {
                result.errors.push('Los dormitorios suite no pueden ser más que el total de dormitorios');
                result.isValid = false;
            }
        }
    }
}