'use client'

import styles from './characteristicsForm.module.css';
import { useState } from "react";
import {CharacteristicCategory, CharacteristicCreate} from "@/types/Characteristic";

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
            </div>

            <button
                className={styles.addCharacteristicButton}
                onClick={handleSubmit}
            >
                ✔
            </button>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Características agregadas</h2>
                <ul className="space-y-2">
                    {characteristics.map((c) => (
                        <li key={c.id} className="p-3 border rounded shadow-sm">
                            <strong>{c.characteristic}</strong>
                            {c.category && <span className="ml-2 text-sm text-gray-600">({c.category})</span>}
                            <div>
                                Valor: <span className="font-mono">{c.value_integer ?? c.value_text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
