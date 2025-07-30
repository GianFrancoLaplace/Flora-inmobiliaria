'use client'

import styles from './characteristicsForm.module.css';
import { useState } from "react";

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

export default function CharacteristicsForm() {
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<SubFeature | null>(null);
    const [inputValue, setInputValue] = useState<string | number>("");

    const handleSubmit = () => {
        const key = selectedSubtype ? `${selectedFeature?.name} - ${selectedSubtype.name}` : selectedFeature?.name;
        const value = inputValue;

        console.log("Resultado a guardar:", {
            key,
            value,
        });
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
        </main>
    );
}
