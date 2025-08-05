import {  Property } from "@/types/Property";
import { CharacteristicCategory, Characteristic } from "@/types/Characteristic"

export interface CharacteristicConfig {
    category: CharacteristicCategory;
    label: string;
    icon: string;
    dataType: 'integer' | 'text';
}

export const CHARACTERISTIC_CONFIGS: CharacteristicConfig[] = [
    {
        category: CharacteristicCategory.SUPERFICIE_TOTAL,
        label: 'Superficie Total',
        icon: '/icons/sup.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.SUPERFICIE_DESCUBIERTA,
        label: 'Superficie Descubierta',
        icon: '/icons/supDesc.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
        label: 'Superficie Semidescubierta',
        icon: '/icons/supCub.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.SUPERFICIE_CUBIERTA,
        label: 'Superficie Cubierta',
        icon: '/icons/supCub.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.AMBIENTES,
        label: 'Ambientes',
        icon: '/icons/ambiente.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.DORMITORIOS,
        label: 'Dormitorios',
        icon: '/icons/dorms.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.DORMITORIOS_SUITE,
        label: 'Dormitorios en Suite',
        icon: '/icons/dorms.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.BANOS,
        label: 'Baños',
        icon: '/icons/baños.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.COCHERAS,
        label: 'Cocheras',
        icon: '/icons/cochera.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.COBERTURA_COCHERA,
        label: 'Cobertura cochera',
        icon: '/icons/cobertura.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.EXPENSAS,
        label: 'Expensas',
        icon: '/icons/expensas.png',
        dataType: 'integer',
    },
    {
        category: CharacteristicCategory.AGUA,
        label: 'Fecha de las expensas',
        icon: '/icons/fecha.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.TIPO_PISO,
        label: 'Tipo de piso',
        icon: '/icons/piso.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.ESTADO_INMUEBLE,
        label: 'Estado de inmueble',
        icon: '/icons/estado.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.ORIENTACION,
        label: 'Orientación',
        icon: '/icons/orientacion.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.LUMINOSIDAD,
        label: 'Luminosidad',
        icon: '/icons/luminosidad.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.DISPOSICION,
        label: 'Disposición',
        icon: '/icons/disposicion.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.ANTIGUEDAD,
        label: 'Antiguedad',
        icon: '/icons/antiguedad.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.UBICACION_CUADRA,
        label: 'Ubicación en la cuadra',
        icon: '/icons/ubi.png',
        dataType: 'text',
    },
    {
        category: CharacteristicCategory.CANTIDAD_PLANTAS,
        label: 'Cantidad de plantas',
        icon: '/icons/plantas.png',
        dataType: 'integer',
    },
];

export const createCharacteristicFromCategory = (
    category: CharacteristicCategory,
    property: Property | null
): Characteristic => {
    const config = CHARACTERISTIC_CONFIGS.find(cfg => cfg.category === category);

    if (!config) {
        if (typeof window !== 'undefined') {
            console.warn(`No se encontró configuración para la categoría: ${category}`);
        }
        return {
            id: 0,
            characteristic: category,
            category: category,
            data_type: 'text',
            iconUrl: '/icons/default.png',
            value_text: '',
        };
    }

    const existingChar = property?.characteristics?.find(char => char.category === category);

    if (existingChar) {
        return {
            ...existingChar,
            data_type: config.dataType,
            iconUrl: config.icon,
        };
    }

    const baseCharacteristic: Characteristic = {
        id: 0,
        characteristic: config.label,
        category: category,
        data_type: config.dataType,
        iconUrl: config.icon,
    };

    if (config.dataType === 'integer') {
        return {
            ...baseCharacteristic,
            value_integer: 0,
        };
    } else {
        return {
            ...baseCharacteristic,
            value_text: '',
        };
    }
};

export const getCharacteristicConfig = (category: CharacteristicCategory): CharacteristicConfig | undefined => {
    return CHARACTERISTIC_CONFIGS.find(cfg => cfg.category === category);
};

export const getDataGridCharacteristics = (property: Property | null): Characteristic[] => {
    const dataGridCategories = [
        CharacteristicCategory.BANOS,
        CharacteristicCategory.ANTIGUEDAD,
        CharacteristicCategory.COCHERAS,
        CharacteristicCategory.CANTIDAD_PLANTAS
    ];

    return dataGridCategories.map(category =>
        createCharacteristicFromCategory(category, property)
    );
};

export const getTechnicalSheetCharacteristics = (property: Property | null): Characteristic[] => {
    return CHARACTERISTIC_CONFIGS.map(config =>
        createCharacteristicFromCategory(config.category, property)
    );
};

export const hasValue = (characteristic: Characteristic): boolean => {
    if (characteristic.data_type === 'integer') {
        return characteristic.value_integer !== undefined && characteristic.value_integer !== 0;
    } else {
        return characteristic.value_text !== undefined && characteristic.value_text.trim() !== '';
    }
};

export const getDisplayValue = (characteristic: Characteristic): string | number => {
    if (characteristic.data_type === 'integer') {
        return characteristic.value_integer || 0;
    } else {
        return characteristic.value_text || '';
    }
};

export { CharacteristicCategory };
