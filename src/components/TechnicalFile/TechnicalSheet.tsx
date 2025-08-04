'use client';

import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import EditableTextField from '@/components/TechnicalFile/EditableField/EditableTextField'
import EditableSelectField from "@/components/TechnicalFile/EditableField/EditableSelectField";
import EditableNumericField from "@/components/TechnicalFile/EditableField/EditableNumericField";
import EditButton from '@/components/TechnicalFile/EditButton'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/(views)/ui/fonts";
import { Property, PropertyState, PropertyType} from "@/types/Property";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import CarrouselFotos from "./Carrousel/CarrouselFotos";
import Item from "@/components/TechnicalFile/PropertiesItem";
import CharacteristicsForm from "./characteristicsForm/characteristicsForm";
import { useCreateProperty } from "@/hooks/CreateProperty";

import {
    getDataGridCharacteristics,
    getTechnicalSheetCharacteristics,
    CharacteristicCategory
} from "@/components/TechnicalFile/MockCharacteristic";
import useAdminImages from "@/hooks/AdminImages";
import { Characteristic } from "@prisma/client";

type TechnicalSheetProps = {
    mode: 'view' | 'create' | 'edit';
    property: Property | null;
};

type ImageFile = {
    id: string;
    url: string;
    file: File;
};

export default function TechnicalSheet({ mode, property }: TechnicalSheetProps) {
    const router = useRouter();

    const { createProperty, isCreating, status, clearStatus } = useCreateProperty();
    const { createImage } = useAdminImages(); // Usamos createImage directamente

    const initialProperty = property || {
        images: [],
        address: "Dirección",
        characteristics: [],
        city: "Ciudad",
        description: "Descripción",
        id: 0,
        price: 0,
        state: PropertyState.RENT,
        type: PropertyType.HOME,
        ubication: " "
    };

    const [editingField, setEditingField] = useState<string | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(initialProperty);
    const [showForm, setShowForm] = useState(false);
    const [isEditingAll, setIsEditingAll] = useState(false);
    const [isEditingAllP, setIsEditingAllP] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [tempImages, setTempImages] = useState<ImageFile[]>([]);
    const [tempCharacteristics, setTempCharacteristics] = useState<Characteristic[]>([]);


    useEffect(() => {
        if (mode === 'edit') {
            setIsEditingAll(true);
            setIsEditingAllP(true);
        }
    }, [mode]);

    const handleImagesChange = useCallback((newImages: any[]) => {
        if (mode === 'create') {
            setTempImages(newImages);
        } else {
            setLocalProperty(prev => ({
                ...prev,
                images: newImages
            }));
        }
    }, [mode]);

    const handleCharacteristicsChange = useCallback((newCharacteristics: any[]) => {
        if (mode === 'create') {
            setTempCharacteristics(newCharacteristics);
        } else {
            setLocalProperty(prev => ({
                ...prev,
                characteristics: [...(prev.characteristics || []), ...newCharacteristics]
            }));
        }
    }, [mode]);

    const handleCreatePublication = async () => {
    clearStatus();

    if (!localProperty.address || localProperty.address === "Dirección") {
        alert('Por favor, complete la dirección de la propiedad.');
        return;
    }

    if (!localProperty.price || localProperty.price <= 0) {
        alert('Por favor, ingrese un precio válido.');
        return;
    }
    
    // Mapeamos las características a la estructura esperada por el hook.
    // Usamos los nombres de propiedades correctos (camelCase vs snake_case).
    const characteristicsToSend = (tempCharacteristics || [])
        .filter(char => 
            (char.valueText && char.valueText.trim() !== "") || 
            (char.valueInteger !== undefined && char.valueInteger !== null)
        )
        .map(char => ({
            // Mapeo de nombres de propiedades
            id: char.idCharacteristic, // O `char.idCharacteristic` si ese es el campo correcto
            characteristic: char.characteristic,
            
            // Corrección del tipo de `category`: si es null, lo convertimos a undefined
            category: char.category ? String(char.category) : undefined,

            // Conversión de camelCase a snake_case para las propiedades de valor
            value_integer: char.valueInteger,
            value_text: char.valueText,
            
            // Mapeo de data_type
            data_type: char.dataType,
        }));


    const propertyToSend = {
        description: localProperty.description !== "Descripción" ? localProperty.description : "",
        price: localProperty.price,
        type: localProperty.type || PropertyType.HOME,
        category: localProperty.state || PropertyState.RENT,
        address: localProperty.address,
        ubication: localProperty.ubication !== " " ? localProperty.ubication : "",
        city: localProperty.city !== "Ciudad" ? localProperty.city : "",
        characteristics: characteristicsToSend, // Usamos el nuevo arreglo mapeado
        images: []
    };

    console.log('Datos a enviar para crear propiedad:', propertyToSend);

    try {
        const newProperty = await createProperty(propertyToSend);

        if (newProperty && tempImages.length > 0) {
            console.log('Propiedad creada, subiendo imágenes...');
            for (const tempImage of tempImages) {
                await createImage(newProperty.id, tempImage.file);
            }
        }

        if (newProperty) {
            console.log('Propiedad creada exitosamente:', newProperty);
            router.push(`/propiedades/${newProperty.id}`);
        }
    } catch (error) {
        console.error('Error en handleCreatePublication:', error);
    }
};


    const handleUpdatePublication = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        if (!localProperty.address || localProperty.price <= 0) {
            setSubmitStatus({ message: 'Por favor, complete la dirección y el precio.', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`/api/propiedades/${localProperty.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localProperty),
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.errors ? JSON.stringify(result.errors) : 'Ocurrió un error en el servidor.';
                throw new Error(errorMessage);
            }

            setSubmitStatus({ message: '¡Cambios guardados con éxito!', type: 'success' });

            setTimeout(() => {
                router.push(`/propiedades/${localProperty.id}`);
            }, 2000);

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido al guardar los cambios.';
            setSubmitStatus({ message, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveCharacteristic = useCallback((
        category: CharacteristicCategory, // Cambiamos a CharacteristicCategory
        newValue: string
    ) => {
        console.log('Guardando característica:', category, newValue);

        setLocalProperty((prev) => {
            const updatedCharacteristics = prev.characteristics.map((char) =>
                char.category === category // Usamos category en lugar de id
                    ? { ...char, characteristic: String(newValue) }
                    : char
            );

            return {
                ...prev,
                characteristics: updatedCharacteristics,
            };
        });
    }, []);

    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit";

    const handleStartEdit = (fieldName: keyof Property) => {
        console.log(`Iniciando edición de: ${fieldName}`);
        setEditingField(fieldName);
    };

    const handleStartEditHeader = () => setEditingField('address-header');
    const handleStartEditMain = () => setEditingField('address-main');

    const handleSaveField = async (fieldName: keyof Property, value: string | number) => {
        console.log(`Guardando ${fieldName}:`, value);
        setLocalProperty(prev => ({ ...prev, [fieldName]: value }));
        setEditingField(null);
    };

    const handleSaveAddress = async (value: string) => {
        console.log(`Guardando address:`, value);
        setLocalProperty(prev => ({ ...prev, address: value }));
        setEditingField(null);
    };

    const handleCancelEdit = () => {
        console.log(`Cancelando edición`);
        setEditingField(null);
    };

    const currentStatus = isEmptyFile ? status : submitStatus;
    const currentIsSubmitting = isEmptyFile ? isCreating : isSubmitting;

    return (
        <main className={styles.page}>
            <div>
                <ContactInformation />
            </div>

            {currentStatus && (
                <div className={`${styles.statusMessage} ${currentStatus.type === 'success' ? styles.success : styles.error}`}>
                    {currentStatus.message}
                </div>
            )}

            <div className={styles.mainAdressProperties}>
                <div className={`${styles.adressProperties} ${styles.showProperties}`}>
                    <h1>
                        <EditableTextField
                            value={localProperty.address}
                            isEditing={editingField === 'address-header'}
                            type={"text"}
                            onSave={(value) => handleSaveAddress(value)}
                            onCancel={handleCancelEdit}
                            className={styles.inputProperties}
                        />
                    </h1>
                    <EditButton
                        onStartEdit={() => handleStartEditHeader()}
                        onEndEdit={() => handleSaveAddress(localProperty.address)}
                        isEditing={editingField === 'address-header'}
                        show={isEditableFile || isEmptyFile}
                        img={'/icons/iconoEdit.png'}
                    />
                </div>
            </div>

            <div className={styles.mediaCarouselProperties}>
                <CarrouselFotos
                    isEditableFile={isEditableFile}
                    isEmptyFile={isEmptyFile}
                    property={localProperty}
                    onImagesChange={handleImagesChange}
                />
            </div>

            <div className={styles.main}>
                <div className={`${styles.mainInfo}`}>
                    <div className={styles.editProperties}>
                        <h1>
                            <EditableTextField
                                value={localProperty.address}
                                isEditing={editingField === 'address-main'}
                                type={"text"}
                                onSave={(value) => handleSaveAddress(value)}
                                onCancel={handleCancelEdit}
                                className={styles.inputProperties}
                            />
                        </h1>
                        <EditButton
                            onStartEdit={() => handleStartEditMain()}
                            onEndEdit={() => handleSaveAddress(localProperty.address)}
                            isEditing={editingField === 'address-main'}
                            className={styles.editButtonProperties}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconoEdit.png'}
                        />
                        <h1>
                            <span> | </span>
                            <EditableSelectField
                                value={localProperty.state}
                                isEditing={editingField === 'state'}
                                className={styles.inputProperties}
                                onSave={(value) => handleSaveField('state', value)}
                                onCancel={handleCancelEdit}
                                options={[
                                    { value: PropertyState.RENT, label: 'Alquiler' },
                                    { value: PropertyState.SALE, label: 'Venta' }
                                ]}
                            />
                        </h1>
                        <EditButton
                            onStartEdit={() => handleStartEdit('state')}
                            onEndEdit={() => handleSaveField('state', localProperty.state)}
                            isEditing={editingField === 'state'}
                            className={styles.editButtonProperties}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconSelect.png'}
                        />
                    </div>
                </div>

                <div className={styles.buttonsProperties}>
                    <button type="button"
                            className={`${styles.askBtn} ${isEmptyFile || isEditableFile ? styles.notShowProperties : styles.showProperties} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                    <button
                        type="button"
                        onClick={handleCreatePublication}
                        disabled={currentIsSubmitting}
                        className={`${styles.askBtn} ${isEmptyFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}
                    >
                        {currentIsSubmitting ? 'Generando...' : 'Generar publicación'}
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdatePublication}
                        disabled={currentIsSubmitting}
                        className={`${styles.askBtn} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}
                    >
                        {currentIsSubmitting ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                    <button type="button"
                            className={`${styles.askBtn} ${styles.btnSold} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Marcar como vendida/alquilada
                    </button>
                </div>
            </div>

            <div className={styles.mainBoxesGridProperties}>
                <div className={styles.dataGridProperties}>
                    {getDataGridCharacteristics(localProperty).map((characteristic) => {
                        return (
                            <Item
                                key={characteristic.id}
                                imgSrc={characteristic.iconUrl || '/icons/default.png'}
                                label={characteristic.characteristic}
                                characteristic={characteristic}
                                isEditing={isEditingAllP}
                                onSave={handleSaveCharacteristic}
                                id={characteristic.id}
                                type="data" showDeleteButton={false}                            />
                        );
                    })}
                </div>

                <div className={`${isEmptyFile || isEditableFile ? styles.visible : styles.notVisible}`}>
                    <button onClick={() => setIsEditingAllP(!isEditingAllP)} className={styles.editButtonProperties}>
                        {isEditingAllP ? '✔ Guardar' :
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={30}
                                height={30}
                            />}
                    </button>
                </div>
            </div>

            <div className={styles.mainInfoPrice}>
                <div className={`${styles.priceEditionProperties} ${styles.showProperties}`}>
                    <h1>
                        USD <EditableNumericField
                            value={localProperty.price}
                            isEditing={editingField === "price"}
                            className={styles.inputProperties}
                            onSave={(value) => handleSaveField('price', value)}
                            onCancel={handleCancelEdit}
                        />
                    </h1>
                    <EditButton
                        onStartEdit={() => handleStartEdit('price')}
                        onEndEdit={() => handleSaveField('price', localProperty.price)}
                        isEditing={editingField === 'price'}
                        className={styles.editButtonProperties}
                        show={isEditableFile || isEmptyFile}
                        img={'/icons/iconoEdit.png'}
                    />
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
                    <div>
                        <EditButton
                            onStartEdit={() => handleStartEdit('description')}
                            onEndEdit={() => handleSaveField('description', localProperty.description)}
                            isEditing={editingField === 'description'}
                            className={styles.editButtonProperties}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconoEdit.png'}
                        />
                    </div>
                </div>
                <h5 className={`${styles.showProperties}`}>
                    <EditableTextField
                        value={localProperty.description}
                        isEditing={editingField === 'description'}
                        type={"text"}
                        onSave={(value) => handleSaveField('description', value)}
                        onCancel={handleCancelEdit}
                        className={styles.inputProperties}
                    />
                </h5>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.buttonsEditProperties}>
                    <div className={styles.titleProperties}>
                        <h3>Ficha</h3>
                        <div className={`${isEmptyFile || isEditableFile ? styles.visible : styles.notVisible}`}>
                            <button onClick={() => setIsEditingAll(!isEditingAll)} className={styles.editButtonProperties}>
                                {isEditingAll ? '✔ Guardar' : <Image
                                    src={'/icons/iconoEdit.png'}
                                    alt={'Icono para editar'}
                                    width={30}
                                    height={30}
                                />}
                            </button>
                        </div>
                    </div>
                    <div className={`${isEmptyFile || isEditableFile ? styles.visible : styles.notVisible}`}>
                        <button
                            onClick={() => setShowForm(v => !v)}
                            aria-expanded={showForm}
                            aria-controls="characteristics-form"
                            className={styles.buttonShowMoreProperties}
                        >
                            {showForm ? '−' : '+'}
                        </button>
                    </div>
                </div>
                <div>
                    {showForm && (
                        <div>
                            <CharacteristicsForm
                                onCharacteristicsChange={handleCharacteristicsChange}
                                initialCharacteristics={[]}
                                propertyId={localProperty.id}
                            />
                        </div>
                    )}
                    <div className={styles.dataGridProperties}>
                        <div className={styles.sectionProperties}>
                            {getTechnicalSheetCharacteristics(localProperty).map((characteristic) => {
                                return (
                                    <Item
                                        key={characteristic.id}
                                        imgSrc={characteristic.iconUrl || '/icons/default.png'}
                                        label={characteristic.characteristic}
                                        characteristic={characteristic}
                                        isEditing={isEditingAll}
                                        onSave={handleSaveCharacteristic}
                                        id={characteristic.id}
                                        type="item" showDeleteButton={false}                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Ubicación</h3>
                    <div>
                        <EditButton
                            className={styles.editButtonProperties}
                            onStartEdit={() => handleStartEdit('ubication')}
                            onEndEdit={() => handleSaveField('ubication', localProperty.ubication)}
                            isEditing={editingField === 'ubication'}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconoEdit.png'}
                        />
                    </div>
                </div>

                <h5 className={`${styles.showProperties}`}>
                    <EditableTextField
                        value={localProperty.ubication}
                        isEditing={editingField === 'ubication'}
                        type={'text'}
                        onSave={(value) => handleSaveField('ubication', value)}
                        onCancel={handleCancelEdit}
                        className={styles.inputProperties}
                    />
                </h5>
                <div className={styles.mapaInteractivo}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6345.872814972624!2d-59.128316!3d-37.320334!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95911f92a1699e0f%3A0xb7acb39bd2ed6d7!2sMitre%201247%2C%20B7000%20Tandil%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1750441385483!5m2!1ses!2sar"
                        width="1300"
                        height="400"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </main>
    )
}