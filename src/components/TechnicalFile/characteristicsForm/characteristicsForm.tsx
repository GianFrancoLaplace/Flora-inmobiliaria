'use client'

import styles from './characteristicsForm.module.css';
import { useState } from "react";
import {CharacteristicCategory, CharacteristicCreate} from "@/types/Characteristic";
import Item from '../PropertiesItem';

type SubFeature = {
    name: string;
    inputType: "number" | "text" | "date";
};

type Feature = {
    name: string;
    inputType: "number" | "text" | "date";
    subtypes?: SubFeature[];
};

//available characteristics
const FEATURES: Feature[] = [
    {
        name: "Superficie",
        inputType: "number",
        subtypes: [
            { name: "Total", inputType: "number" },
            { name: "Cubierta", inputType: "number" },
            { name: "Descubierta", inputType: "number" },
            { name: "Semicubierta", inputType: "number" },
        ],
    },
    {
        name: "Ambientes",
        inputType: "number",
    },
    {
        name: "Dormitorios",
        inputType: "number",
        subtypes: [
            { name: "Total", inputType: "number" },
            { name: "En Suite", inputType: "number" },
        ],
    },
    {
        name: "Baños",
        inputType: "number",
    },
    {
        name: "Cocheras",
        inputType: "number",
        subtypes: [
            { name: "Cantidad", inputType: "number" },
            { name: "Cobertura cochera", inputType: "text" },
        ],
    },
    {
        name: "Balcón/Terraza",
        inputType: "text",
    },
    {
        name: "Expensas",
        inputType: "text",
        subtypes: [
            { name: "Valor", inputType: "number" },
            { name: "Fecha", inputType: "date" },
        ],
    },
    {
        name: "Agua",
        inputType: "text",
    },
    {
        name: "Tipo de piso",
        inputType: "text",
    },
    {
        name: "Estado del inmueble",
        inputType: "text",
    },
    {
        name: "Orientación",
        inputType: "text",
    },
    {
        name: "Luminosidad",
        inputType: "text",
    },
    {
        name: "Disposición",
        inputType: "text",
    },
    {
        name: "Antigüedad",
        inputType: "text",
    },
    {
        name: "Ubicación en la cuadra",
        inputType: "text",
    },
    {
        name: "Cantidad de plantas",
        inputType: "number",
    },
];

