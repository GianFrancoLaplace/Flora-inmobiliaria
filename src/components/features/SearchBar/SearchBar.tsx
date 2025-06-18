import React, { useState } from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

export default function PropertiesSearchBar() {
    const [selectedType, setSelectedType] = useState('buy');
    const [searchTerm, setSearchTerm] = useState('');

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
        <div className="properties-searcher">
            {/* Botonera de tipo de operación */}
            <div className="properties-searcher__button-group">
                {operationTypes.map((type, index) => (
                    <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`
                            properties-searcher__button
                            ${selectedType === type.id ? 'properties-searcher__button--active' : ''}
                        `}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            {/* Contenedor de búsqueda */}
            <div className="properties-searcher__search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Busca por barrio o calle"
                    className="properties-searcher__input"
                    aria-label="Campo de búsqueda de propiedades"
                />
                <button
                    onClick={handleSearch}
                    className="properties-searcher__search-button"
                    aria-label="Buscar propiedades"
                >
                    <Search className="properties-searcher__search-icon" />
                </button>
            </div>

            {/* Indicador del tipo seleccionado */}
            <div className="properties-searcher__indicator">
        <span className="properties-searcher__mode-text">
          Modo activo: <span className="properties-searcher__active-mode">{selectedType === 'buy' ? 'comprar' : selectedType === 'rent' ? 'alquilar' : 'vender'}</span>
        </span>
            </div>

            {/* Preview del término de búsqueda */}
            {searchTerm && (
                <div className="properties-searcher__preview">
                    <p className="properties-searcher__preview-text">
                        <span className="properties-searcher__label">Buscando:</span> {searchTerm}
                        <span className="properties-searcher__search-type"> para {selectedType === 'buy' ? 'comprar' : selectedType === 'rent' ? 'alquilar' : 'vender'}</span>
                    </p>
                </div>
            )}
        </div>
    );
}