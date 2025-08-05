'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import EditableTextField from '@/components/TechnicalFile/EditableField/EditableTextField'
import EditableSelectField from "@/components/TechnicalFile/EditableField/EditableSelectField";
import EditableNumericField from "@/components/TechnicalFile/EditableField/EditableNumericField";
import EditButton from '@/components/TechnicalFile/EditButton'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/(views)/ui/fonts";
import {Property, PropertyState, PropertyType, PropertyUpdateData} from "@/types/Property";
import {useRouter} from "next/navigation";
import React, { useState,useEffect  } from "react";
import CarrouselFotos from "./Carrousel/CarrouselFotos";
import Item from "@/components/TechnicalFile/PropertiesItem";
import CharacteristicsForm from "./characteristicsForm/characteristicsForm"
import {useUpdateProperty} from "@/hooks/useUpdateProperty"
import {useUpdateCharacteristic} from "@/hooks/useUpdateCharacteristic"



import {
    getDataGridCharacteristics,
    getTechnicalSheetCharacteristics
} from "@/components/TechnicalFile/MockCharacteristic";

type TechnicalSheetProps = {
    mode: 'view' | 'create' | 'edit';
    property: Property | null;
};

export default function TechnicalSheet({mode, property}: TechnicalSheetProps) {
    const router = useRouter();
    if (property == null) {
        property = {
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
        }
    }

    const [editingField, setEditingField] = useState<string | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(property);

    const [showForm, setShowForm] = useState(false);

    //para el componente de Items
    const [isEditingAll, setIsEditingAll] = useState(false);
    //para la edicion
    const { updateProperty, isUpdating: isUpdatingProperty, status: propertyStatus } = useUpdateProperty();
    const { updateCharacteristic } = useUpdateCharacteristic();
    const [isSubmittingAll, setIsSubmittingAll] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [modifiedCharacteristics, setModifiedCharacteristics] = useState<Map<number, { value_integer?: number; value_text?: string }>>(new Map());




    useEffect(() => {
        if (mode === 'edit') {
            setIsEditingAll(true);
            setIsEditingAllP(true);
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

    const handleSaveChanges = async () => {
        if (!localProperty) return;

        setIsSubmitting(true); // 1. Ponemos la UI en estado "Cargando..."
        setSubmitStatus(null);

        // 2. Preparamos todas las "tareas" (peticiones a la API) que necesitamos hacer.
        //    Creamos un array de promesas.
        const updatePromises = [];

        const propertyDataToUpdate = {
            address: localProperty.address,
            city: localProperty.city,
            state:localProperty.state,
            ubication: localProperty.ubication,
            price: localProperty.price,
            description: localProperty.description,
            type: localProperty.type,

        };
        updatePromises.push(updateProperty(localProperty.id, propertyDataToUpdate));

        modifiedCharacteristics.forEach((data, id) => {
            updatePromises.push(updateCharacteristic(id, data));
        });

        try {

            await Promise.all(updatePromises);


            setSubmitStatus({ message: '¡Todos los cambios se guardaron con éxito!', type: 'success' });
            setModifiedCharacteristics(new Map()); // Reseteamos los cambios pendientes

        } catch (error) {

            const message = error instanceof Error ? error.message : 'Ocurrió un error al guardar.';
            setSubmitStatus({ message, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

//funcion para crear la publicacion
    const handleCreatePublication = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Validaciones básicas antes de enviar (puedes añadir más)
        if (!localProperty.address || localProperty.price <= 0) {
            setSubmitStatus({ message: 'Por favor, complete la dirección y el precio.', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/propiedades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Envio el estado local completo

                body: JSON.stringify(localProperty),
            });

            const result = await response.json();

            if (!response.ok) {
                // Si el backend devuelve errores específicos (ej. validación)
                const errorMessage = result.errors ? JSON.stringify(result.errors) : 'Ocurrió un error en el servidor.';
                throw new Error(errorMessage);
            }

            // Éxito
            setSubmitStatus({ message: '¡Propiedad publicada con éxito!', type: 'success' });

            setTimeout(() => {
                router.push(`/propiedades`); // Asumiendo que el backend devuelve el ID
            }, 2000);

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido al crear la publicación.';
            setSubmitStatus({ message, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };


    console.log(editingField)
    const [isEditingAllP, setIsEditingAllP] = useState(false);

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

        setLocalProperty(prev => ({...prev, [fieldName]: value}));

        setEditingField(null)
        console.log("2. LocalProperty después del update:", localProperty); // Para debug
    };

    const handleSaveAddress = async (value: string) => {
        console.log(`Guardando address:`, value);

        setLocalProperty(prev => ({...prev, address: value}));

        setEditingField(null)
        console.log("2. LocalProperty después del update:", localProperty); // Para debug
    };

    const handleCancelEdit = () => {
        console.log(`Cancelando edición`);

        setEditingField(null);
    };



    return (
        <main className={styles.page}>
            <div>
                <ContactInformation/>
            </div>

            <div className={styles.mainAdressProperties}>
                <div
                    className={`${styles.adressProperties} ${ styles.showProperties }`}>
                    <h1>
                        <EditableTextField
                            value={localProperty.address}
                            isEditing={editingField == 'address-header'}
                            type={"text"}
                            onSave={(value) => handleSaveAddress(value)}
                            onCancel={handleCancelEdit}
                            className={styles.inputProperties}
                        />
                    </h1>
                    <EditButton
                        onStartEdit={() => handleStartEditHeader()}
                        onEndEdit={() => handleSaveAddress('address')}
                        isEditing={editingField == 'address-header'}
                        show={isEditableFile || isEmptyFile}
                        img={'/icons/iconoEdit.png'}
                    />
                </div>
            </div>

            <div className={styles.mediaCarouselProperties}>
                    <CarrouselFotos isEditableFile={isEditableFile} isEmptyFile={isEmptyFile} property={property}/>
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
                                onEndEdit={() => handleSaveAddress('valor')}
                                isEditing={editingField === 'address-main'}
                                className={styles.editButtonProperties}
                                show={isEditableFile || isEmptyFile}
                                img={'/icons/iconoEdit.png'}
                            />
                        <h1>
                            <span> | </span>
                            <EditableSelectField // Debería ser un select
                                value={localProperty.state}
                                isEditing={editingField === 'state'}
                                className={styles.inputProperties}
                                onSave={(value) => handleSaveField('state', value)}
                                onCancel={handleCancelEdit}
                                options={[]}
                            />
                        </h1>
                        <EditButton
                            onStartEdit={() => handleStartEdit('state')}
                            onEndEdit={() => handleSaveField('state', 'valor')}
                            isEditing={editingField === 'state'}
                            className={styles.editButtonProperties}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconSelect.png'}
                        />
                    </div>
                </div>
                <div className={styles.buttonsProperties}>
                    <button type="button"
                            className={`${styles.askBtn} ${isEmptyFile ? styles.notShowProperties : styles.showProperties || isEditableFile ? styles.notShowProperties : styles.showProperties} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                    <button
                        type="button"
                        onClick={handleCreatePublication} // Conectamos la función
                        disabled={isSubmitting} // Deshabilitamos mientras se envía
                        className={`${styles.askBtn} ${isEmptyFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}
                    >
                        {isSubmitting ? 'Generando...' : 'Generar publicación'}
                    </button>



                    <button
                        onClick={handleSaveChanges}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                    </button>



                    <button type="button"
                            className={`${styles.askBtn} ${styles.btnSold} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Marcar como vendida/alquilada
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
                        onEndEdit={() => handleSaveField('price', 'valor')}
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
                            onEndEdit={() => handleSaveField('description', 'value')}
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
                                {isEditingAll ? '✔ Guardar' :     <Image
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
                            <CharacteristicsForm />
                        </div>
                    )}
                    <div className={styles.dataGridProperties}>
                    <div className={styles.sectionProperties}>
                        {getTechnicalSheetCharacteristics(property).map((characteristic) => {
                            return (
                                <Item
                                    key={characteristic.category}
                                    imgSrc={characteristic.iconUrl || '/icons/default.png'}
                                    label={characteristic.characteristic}
                                    characteristic={characteristic}
                                    isEditing={isEditingAll}
                                    onSave={(newValue) => handleSaveCharacteristic(characteristic.id, newValue)}
                                    id={characteristic.id}
                                    type="item"
                                />
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
                            onEndEdit={() => handleSaveField('ubication', 'value')}
                            isEditing={editingField === 'ubication'}
                            show={isEditableFile || isEmptyFile}
                            img={'/icons/iconoEdit.png'}
                        />
                    </div>
                </div>

                <h5 className={`${styles.showProperties}`}>
                    <EditableTextField
                        value={localProperty.ubication}
                        isEditing={editingField == 'ubication'}
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