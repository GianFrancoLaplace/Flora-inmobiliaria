'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";
import Image from 'next/image'
import {cactus} from "@/app/(views)/ui/fonts";

export default function PropertiesSearchBar() {

    const router = useRouter();

    const [selectedType, setSelectedType] = useState('buy');
    const [searchTerm, setSearchTerm] = useState('');
    const searchMock = ["A1", "B2", "C3"] ;

    const operationTypes = [
        { id: 'buy', label: 'Quiero comprar' },
        { id: 'rent', label: 'Quiero alquilar' },
        { id: 'sell', label: 'Quiero vender' }
    ];

    const handleSearch = () => {
        console.log(`Buscando: ${searchTerm} para ${selectedType}`);
        // Aquí iría la lógica de búsqueda
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.searcher}>
            {/* Botonera de tipo de operación */}
            <div className={styles.buttonGroup}>
                {operationTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => {
                            setSelectedType(type.id);
                            if (type.id === 'sell') {
                                router.push('/QuieroVender');
                            }
                        }}
                        className={`
                            ${cactus.className}
                            ${styles.button}
                            ${selectedType === type.id ? styles.buttonActive : ''}
                        `}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            {/* Contenedor de búsqueda */}
            <div className={styles.searchContainer}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Buscá por barrio o calle"
                        className={styles.input}
                        aria-label="Campo de búsqueda de propiedades"
                    />
                    {searchTerm && (
                        <div className={styles.preview}>
                            <p className={styles.previewText}>
                                {searchTerm}
                            </p>
                            {searchMock.map(item => (
                                <p className={styles.previewText} key={item}>
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSearch}
                    className={styles.searchButton}
                    aria-label="Buscar propiedades"
                >
                    <Image
                        src="/icons/search.png"
                        alt="search icon"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
}