//icons map
const ICON_MAP: {
    [p: number]: string;
    [CharacteristicCategory.DORMITORIOS]: string;
    [CharacteristicCategory.BANOS]: string;
    [CharacteristicCategory.ESTADO_INMUEBLE]: string;
    [CharacteristicCategory.COBERTURA_COCHERA]: string;
    [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: string;
    [CharacteristicCategory.AMBIENTES]: string;
    [CharacteristicCategory.BALCON_TERRAZA]: string;
    [CharacteristicCategory.ORIENTACION]: string;
    [CharacteristicCategory.LUMINOSIDAD]: string;
    [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: string;
    [CharacteristicCategory.COCHERAS]: string;
    [CharacteristicCategory.TIPO_PISO]: string;
    [CharacteristicCategory.SUPERFICIE_CUBIERTA]: string;
    [CharacteristicCategory.DORMITORIOS_SUITE]: string;
    [CharacteristicCategory.DISPOSICION]: string;
    [CharacteristicCategory.FECHA_EXPENSA]: string;
    [CharacteristicCategory.CANTIDAD_PLANTAS]: string;
    [CharacteristicCategory.SUPERFICIE_TOTAL]: string;
    [CharacteristicCategory.EXPENSAS]: string;
    [CharacteristicCategory.UBICACION_CUADRA]: string;
    [CharacteristicCategory.AGUA]: string
} = {
    [CharacteristicCategory.SUPERFICIE_TOTAL]: '/icons/sup.png',
    [CharacteristicCategory.SUPERFICIE_CUBIERTA]: '/icons/sup.png',
    [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: '/icons/sup.png',
    [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: '/icons/sup.png',
    [CharacteristicCategory.AMBIENTES]: '/icons/ambiente.png',
    [CharacteristicCategory.DORMITORIOS]: '/icons/dorms.png',
    [CharacteristicCategory.DORMITORIOS_SUITE]: '/icons/dorms.png',
    [CharacteristicCategory.BANOS]: '/icons/baños.png',
    [CharacteristicCategory.COCHERAS]: '/icons/cobertura.png',
    [CharacteristicCategory.COBERTURA_COCHERA]: '/icons/cobertura.png',
    [CharacteristicCategory.BALCON_TERRAZA]: '/icons/balcon.png',
    [CharacteristicCategory.EXPENSAS]: '/icons/expensas.png',
    [CharacteristicCategory.FECHA_EXPENSA]: '/icons/fecha.png',
    [CharacteristicCategory.AGUA]: '/icons/agua.png',
    [CharacteristicCategory.TIPO_PISO]: '/icons/piso.png',
    [CharacteristicCategory.ESTADO_INMUEBLE]: '/icons/estado.png',
    [CharacteristicCategory.ORIENTACION]: '/icons/orientacion.png',
    [CharacteristicCategory.LUMINOSIDAD]: '/icons/luminosidad.png',
    [CharacteristicCategory.DISPOSICION]: '/icons/disposicion.png',
    [CharacteristicCategory.ANTIGÜEDAD]: '/icons/antiguedad.png',
    [CharacteristicCategory.UBICACION_CUADRA]: '/icons/ubi.png',
    [CharacteristicCategory.CANTIDAD_PLANTAS]: '/icons/plantas.png',
};

const getIconForLabel = (label: string): string => {
    const category = CATEGORY_MAP[label];
    // @ts-ignore
    return ICON_MAP[category] || '/icons/supDesc.png';
};


//map
const CATEGORY_MAP: Record<string, CharacteristicCategory> = {
    "Superficie - Total": CharacteristicCategory.SUPERFICIE_TOTAL,
    "Superficie - Cubierta": CharacteristicCategory.SUPERFICIE_CUBIERTA,
    "Superficie - Descubierta": CharacteristicCategory.SUPERFICIE_DESCUBIERTA,
    "Superficie - Semicubierta": CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
    "Ambientes": CharacteristicCategory.AMBIENTES,
    "Dormitorios": CharacteristicCategory.DORMITORIOS,
    "Dormitorios - En Suite": CharacteristicCategory.DORMITORIOS_SUITE,
    "Baños": CharacteristicCategory.BANOS,
    "Cocheras - Cantidad": CharacteristicCategory.COCHERAS,
    "Cocheras - Cobertura cochera": CharacteristicCategory.COBERTURA_COCHERA,
    "Balcón/Terraza": CharacteristicCategory.BALCON_TERRAZA,
    "Expensas - Valor": CharacteristicCategory.EXPENSAS,
    "Expensas - Fecha": CharacteristicCategory.FECHA_EXPENSA,
    "Agua": CharacteristicCategory.AGUA,
    "Tipo de piso": CharacteristicCategory.TIPO_PISO,
    "Estado del inmueble": CharacteristicCategory.ESTADO_INMUEBLE,
    "Orientación": CharacteristicCategory.ORIENTACION,
    "Luminosidad": CharacteristicCategory.LUMINOSIDAD,
    "Disposición": CharacteristicCategory.DISPOSICION,
    "Antigüedad": CharacteristicCategory.ANTIGUEDAD,
    "Ubicación en la cuadra": CharacteristicCategory.UBICACION_CUADRA,
    "Cantidad de plantas": CharacteristicCategory.CANTIDAD_PLANTAS,
};


export default function CharacteristicsForm() {
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<SubFeature | null>(null);
    const [inputValue, setInputValue] = useState<string | number>("");
    const [characteristics, setCharacteristics] = useState<CharacteristicCreate[]>([]);

    //add characteristic
    const handleSubmit = () => {
        if (!selectedFeature) return;

        const fullLabel = selectedSubtype
            ? `${selectedFeature.name} - ${selectedSubtype.name}`
            : selectedFeature.name;

        const category = CATEGORY_MAP[fullLabel] ?? CharacteristicCategory.OTROS;

        const characteristicData: CharacteristicCreate = {
            id: Date.now(), // o podés usar un uuid
            characteristic: fullLabel,
            property_id: 1, // 🔁 Reemplazar por la propiedad real que se esté editando
            data_type:
                selectedSubtype?.inputType === "number" || selectedFeature.inputType === "number"
                    ? "integer"
                    : "text",
            value_integer:
                selectedSubtype?.inputType === "number" || selectedFeature.inputType === "number"
                    ? Number(inputValue)
                    : undefined,
            value_text:
                selectedSubtype?.inputType === "text" || selectedFeature.inputType === "text"
                    ? String(inputValue)
                    : undefined,
            category: category,
            iconUrl: "", // opcional, lo podés manejar después
        };

        console.log("Characteristic creada para guardar:", characteristicData);

        setCharacteristics((prev) => [...prev, characteristicData]);
    };
    //delete characteristic
    const handleDelete = (index: number) => {
        setCharacteristics(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label>
                        <h5>Característica:</h5>
                    </label>
                    <select
                        onChange={(e) => {
                            const feature = FEATURES.find(f => f.name === e.target.value) || null;
                            setSelectedFeature(feature);
                            setSelectedSubtype(null);
                            setInputValue("");
                        }}
                    >
                        <option value="">Seleccionar característica</option>
                        {FEATURES.map((feature) => (
                            <option key={feature.name} value={feature.name}>
                                {feature.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedFeature?.subtypes && (
                    <div className={styles.field}>
                        <label>
                            <h5>Variante:</h5>
                        </label>
                        <select
                            onChange={(e) => {
                                const subtype = selectedFeature.subtypes?.find(s => s.name === e.target.value) || null;
                                setSelectedSubtype(subtype);
                                setInputValue("");
                            }}
                        >
                            <option value="">Seleccionar...</option>
                            {selectedFeature.subtypes.map((sub) => (
                                <option key={sub.name} value={sub.name}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {(selectedFeature || selectedSubtype) && (
                    <div className={styles.field}>
                        <label>
                            <h5>Valor:</h5>
                        </label>
                        <input
                            type={
                                selectedSubtype?.inputType ??
                                selectedFeature?.inputType ??
                                "text"
                            }
                            value={inputValue}
                            onChange={(e) =>
                                setInputValue(
                                    selectedSubtype?.inputType === "number" ||
                                    selectedFeature?.inputType === "number"
                                        ? Number(e.target.value)
                                        : e.target.value
                                )
                            }
                        />
                    </div>
                )}

                <button
                    className={styles.addCharacteristicButton}
                    onClick={handleSubmit}
                >
                    ✔
                </button>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Características agregadas</h2>
                <div className="space-y-2">
                    {characteristics.map((c, index) => (
                        <Item
                            key={index}
                            imgSrc={getIconForLabel(c.characteristic)}
                            label={c.characteristic}
                            characteristic={{
                                id: 0,
                                characteristic: c.characteristic,
                                value_integer: c.value_integer ?? undefined,
                                value_text: c.value_text ?? undefined,
                                data_type: c.value_integer !== null ? 'integer' : 'text',
                            }}
                            isEditing={false}
                            id={index}
                            type="item"
                            onSave={() => {}}
                            onDelete={() => handleDelete(index)} // 👉 le pasás el handler
                        />

                    ))}
                </div>
            </div>

        </main>
    );
}
