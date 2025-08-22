import { CharacteristicCategory, CharacteristicValidationInput } from "@/types/Characteristic";
import { ValidationResult } from "@/types";

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
            case CharacteristicCategory.SUPERFICIE_DESCUBIERTA:
            case CharacteristicCategory.SUPERFICIE_SEMICUBIERTA:
            case CharacteristicCategory.SUPERFICIE_CUBIERTA:
                return this.validateSurface(input);

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

            case CharacteristicCategory.BALCON_TERRAZA:
                return this.validateBalconyTerrace(input);

            case CharacteristicCategory.EXPENSAS:
                return this.validateMaintenanceFees(input);

            case CharacteristicCategory.CANTIDAD_PLANTAS:
                return this.validateFloorCount(input);

            case CharacteristicCategory.TIPO_PISO:
                return this.validateFloorType(input);

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
        console.log("data type: " + input.data_type);
        // if (!input.data_type || !['integer', 'text'].includes(input.data_type)) {
        //     result.errors.push('El tipo de dato debe ser "integer" o "text"');
        // }

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


    private static validateSurface(input: CharacteristicValidationInput): ValidationResult {
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

    private static validateRooms(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-15, tipo integer
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
        // TODO: Validar ≥ 0,  tipo integer
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push("El número de suites debe ser un entero");
            result.isValid = false;
            return result;
        }

        const bedroomsCount = input.value_integer!;

        if (bedroomsCount < 0) {
            result.errors.push("El número de suites no puede ser menor a 0")
            result.isValid = false;
        }

        if (bedroomsCount > 6) {
            result.errors.push("El número de suites no puede ser mayor a 6")
            result.isValid = false;
        }

        if (!Number.isInteger(bedroomsCount)) {
            result.errors.push("El número de suites debe ser un entero");
            result.isValid = false;
        }

        return result;
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

        if (!Number.isInteger(bathroomsCount)) {
            result.errors.push('El número de baños debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateGarages(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-6, tipo integer, coherencia con superficie total
        // Revisar validación de rango y coherencia

        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('Las cocheras deben ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const garages = input.value_integer!;

        if (garages < 0) {
            result.errors.push('El número de cocheras no puede ser negativo');
            result.isValid = false;
        }

        // Validate integer
        if (!Number.isInteger(garages)) {
            result.errors.push('El número de cocheras debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateBalconyTerrace(input: CharacteristicValidationInput): ValidationResult {
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('El balcón/terraza debe ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const surface = input.value_integer!;

        if (surface < 0) {
            result.errors.push('La superficie de balcón/terraza no puede ser negativa');
            result.isValid = false;
        }

        if (!Number.isInteger(surface)) {
            result.errors.push('La superficie de balcón/terraza debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    // Expensas
    private static validateMaintenanceFees(input: CharacteristicValidationInput): ValidationResult {
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('Las expensas deben ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const expenses = input.value_integer!;

        // Validate non-negative (0 is valid)
        if (expenses < 0) {
            result.errors.push('Las expensas no pueden ser negativas');
            result.isValid = false;
        }

        // Validate integer
        if (!Number.isInteger(expenses)) {
            result.errors.push('Las expensas deben ser un número entero');
            result.isValid = false;
        }

        return result;
    }



    private static validateFloorCount(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 1-5, tipo integer, coherencia con tipo propiedad
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'integer') {
            result.errors.push('La cantidad de plantas debe ser un valor numérico entero');
            result.isValid = false;
            return result;
        }

        const floors = input.value_integer!;

        // Validate positive value
        if (floors <= 0) {
            result.errors.push('La cantidad de plantas debe ser mayor a 0');
            result.isValid = false;
        }

        // Validate integer
        if (!Number.isInteger(floors)) {
            result.errors.push('La cantidad de plantas debe ser un número entero');
            result.isValid = false;
        }

        return result;
    }

    private static validateFloorType(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "parquet", "porcelanato", "cerámico", "mármol", "madera", "laminado", "vinílico", "cemento alisado", "alfombra", "baldosa", tipo text
        // Revisar valores propuestos
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'text') {
            result.errors.push('El tipo de piso debe ser un valor de texto');
            result.isValid = false;
            return result;
        }

        return result;
    }


    private static validateAge(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar rango 0-150 años, tipo integer o text ("a estrenar"), coherencia con estado
        // TODO: Revisar posibilidad de que el campo de ficha pueda detectar números en un texto
        //  o poner un sufijo "años"

        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type === 'text') {
            const age = input.value_text!.toLowerCase().trim();
        } else if (input.data_type === 'integer') {
            const years = input.value_integer!;

            if (years < 0) {
                result.errors.push('La antigüedad no puede ser negativa');
                result.isValid = false;
            }

            if (years > 150) {
                result.errors.push('La antigüedad máxima es de 150 años');
                result.isValid = false;
            }

            if (!Number.isInteger(years)) {
                result.errors.push('La antigüedad debe ser un número entero');
                result.isValid = false;
            }
        } else {
            result.errors.push('La antigüedad debe ser integer (años) o text ("a estrenar")');
            result.isValid = false;
        }

        return result;
    }

    private static validateBlockLocation(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar valores válidos: "esquina", "media cuadra", tipo text
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'text') {
            result.errors.push('La ubicación en cuadra debe ser un valor de texto');
            result.isValid = false;
            return result;
        }

        const location = input.value_text!.toLowerCase().trim();
        const validValues = ['esquina', 'media cuadra', 'contrafrente'];

        if (!validValues.includes(location)) {
            result.errors.push(`La ubicación en cuadra debe ser: ${validValues.join(', ')}`);
            result.isValid = false;
        }

        return result;
    }

    private static validateOthers(input: CharacteristicValidationInput): ValidationResult {
        // TODO: Validar longitud máxima 500 caracteres, tipo text, contenido apropiado
        const result: ValidationResult = { isValid: true, errors: [] };

        if (input.data_type !== 'text') {
            result.errors.push('El campo otros debe ser un valor de texto');
            result.isValid = false;
            return result;
        }

        const text = input.value_text!.trim();

        // Validate maximum length
        if (text.length > 500) {
            result.errors.push('El campo otros no puede exceder 500 caracteres');
            result.isValid = false;
        }

        // Validate appropriate content (basic)
        const inappropriateContent = /[<>{}[\]]/;
        if (inappropriateContent.test(text)) {
            result.errors.push('El campo otros contiene caracteres no permitidos');
            result.isValid = false;
        }

        return result;
    }

    // Método utilitario para validaciones cruzadas
    static validateCrossCharacteristics(characteristics: CharacteristicValidationInput[]): ValidationResult {
        // TODO: Implementar validaciones cruzadas entre características
        // - Suma de superficies = superficie total
        // - Coherencia dormitorios vs baños vs superficie
        // - Cocheras vs superficie mínima
        // - Estado vs antigüedad
        const result = { isValid: true, errors: [] };

        if (!characteristics || characteristics.length < 2)
            return result;

        const charMap = new Map<CharacteristicCategory, CharacteristicValidationInput>();
        characteristics.forEach(char => {
            charMap.set(char.category, char);
        });

        this.validateSurfaceSums(charMap, result);

        this.validateBedroomsSuiteVsTotal(charMap, result);

        return result;
    }

    private static validateSurfaceSums(
        charMap: Map<CharacteristicCategory, CharacteristicValidationInput>,
        result: ValidationResult
    ): void {
        const totalSurface = charMap.get(CharacteristicCategory.SUPERFICIE_TOTAL)?.value_integer;
        const coveredSurface = charMap.get(CharacteristicCategory.SUPERFICIE_CUBIERTA)?.value_integer || 0;
        const uncoveredSurface = charMap.get(CharacteristicCategory.SUPERFICIE_DESCUBIERTA)?.value_integer || 0;
        const semiCoveredSurface = charMap.get(CharacteristicCategory.SUPERFICIE_SEMICUBIERTA)?.value_integer || 0;

        if (totalSurface !== undefined) {
            const surfaceSum = coveredSurface + uncoveredSurface + semiCoveredSurface;

            if (surfaceSum > totalSurface) {
                result.errors.push(
                    `La suma de superficies (${surfaceSum} m²) no debe ser mayor a la superficie total (${totalSurface} m²)`
                );
                result.isValid = false;
            }
        }
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