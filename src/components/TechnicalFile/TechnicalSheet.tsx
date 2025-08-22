"use client"
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import EditableTextField from '@/components/TechnicalFile/EditableField/EditableTextField'
import EditableSelectField from "@/components/TechnicalFile/EditableField/EditableSelectField";
import EditableNumericField from "@/components/TechnicalFile/EditableField/EditableNumericField";
import EditButton from '@/components/TechnicalFile/EditButton'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/(views)/ui/fonts";
import { Property, PropertyState, PropertyType } from "@/types/Property";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import CarrouselFotos from "./Carrousel/CarrouselFotos";
import Item from "@/components/TechnicalFile/PropertiesItem";
import { useUpdateProperty } from "@/hooks/useUpdateProperty"
import { useUpdateCharacteristic } from "@/hooks/useUpdateCharacteristic"
import CharacteristicsForm from "./characteristicsForm/characteristicsForm";
import { useCreateProperty } from "@/hooks/CreateProperty";
import { enrichCharacteristic } from '@/helpers/CharacteristicHelper';
import { useCreateCharacteristic } from '@/hooks/useCreateCharacteristic';
import { Characteristic, CharacteristicCreate } from '@/types/Characteristic';

import useAdminImages from "@/hooks/AdminImages";
import Link from "next/link";

type TechnicalSheetProps = {
    mode: 'view' | 'create' | 'edit';
    property: Property | null;
};

