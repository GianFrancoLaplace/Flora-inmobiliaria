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
import { CharacteristicCategory } from "@/types/Characteristic";
import React, { useState } from "react";
import CarrouselFotos from "./Carrousel/CarrouselFotos";
import Item from "@/components/TechnicalFile/PropertiesItem";

import {
    getDataGridCharacteristics,
    getTechnicalSheetCharacteristics
} from "@/components/TechnicalFile/MockCharacteristic";

type TechnicalSheetProps = {
    mode: 'view' | 'create' | 'edit';
    property: Property | null;
};

export default function TechnicalSheet({mode, property}: TechnicalSheetProps) {
    if (property == null) {
        property = {
            address: "Dirección",
            characteristics: [],
            city: "Ciudad",
            description: "Descripción",
            id: 0,
            price: 0,
            state: PropertyState.RENT,
            type: PropertyType.HOME,
            ubication: " ",
        }
    }

    const itemsToShow = [
        {
            category: CharacteristicCategory.SUPERFICIE_TOTAL,
            label: 'Superficie Total',
            icon: '/icons/sup.png',
        },
        {
            category: CharacteristicCategory.SUPERFICIE_DESCUBIERTA,
            label: 'Superficie Descubierta',
            icon: '/icons/supDesc.png',
        },
        {
            category: CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
            label: 'Superficie Semidescubierta',
            icon: '/icons/supCub.png',
        },
        {
            category: CharacteristicCategory.SUPERFICIE_CUBIERTA,
            label: 'Superficie Cubierta',
            icon: '/icons/supCub.png',
        },
        {
            category: CharacteristicCategory.AMBIENTES,
            label: 'Ambientes',
            icon: '/icons/ambiente.png',
        }, {
            category: CharacteristicCategory.DORMITORIOS,
            label: 'Dormitorios',
            icon: '/icons/dorms.png',
        },
        {
            category: CharacteristicCategory.DORMITORIOS_SUITE,
            label: 'Dormitorios en Suite',
            icon: '/icons/dorms.png',
        },
        {
            category: CharacteristicCategory.BANOS,
            label: 'Baños',
            icon: '/icons/baños.png',
        },
        {
            category: CharacteristicCategory.COCHERAS,
            label: 'Cocheras',
            icon: '/icons/cochera.png',
        },
        {
            category: CharacteristicCategory.COBERTURA_COCHERA,
            label: 'Cobertura cochera',
            icon: '/icons/cobertura.png',
        },
        {
            category: CharacteristicCategory.TIPO_PISO,
            label: 'Tipo de cochera',
            icon: '/icons/cobertura.png',
        },
        {
            category: CharacteristicCategory.EXPENSAS,
            label: 'Expensas',
            icon: '/icons/expensas.png',
        },
        {
            category: CharacteristicCategory.AGUA,
            label: 'Fecha de las expensas',
            icon: '/icons/fecha.png',
        },
        {
            category: CharacteristicCategory.TIPO_PISO,
            label: 'Tipo de piso',
            icon: '/icons/piso.png',
        },
        {
            category: CharacteristicCategory.ESTADO_INMUEBLE,
            label: 'Estado de inmueble',
            icon: '/icons/estado.png',
        },
        {
            category: CharacteristicCategory.ORIENTACION,
            label: 'Orientación',
            icon: '/icons/orientacion.png',
        },
        {
            category: CharacteristicCategory.LUMINOSIDAD,
            label: 'Luminosidad',
            icon: '/icons/luminosidad.png',
        },
        {
            category: CharacteristicCategory.DISPOSICION,
            label: 'Disposición',
            icon: '/icons/disposicion.png',
        },
        {
            category: CharacteristicCategory.ANTIGUEDAD,
            label: 'Antiguedad',
            icon: '/icons/antiguedad.png',
        },
        {
            category: CharacteristicCategory.UBICACION_CUADRA,
            label: 'Ubicación en la cuadra',
            icon: '/icons/ubi.png',
        },
    ];

    const [editingField, setEditingField] = useState<string | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(property);

    //para el componente de Items
    const [isEditingAll, setIsEditingAll] = useState(false);
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

    function handleSaveCharacteristic() {
        console.log("Guardar")
    }

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
                    <CarrouselFotos isEditableFile={isEditableFile || isEmptyFile} property={property}/>
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
                    <button type="button"
                            className={`${styles.askBtn} ${isEmptyFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Generar publicación
                    </button>
                    <button type="button"
                            className={`${styles.askBtn} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Guardar cambios
                    </button>
                    <button type="button"
                            className={`${styles.askBtn} ${styles.btnSold} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Marcar como vendida/alquilada
                    </button>
                </div>
            </div>

            <div className={styles.mainBoxesGridProperties}>
                <div className={styles.dataGridProperties}>
                    {getDataGridCharacteristics(property).map((characteristic) => {
                        return (
                            <Item
                                key={characteristic.category}
                                imgSrc={characteristic.iconUrl || '/icons/default.png'}
                                label={characteristic.characteristic}
                                characteristic={characteristic}
                                isEditing={isEditingAllP}
                                onSave={handleSaveCharacteristic}
                                id={characteristic.id}
                                type="data"
                            />
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
                <div className={styles.dataGridProperties}>
                    <div className={styles.sectionProperties}>
                        {getTechnicalSheetCharacteristics(property).map((characteristic) => {
                            return (
                                <Item
                                    key={characteristic.category}
                                    imgSrc={characteristic.iconUrl || '/icons/default.png'}
                                    label={characteristic.characteristic}
                                    characteristic={characteristic}
                                    isEditing={isEditingAllP}
                                    onSave={handleSaveCharacteristic}
                                    id={characteristic.id}
                                    type="item"
                                />
                            );
                        })}
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