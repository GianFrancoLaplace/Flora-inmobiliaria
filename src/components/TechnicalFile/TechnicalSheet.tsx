'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import Item from '@/components/TechnicalFile/PropertiesItem'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/(views)/ui/fonts";
import { usePathname } from "next/navigation";
import { usePropertyEditor} from "@/components/TechnicalFile/usePropertyEditor";
import {Property} from "@/app/models/Property/Property";

type TechnicalSheetProps = {
    mode: 'view' | 'create' | 'edit';
    property: Property;
};

export default function TechnicalSheet({ mode, property }: TechnicalSheetProps) {

    const defaultDescription = "Ubicado en una de las zonas más buscadas de la ciudad, este departamento de tres\n" +
        "                    ambientes ofrece comodidad, luminosidad y una excelente distribución en sus\n" +
        "                    68 metros cuadrados. Al ingresar, cuenta con un amplio living-comedor con salida a\n" +
        "                    un balcón con vista abierta, ideal para disfrutar al aire libre.\n" +
        "\n" +
        "\n" +
        "                    La cocina es independiente y está equipada con muebles modernos y lavadero\n" +
        "                    incorporado. Dispone de dos dormitorios con placares empotrados y un baño completo\n" +
        "                    con terminaciones de calidad.\n" +
        "\n" +
        "                    El edificio ofrece seguridad 24 horas, salón de usos múltiples y una terraza con\n" +
        "                    parrilla. Gracias a su cercanía con medios de transporte, espacios verdes y una variada\n" +
        "                    oferta comercial, esta propiedad es ideal tanto para vivienda como para inversión.\n" +
        "               "

    const {
        // property,
        editingFields,
        startEditing,
        confirmEdit,
        cancelEdit,
        updateField,
        // isViewMode,
        isCreateMode
    } = usePropertyEditor(mode);

    const pathname = usePathname();
    const isEmptyFile = pathname === '/administracion/fichavacia';
    const isEditableFile = pathname === '/administracion/fichaeditable'

    const handleFieldEdit = (fieldName: keyof Property) => {
        startEditing(fieldName);
    };

    const handleFieldSave = (fieldName: keyof Property) => {
        confirmEdit(fieldName);
    };

    const handleFieldChange = (fieldName: keyof Property, value: string | number) => {
        updateField(fieldName, value);
    };

    const handleFieldCancel = (fieldName: keyof Property) => {
        cancelEdit(fieldName);
    };

    const EditableField = ({
                               fieldName,
                               value,
                               className = styles.inputProperties,
                               onEnterKey
                           }: {
        fieldName: keyof Property;
        value: string | number;
        className?: string;
        onEnterKey?: () => void;
    }) => {
        const isEditing = editingFields[fieldName];

        if (isEditing) {
            return (
                <input
                    type="text"
                    className={className}
                    value={value}
                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                    onBlur={() => handleFieldSave(fieldName)} // onBlur se activa si se hace click fuera del input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFieldSave(fieldName);
                            onEnterKey?.();
                        }
                        if (e.key === 'Escape') {
                            handleFieldCancel(fieldName);
                        }
                    }}
                    autoFocus
                />
            );
        }

        return <span onClick={() => handleFieldEdit(fieldName)}>{value}</span>;
    };

    const EditButton = ({
                            fieldName,
                            showCondition = true
                        }: {
        fieldName: keyof Property;
        showCondition?: boolean;
    }) => {
        if (!showCondition) return null;

        return (
            <button
                onClick={() => handleFieldEdit(fieldName)}
                className={styles.editButtonProperties}
            >
                <Image
                    src={'/icons/iconoEdit.png'}
                    alt={'Icono para editar'}
                    width={30}
                    height={30}
                />
            </button>
        );
    };

    return (
        <main className={styles.page}>
            <div>
                <ContactInformation />
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
                <div className={`${styles.adressProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    <h1>
                        <EditableField
                            fieldName="address"
                            value={property.address || "Dirección"}
                        />
                    </h1>
                    <EditButton
                        fieldName="address"
                        showCondition={isEmptyFile || isCreateMode}
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
                <div className={`${isEmptyFile ? styles.notShowProperties : styles.mainInfo}`}>
                    <div className={styles.mainInfoH1}>
                        <h1>{property.address || "Av. Avellaneda 987"}</h1>
                        <h1>|</h1>
                        <h1>VENTA</h1>
                    </div>
                </div>

                <div className={`${isEmptyFile ? styles.mainInfo : styles.notShowProperties}`}>
                    <div className={styles.editProperties}>
                        <h1>
                            <EditableField
                                fieldName="address"
                                value={`${property.address || "Dirección"} | ${property.state}`}
                            />
                        </h1>
                        <EditButton
                            fieldName="address"
                            showCondition={isEmptyFile}
                        />
                    </div>
                </div>
                <div>
                    <button type="button" className={`${styles.askBtn} ${isEmptyFile ? styles.notShowProperties : styles.showProperties || isEditableFile ? styles.notShowProperties : styles.showProperties} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                    <button type="button" className={`${styles.askBtn} ${isEmptyFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Generar publicación
                    </button>
                    <button type="button" className={`${styles.askBtn} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Guardar cambios
                    </button>
                    <button type="button" className={`${styles.askBtn} ${styles.btnSold} ${isEditableFile ? styles.showProperties : styles.notShowProperties} ${cactus.className}`}>
                        Marcar como vendida/alquilada
                    </button>
                </div>
            </div>

            <div className={styles.cityProperties}>
                <div className={`${isEmptyFile ? styles.editProperties : styles.notShowProperties}`}>
                    <h1>
                        <EditableField
                            fieldName="city"
                            value={property.city || "Ciudad"}
                        />
                    </h1>
                    <EditButton
                        fieldName="city"
                        showCondition={isEmptyFile}
                    />
                </div>
                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
                    {property.city || "Ciudad de Tandil"}
                </h5>
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
                <div className={`${styles.priceEditionProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    <h1>
                        <EditableField
                            fieldName="price"
                            value={`USD ${property.price || "Precio"}`}
                        />
                    </h1>
                    <EditButton fieldName="price" />
                </div>
                <h1 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
                    USD {property.price || "550.000"}
                </h1>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
                    <EditButton
                        fieldName="description"
                        showCondition={isEmptyFile}
                    />
                </div>
                <h5 className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    <EditableField
                        fieldName="description"
                        value={property.description || ""}
                    />
                </h5>

                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
                    {property.description || defaultDescription}
                </h5>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Ficha</h3>
                </div>
                <div className={styles.dataGridProperties}>
                    <div className={styles.sectionProperties}>
                        <Item
                            imgSrc="/icons/sup.png"
                            label="Superficie Total"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/supDesc.png"
                            label="Superficie Descubierta"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/sup.png"
                            label="Superficie Semicubierta"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/supCub.png"
                            label="Superficie Cubierta"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/ambiente.png"
                            label="Ambientes"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/dorms.png"
                            label="Dormitorios"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/suite.png"
                            label="Dormitorios en Suite"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/baños.png"
                            label="Baños"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/cochera.png"
                            label="Cocheras"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/cobertura.png"
                            label="Cobertura Cochera"
                            value="Cubierta"
                        />
                        <Item
                            imgSrc="/icons/balcon.png"
                            label="Balcón/Terraza"
                            value="Fija"
                        />
                    </div>
                    <div className={styles.sectionProperties}>
                        <Item
                            imgSrc="/icons/expensas.png"
                            label="Expensas"
                            value="40000"
                        />
                        <Item
                            imgSrc="/icons/fecha.png"
                            label="Fecha de la Expensa"
                            value="04-12-2025"
                        />
                        <Item
                            imgSrc="/icons/agua.png"
                            label="Agua"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/plantas.png"
                            label="Cantidad de Plantas"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/piso.png"
                            label="Tipo de Piso"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/estado.png"
                            label="Estado de Inmueble"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/orientacion.png"
                            label="Orientación"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/luminosidad.png"
                            label="Luminosidad"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/disposicion.png"
                            label="Disposición"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/antiguedad.png"
                            label="Antigüedad"
                            value="4"
                        />
                        <Item
                            imgSrc="/icons/ubi.png"
                            label="Ubicación en la Cuadra"
                            value="4"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Ubicación</h3>
                    <EditButton
                        fieldName="description"
                        showCondition={isEmptyFile}
                    />
                </div>

                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
                    Ubicada en una zona semicéntrica de Tandil, esta propiedad combina la tranquilidad
                    de un barrio residencial con la cercanía al centro de la ciudad. A pocos minutos de
                    comercios, escuelas, espacios verdes y servicios esenciales, ofrece un entorno cómodo,
                    accesible y en constante crecimiento. Ideal para quienes buscan una buena conexión con
                    el movimiento urbano sin resignar calma y calidad de vida.
                </h5>

                <h5 className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    <EditableField
                        fieldName="description"
                        value={""}
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