export default function TechnicalSheet({ mode, property }: TechnicalSheetProps) {
    const router = useRouter();

    const { createProperty, isCreating, status, clearStatus } = useCreateProperty();

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
    const encodedAddress = encodeURIComponent(
        localProperty.address || 'Tandil, Buenos Aires, Argentina'
    );
    const [showForm, setShowForm] = useState(false);
    const [isEditingAll, setIsEditingAll] = useState(false);
    //para la edicion
    const { updateProperty } = useUpdateProperty();
    const { updateCharacteristic } = useUpdateCharacteristic();
    const { createCharacteristic } = useCreateCharacteristic();
    const [modifiedCharacteristics, setModifiedCharacteristics] = useState<Map<number, { value_integer?: number; value_text?: string }>>(new Map());

    const [isEditingAllP, setIsEditingAllP] = useState(false);

    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [tempImages, setTempImages] = useState<File[]>([]);
    const [tempCharacteristics, setTempCharacteristics] = useState<Characteristic[]>([]);

    useEffect(() => {
        if (mode === 'edit') {
            setIsEditingAll(true);
            setIsEditingAllP(true);
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSaveCharacteristic = (characteristicId: number, newValue: number | string) => {
        setLocalProperty(prev => {
            if (!prev) return prev;
            const updatedCharacteristics = prev.characteristics.map(char => {
                if (char.id === characteristicId) {
                    return typeof newValue === 'number'
                        ? { ...char, value_integer: newValue }
                        : { ...char, value_text: newValue };
                }
                return char;
            });
            return { ...prev, characteristics: updatedCharacteristics };
        });

        setModifiedCharacteristics(prevMap => {
            const newMap = new Map(prevMap);
            const charToUpdate = localProperty?.characteristics.find(c => c.id === characteristicId);
            if (charToUpdate) {
                newMap.set(characteristicId, {
                    value_integer: typeof newValue === 'number' ? newValue : charToUpdate.value_integer,
                    value_text: typeof newValue === 'string' ? newValue : charToUpdate.value_text,
                });
            }
            return newMap;
        });
    };

    // En TechnicalSheet.tsx
    const handleSaveChanges = async () => {
        if (!localProperty) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        // --- LÓGICA DE SEPARACIÓN ---

        // IDs existentes en DB (los que ya están en localProperty.characteristics)
        const existingIds = new Set<number>((localProperty.characteristics || []).map(c => c.id));

        // Características NUEVAS agregadas desde el formulario en modo edit
        // (están en tempCharacteristics y NO están en los ids existentes)
        const characteristicsToCreate = (tempCharacteristics || []).filter(c => !existingIds.has(c.id));

        // Características EXISTENTES modificadas desde los "Item" de la grilla
        const characteristicsToUpdate = new Map<number, { value_integer?: number; value_text?: string }>();
        modifiedCharacteristics.forEach((data, id) => {
            if (id > 0) {
                characteristicsToUpdate.set(id, data);
            }
        });

        // --- CONSTRUCCIÓN DE LAS PROMESAS ---
        const promises: Promise<any>[] = [];

        // Promesa para actualizar la propiedad principal
        const propertyData = {
            address: localProperty.address,
            city: localProperty.city,
            state: localProperty.state,
            ubication: localProperty.ubication,
            price: localProperty.price,
            description: localProperty.description,
            type: localProperty.type,
        };
        promises.push(updateProperty(localProperty.id, propertyData));

        // Promesas para ACTUALIZAR características existentes
        characteristicsToUpdate.forEach((data, id) => {
            promises.push(updateCharacteristic(id, data));
        });

        // Promesas para CREAR nuevas características
        characteristicsToCreate.forEach(char => {
            // Quitamos id temporal e iconUrl; aseguramos property_id del inmueble actual
            const { id, iconUrl, ...dataToCreate } = char as any;
            promises.push(createCharacteristic({ ...dataToCreate, property_id: localProperty.id }));
        });

        try {
            await Promise.all(promises);

            setSubmitStatus({ message: '¡Todos los cambios se guardaron con éxito!', type: 'success' });
            setModifiedCharacteristics(new Map()); // Limpiamos el registro de cambios

            // Opcional: limpiar temporales para no reintentar crear en el próximo guardado
            // setTempCharacteristics([]);

            router.refresh();

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ocurrió un error al guardar.';
            setSubmitStatus({ message, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCharacteristicsChange = useCallback((newCharacteristics: CharacteristicCreate[]) => {
        // Mantenemos tempCharacteristics porque es clave para CREATE
        // (TS permite asignar CharacteristicCreate[] a Characteristic[] por compatibilidad estructural)
        setTempCharacteristics(newCharacteristics as unknown as Characteristic[]);
    }, []);

    const handleCreatePublication = async () => {
        clearStatus();

        if (!localProperty.address || localProperty.address === "Dirección") {
            alert("Por favor, complete la dirección de la propiedad.");
            return;
        }

        if (!localProperty.price || localProperty.price <= 0) {
            alert("Por favor, ingrese un precio válido.");
            return;
        }

        const cleanedCharacteristics = (tempCharacteristics || [])
            .filter((char) =>
                (char.value_text && String(char.value_text).trim() !== "") ||
                (char.value_integer !== undefined && char.value_integer !== null)
            )
            .map((char) => ({
                characteristic: char.characteristic,
                data_type: char.data_type,
                category: char.category ?? null,
                value_integer: char.value_integer ?? null,
                value_text: char.value_text ?? null,
            }));

        console.log("caracteristicas to send: " + cleanedCharacteristics);

        const propertyToSend = {
            description: localProperty.description !== "Descripción" ? localProperty.description : "",
            price: localProperty.price,
            type: localProperty.type || PropertyType.HOME,
            category: localProperty.state || PropertyState.RENT,
            address: localProperty.address,
            ubication: localProperty.ubication !== " " ? localProperty.ubication : "",
            city: localProperty.city !== "Ciudad" ? localProperty.city : "",
            characteristics: cleanedCharacteristics,
            images: tempImages,
        };

        try {
            const result = await createProperty(propertyToSend);
            if (result?.id) {
                alert("Propiedad creada con éxito ✅");
            } else {
                alert("Ocurrió un error al crear la propiedad.");
            }
        } catch (err) {
            console.error("Error al crear propiedad:", err);
            alert("Error inesperado.");
        }
    };

    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit";

    const handleStartEdit = (fieldName: keyof Property) => {
        console.log(`Iniciando edición de: ${fieldName}`);
        setEditingField(fieldName);
    };

    const handleStartEditHeader = () => setEditingField('address-header');
    const handleStartEditMain = () => setEditingField('address-main');

    const handleSaveField = async (fieldName: keyof Property, value: string | number) => {
        console.log("handle save field");
        console.log(`Guardando ${fieldName}:`, value);
        setLocalProperty(prev => ({ ...prev, [fieldName]: value }));
        console.log(localProperty);
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
                    {(isEmptyFile || isEditableFile) && editingField === 'address-header' ? (
                        <EditableTextField
                            value={localProperty.address}
                            isEditing={true}
                            type={"text"}
                            onSave={(value) => handleSaveAddress(value)}
                            onCancel={handleCancelEdit}
                            className={styles.inputProperties}
                        />
                    ) : (
                        <h1 onClick={() => handleStartEditHeader()}>
                            {localProperty.address}
                        </h1>
                    )}
                    <EditButton
                        onStartEdit={() => handleStartEditHeader()}
                        onEndEdit={() => handleSaveAddress(localProperty.address)}
                        className={styles.editButtonProperties}
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
                        {(isEmptyFile || isEditableFile) && editingField === 'address-main' ? (
                            <EditableTextField
                                value={localProperty.address}
                                isEditing={true}
                                type={"text"}
                                onSave={(value) => handleSaveAddress(value)}
                                onCancel={handleCancelEdit}
                                className={styles.inputProperties}
                            />
                        ) : (
                            <h1 onClick={() => handleStartEditMain()} style={{ cursor: 'pointer' }}>
                                {localProperty.address}
                            </h1>
                        )}
                        <EditButton
                            onStartEdit={() => handleStartEditMain()}
                            onEndEdit={() => handleSaveAddress(localProperty.address)}
                            isEditing={editingField === 'address-main'}
                            className={styles.editButtonProperties}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconoEdit.png'}
                        />
                        <h1 className={styles.operationTypeContainer}>
                            <div className={styles.operationSelect}>
                                <span> | </span>
                                <EditableSelectField
                                    value={localProperty.state}
                                    isEditing={editingField === 'state'}
                                    className={styles.inputProperties}
                                    onSave={(value) => handleSaveField('state', value)}
                                    onCancel={handleCancelEdit}
                                    options={[
                                        { value: PropertyState.RENT, label: 'Alquiler' },
                                        { value: PropertyState.SALE, label: 'Venta' },
                                        { value: PropertyState.SOLD, label: 'Vendida' },
                                        { value: PropertyState.RENTED, label: 'Alquilada' }
                                    ]}
                                />
                                <EditButton
                                    onStartEdit={() => handleStartEdit('state')}
                                    onEndEdit={() => handleSaveField('state', localProperty.state)}
                                    isEditing={editingField === 'state'}
                                    className={styles.editButtonProperties}
                                    show={isEditableFile || isEmptyFile}
                                    img={'/icons/iconSelect.png'}
                                />
                            </div>

                            <div className={styles.typeSelect}>
                                <span> | </span>
                                <EditableSelectField
                                    value={localProperty.type ?? ""}
                                    isEditing={editingField === 'type'}
                                    className={styles.inputProperties}
                                    onSave={(value) => handleSaveField('type', value)}
                                    onCancel={handleCancelEdit}
                                    options={[
                                        { value: PropertyType.HOME, label: 'Casa' },
                                        { value: PropertyType.APARTMENT, label: 'Departamento' },
                                        { value: PropertyType.FIELD, label: 'Campo' },
                                        { value: PropertyType.COMMERCIAL, label: 'Local Comercial' },
                                        { value: PropertyType.LAND, label: 'Lote' }
                                    ]}
                                />
                                <EditButton
                                    onStartEdit={() => handleStartEdit('type')}
                                    onEndEdit={() => handleSaveField('type', localProperty.type ?? PropertyType.HOME)}
                                    isEditing={editingField === 'type'}
                                    className={styles.editButtonProperties}
                                    show={isEditableFile || isEmptyFile}
                                    img={'/icons/iconSelect.png'}
                                />
                            </div>
                        </h1>



                    </div>
                    <div className={styles.buttonsProperties}>
                        <Link href="https://wa.me/2494208037" className={styles.linkProperties}>
                            <button type="button"
                                className={`${styles.askBtn} ${isEmptyFile || isEditableFile ? styles.notShowProperties : styles.showProperties} ${cactus.className}`}>
                                Consultar
                            </button>
                        </Link>
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
                            onClick={handleSaveChanges}
                            disabled={currentIsSubmitting}
                            className={`${styles.askBtn} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}
                        >
                            {currentIsSubmitting ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.mainInfoPrice}>
                <div className={`${styles.priceEditionProperties} ${styles.showProperties}`}>
                    {(isEmptyFile || isEditableFile) && editingField === 'price' ? (
                        <EditableNumericField
                            value={localProperty.price}
                            isEditing={true}
                            className={styles.inputProperties}
                            onSave={(value) => handleSaveField('price', value)}
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                        <h1 onClick={() => handleStartEdit('price')}>
                            USD {localProperty.price}
                        </h1>
                    )}
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
                    <h2>Descripción</h2>
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
                {(isEmptyFile || isEditableFile) && editingField === 'description' ? (
                    <EditableTextField
                        value={localProperty.description}
                        isEditing={editingField === 'description'}
                        type={"text"}
                        onSave={(value) => handleSaveField('description', value)}
                        onCancel={handleCancelEdit}
                        className={styles.inputProperties}
                    />
                ) : (
                    <h5 className={`${styles.showProperties}`}>
                        {localProperty.description}
                    </h5>
                )}
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.buttonsEditProperties}>
                    <div className={styles.titleProperties}>
                        <h2>Ficha</h2>
                        <div className={`${isEmptyFile || isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                            <button onClick={() => setIsEditingAll(!isEditingAll)} className={styles.editButtonProperties}>
                                {isEditingAll ? <h5 className={cactus.className}>Guardar ✔</h5> : <Image
                                    src={'/icons/iconoEdit.png'}
                                    alt={'Icono para editar'}
                                    width={20}
                                    height={20}
                                />}
                            </button>
                        </div>
                    </div>
                    <div className={`${isEmptyFile || isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
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
                                // ✅ Pasamos las del inmueble mapeadas a CharacteristicCreate (agregando property_id)
                                initialCharacteristics={(localProperty.characteristics || []).map((c: Characteristic): CharacteristicCreate => ({
                                    id: c.id,
                                    characteristic: c.characteristic,
                                    property_id: localProperty.id,
                                    data_type: c.data_type,
                                    value_integer: c.value_integer,
                                    value_text: c.value_text,
                                    category: c.category,
                                    iconUrl: c.iconUrl,
                                }))}
                                propertyId={localProperty.id}
                            />
                        </div>
                    )}
                    <div className={styles.dataGridProperties}>
                        <div className={styles.sectionProperties}>
                            {localProperty.characteristics.map((characteristicFromDB) => {
                                // Usamos el helper para obtener el icono y el label legible
                                const enrichedChar = enrichCharacteristic(characteristicFromDB);

                                return (
                                    <Item
                                        key={enrichedChar.id}
                                        imgSrc={enrichedChar.iconUrl || '/icons/default.png'}
                                        label={enrichedChar.characteristic} // Este es el label legible
                                        characteristic={enrichedChar}
                                        isEditing={isEditingAll}
                                        onSave={(newValue) => handleSaveCharacteristic(enrichedChar.id, newValue)}
                                        id={enrichedChar.id}
                                        type="item"
                                        showDeleteButton={false} // Puedes cambiar esto
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h2>Ubicación</h2>
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
                        src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                        width="1300"
                        height="400"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </main>
    )
}
