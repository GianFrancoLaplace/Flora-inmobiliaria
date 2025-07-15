'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import EditableField from '@/components/TechnicalFile/EditField'
import EditButton from '@/components/TechnicalFile/EditButton'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/(views)/ui/fonts";
import {CharacteristicCategory, Property, PropertyState, PropertyType} from "@/types/Property";
import React, { useState } from "react";

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
            ubication: " "
        }
    }

    const itemsToShow = [
        {
            category: CharacteristicCategory.SUPERFICIE_TOTAL,
            label: 'Superficie Total',
            icon: '/icons/sup.png',
            value: " "
        },
        {
            category: CharacteristicCategory.SUPERFICIE_DESCUBIERTA,
            label: 'Superficie Descubierta',
            icon: '/icons/supDesc.png',
            value: " "
        },
        {
            category: CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
            label: 'Superficie Semidescubierta',
            icon: '/icons/supCub.png',
            value: " "
        },
        {
            category: CharacteristicCategory.SUPERFICIE_CUBIERTA,
            label: 'Superficie Cubierta',
            icon: '/icons/supCub.png',
            value: " "
        },
        {
            category: CharacteristicCategory.AMBIENTES,
            label: 'Ambientes',
            icon: '/icons/ambiente.png',
            value: " "
        },{
            category: CharacteristicCategory.DORMITORIOS,
            label: 'Dormitorios',
            icon: '/icons/dorms.png',
            value: " "
        },
        {
            category: CharacteristicCategory.DORMITORIOS_SUITE,
            label: 'Dormitorios en Suite',
            icon: '/icons/dorms.png',
            value: " "
        },
        {
            category: CharacteristicCategory.BANOS,
            label: 'Baños',
            icon: '/icons/baños.png',
            value: " "
        },
        {
            category: CharacteristicCategory.COCHERAS,
            label: 'Cocheras',
            icon: '/icons/cochera.png',
            value: " "
        },
        {
            category: CharacteristicCategory.COBERTURA_COCHERA,
            label: 'Cobertura cochera',
            icon: '/icons/cobertura.png',
            value: " "
        },
        {
            category: CharacteristicCategory.OTROS,
            label: 'Tipo de cochera',
            icon: '/icons/cobertura.png',
            value: " "
        },
        {
            category: CharacteristicCategory.EXPENSAS,
            label: 'Expensas',
            icon: '/icons/expensas.png',
            value: " "
        },
        {
            category: CharacteristicCategory.AGUA,
            label: 'Fecha de las expensas',
            icon: '/icons/fecha.png',
            value: " "
        },
        {
            category: CharacteristicCategory.TIPO_PISO,
            label: 'Tipo de piso',
            icon: '/icons/piso.png',
            value: " "
        },
        {
            category: CharacteristicCategory.ESTADO_INMUEBLE,
            label: 'Estado de inmueble',
            icon: '/icons/estado.png',
            value: " "
        },
        {
            category: CharacteristicCategory.ORIENTACION,
            label: 'Orientación',
            icon: '/icons/orientacion.png',
            value: " "
        },
        {
            category: CharacteristicCategory.LUMINOSIDAD,
            label: 'Luminosidad',
            icon: '/icons/luminosidad.png',
            value: " "
        },
        {
            category: CharacteristicCategory.DISPOSICION,
            label: 'Disposición',
            icon: '/icons/disposicion.png',
            value: " "
        },
        {
            category: CharacteristicCategory.ANTIGUEDAD,
            label: 'Antiguedad',
            icon: '/icons/antiguedad.png',
            value: " "
        },
        {
            category: CharacteristicCategory.UBICACION_CUADRA,
            label: 'Ubicación en la cuadra',
            icon: '/icons/ubi.png',
            value: " "
        },
    ];

    const [editingField, setEditingField] = useState<keyof Property | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(property);

    //para el componente de Items
    const [isEditingAll, setIsEditingAll] = useState(false);

    const handleSaveCharacteristic = (category: CharacteristicCategory, newValue: string) => {
        setLocalProperty(prev => ({
            ...prev,
            characteristics: prev.characteristics.map(c =>
                c.category === category ? { ...c, characteristic: newValue } : c
            )
        }));
    };

    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit"

    const handleStartEdit = (fieldName: keyof Property) => {
        console.log(`Iniciando edición de: ${fieldName}`);
        setEditingField(fieldName);
    };

    const handleSaveField = async (fieldName: keyof Property, value: string | number) => {
        console.log(`Guardando ${fieldName}:`, value);

        setLocalProperty(prev => ({...prev, [fieldName]: value}));

        setEditingField(null)
        console.log("2. LocalProperty después del update:", localProperty); // Para debug

        // Implementar llamada a la API
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
                <div className={`${isEmptyFile ? styles.notShowProperties : styles.viewInfoAdress}`}>
                    <h1>Av. Avellaneda 987</h1>
                    <Image
                        src={'/icons/share.png'}
                        alt={'Share Icon'}
                        width={30}
                        height={30}
                    />
                </div>
                <div
                    className={`${styles.adressProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    <h1>
                        <EditableField
                            value={localProperty.address}
                            isEditing={editingField == 'address'}
                            type={"text"}
                            onSave={(value) => handleSaveField('address', value)}
                            onCancel={handleCancelEdit}
                            className={styles.inputProperties}
                        />
                    </h1>
                    <EditButton
                        onStartEdit={() => handleStartEdit('address')}
                        onEndEdit={() => handleSaveField('address', 'valor')}
                        isEditing={editingField == 'address'}
                    />
                </div>
            </div>

            <div className={styles.mediaCarouselProperties}>
                <Image
                    src={'/backgrounds/fichaBackground.jpg'}
                    alt={'carousel de multimedia de la propiedad'}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className={styles.main}>
                <div className={`${styles.mainInfo}`}>
                    <div className={styles.editProperties}>
                        <h1>
                            <EditableField
                                value={localProperty.address}
                                isEditing={editingField === 'address'}
                                type={"text"}
                                className={styles.inputProperties}
                                onSave={(value) => handleSaveField('address', value)}
                                onCancel={handleCancelEdit}
                            />
                            <span> | </span>
                            <EditableField // Debería ser un select
                                value={localProperty.state}
                                isEditing={editingField === 'state'}
                                type={'text'}
                                className={styles.inputProperties}
                                onSave={(value) => handleSaveField('state', value)}
                                onCancel={handleCancelEdit}
                            />
                        </h1>
                        <EditButton
                            onStartEdit={() => handleStartEdit('address')}
                            onEndEdit={() => handleSaveField('address', 'valor')}
                            isEditing={editingField === 'address'}
                            className={styles.editButtonProperties}
                        />
                    </div>
                </div>
                <div>
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
                <div>
                    <DataCard
                        imgSrc="/icons/sup.png"
                        label="Sup. Total"
                        value="4"
                    />
                </div>
                <div>
                    <DataCard
                        imgSrc="/icons/ambiente.png"
                        label="Ambientes"
                        value="4"
                    />
                </div>
                <div>
                    <DataCard
                        imgSrc="/icons/dorms.png"
                        label="Dormitorios"
                        value="4"
                    />
                </div>
                <div>
                    <DataCard
                        imgSrc="/icons/baños.png"
                        label="Baños"
                        value="4"
                    />
                </div>
                <div>
                    <DataCard
                        imgSrc="/icons/cochera.png"
                        label="Cochera"
                        value="4"
                    />
                </div>
            </div>

            <div className={styles.mainInfoPrice}>
                <div className={`${styles.priceEditionProperties} ${styles.showProperties}`}>
                    <h1>
                        USD <EditableField
                            value={localProperty.price}
                            isEditing={editingField === "price"}
                            type={"number"}
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
                    />
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
                    <EditButton
                        onStartEdit={() => handleStartEdit('description')}
                        onEndEdit={() => handleSaveField('description', 'value')}
                        isEditing={editingField === 'description'}
                        className={styles.editButtonProperties}
                    />
                </div>
                <h5 className={`${styles.showProperties}`}>
                    <EditableField
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
                    <button onClick={() => setIsEditingAll(!isEditingAll)} className={styles.editButtonProperties}>
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={30}
                                height={30}
                            />
                    </button>

                </div>
                <div className={styles.dataGridProperties}>
                    <div className={styles.sectionProperties}>
                        {itemsToShow.map(({ category, label, icon }) => {
                            const char = property.characteristics.find((c) => c.category === category);

                            return (
                                <div className={styles.itemProperties} key={category}>
                                    <Image
                                        src={icon}
                                        alt="icono acorde a la informacion proporcionada"
                                        width={20}
                                        height={20}
                                    />
                                    <h5>
                                        {label}:
                                        <EditableField
                                            value={char?.characteristic ?? ''} // 👈 usa el valor real del estado
                                            isEditing={isEditingAll}
                                            type="text"
                                            onSave={(value) => handleSaveField('characteristics', value)}
                                            onCancel={handleCancelEdit}
                                            className={styles.itemProperties}
                                        />

                                    </h5>
                                </div>
                            );
                        })}
                        );
                    </div>
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Ubicación</h3>
                    <EditButton
                        className={styles.editButtonProperties}
                        onStartEdit={() => handleStartEdit('ubication')}
                        onEndEdit={() => handleSaveField('ubication', 'value')}
                        isEditing={editingField === 'ubication'}
                    />
                </div>

                <h5 className={`${styles.showProperties}`}>
                    <EditableField
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