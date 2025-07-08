'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import Headed from '@/components/features/Headed/Headed'
import Operation from '@/components/features/Operation/Operation'
import City from '@/components/features/City/City'
import Price from '@/components/features/City/City'
import Item from '@/components/TechnicalFile/PropertiesItem'
import Image from 'next/image';
import styles from './TechnicalSheet.module.css'
import { cactus } from "@/app/ui/fonts";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Ficha() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formulario, setFormulario] = useState({
        adress: 'Dirección',
        operation: 'Dirección | OPERACIÓN',
        city: 'Ciudad',
        ubicationDescription: '',
        price: 'Precio',
        description: '',
        ficha: '',

        adressF: 'Av. Avellaneda 987',
        operationF: 'Av. Avellaneda 987 | VENTA',
        cityF: 'Ciudad de Tandil',
        ubicationDescriptionF: 'Ubicado en una de las zonas más buscadas de la ciudad, este departamento de tres\n' +
            '                    ambientes ofrece comodidad, luminosidad y una excelente distribución en sus\n' +
            '                    68 metros cuadrados. Al ingresar, cuenta con un amplio living-comedor con salida a\n' +
            '                    un balcón con vista abierta, ideal para disfrutar al aire libre.\n' +
            '\n' +
            '\n' +
            '                    La cocina es independiente y está equipada con muebles modernos y lavadero\n' +
            '                    incorporado. Dispone de dos dormitorios con placares empotrados y un baño completo\n' +
            '                    con terminaciones de calidad.\n' +
            '\n' +
            '                    El edificio ofrece seguridad 24 horas, salón de usos múltiples y una terraza con\n' +
            '                    parrilla. Gracias a su cercanía con medios de transporte, espacios verdes y una variada\n' +
            '                    oferta comercial, esta propiedad es ideal tanto para vivienda como para inversión.',
        priceF: 'USD 500.000',
        descriptionF: ' Ubicada en una zona semicéntrica de Tandil, esta propiedad combina la tranquilidad\n' +
            '                    de un barrio residencial con la cercanía al centro de la ciudad. A pocos minutos de\n' +
            '                    comercios, escuelas, espacios verdes y servicios esenciales, ofrece un entorno cómodo,\n' +
            '                    accesible y en constante crecimiento. Ideal para quienes buscan una buena conexión con\n' +
            '                    el movimiento urbano sin resignar calma y calidad de vida.',
        fichaF: <Ficha></Ficha>
    });

    const pathname = usePathname();
    const isEmptyFile = pathname === '/Administracion/EmptySheet';
    const isEditableFile = pathname === '/Administracion/EditableSheet'

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const activarEdicion = (): void => setModoEdicion(true);
    const desactivarEdicion = (): void => setModoEdicion(false);
    return (
        <main className={styles.page}>
            <div>
                <ContactInformation />
            </div>

            <div>
               <Headed />
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
                <div className={`${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    <Operation />
                </div>
                <div className={`${isEmptyFile ? styles.editProperties : isEditableFile ? styles.editProperties  : styles.notShowProperties}`}>
                    <div className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="operation"
                                className={styles.inputProperties}
                                value={formulario.operation}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.operation}</h1>
                        )}
                    </div>
                    <div className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="operationF"
                                className={styles.inputProperties}
                                value={formulario.operationF}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.operationF}</h1>
                        )}
                    </div>
                    <button onClick={activarEdicion} className={`${styles.editButtonProperties}`}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30} />
                    </button>
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
                <div className={`${isEmptyFile ? styles.editProperties : isEditableFile ? styles.editProperties  : styles.notShowProperties}`}>
                    <div className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="city"
                                className={styles.inputProperties}
                                value={formulario.city}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.city}</h1>
                        )}
                    </div>
                    <div className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="cityF"
                                className={styles.inputProperties}
                                value={formulario.cityF}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.cityF}</h1>
                        )}
                    </div>
                    <button onClick={activarEdicion} className={`${styles.editButtonProperties}`}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30} />
                    </button>
                </div>
                <div className={`${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    <City />
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
                <div className={`${isEmptyFile ? styles.priceEditionProperties : isEditableFile ? styles.priceEditionProperties  : styles.notShowProperties}`}>
                    <div className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="price"
                                className={styles.inputProperties}
                                value={formulario.price}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.price}</h1>
                        )}
                    </div>
                    <div className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                name="priceF"
                                className={styles.inputProperties}
                                value={formulario.priceF}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.priceF}</h1>
                        )}
                    </div>
                    <button onClick={activarEdicion} className={`${styles.editButtonProperties}`}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30} />
                    </button>
                </div>
                <div  className= {`${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    <Price />
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
                    <div className={`${isEmptyFile ? styles.ubicationEditProperties : isEditableFile ? styles.ubicationEditProperties : styles.notShowProperties}`}>
                        <button onClick={activarEdicion} className={styles.editButtonProperties}>
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
                <h5 className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    {modoEdicion ? (
                        <input
                            type="text"
                            name="description"
                            className={styles.inputProperties}
                            value={formulario.description}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ) : (
                        <span>{formulario.description}</span>
                    )}
                </h5>

                <h5 className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                    {modoEdicion ? (
                        <input
                            type="text"
                            name="descriptionF"
                            className={styles.inputProperties}
                            value={formulario.descriptionF}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ) : (
                        <span>{formulario.descriptionF}</span>
                    )}
                </h5>

                <h5 className={`${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    Ubicado en una de las zonas más buscadas de la ciudad, este departamento de tres
                    ambientes ofrece comodidad, luminosidad y una excelente distribución en sus
                    68 metros cuadrados. Al ingresar, cuenta con un amplio living-comedor con salida a
                    un balcón con vista abierta, ideal para disfrutar al aire libre.


                    La cocina es independiente y está equipada con muebles modernos y lavadero
                    incorporado. Dispone de dos dormitorios con placares empotrados y un baño completo
                    con terminaciones de calidad.

                    El edificio ofrece seguridad 24 horas, salón de usos múltiples y una terraza con
                    parrilla. Gracias a su cercanía con medios de transporte, espacios verdes y una variada
                    oferta comercial, esta propiedad es ideal tanto para vivienda como para inversión.
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
                    <div className={`${isEmptyFile ? styles.ubicationEditProperties : isEditableFile ? styles.ubicationEditProperties : styles.notShowProperties}`}>
                        <button onClick={activarEdicion} className={styles.editButtonProperties}>
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
                <h5 className={`${isEmptyFile ? styles.notShowProperties : isEditableFile ? styles.notShowProperties : styles.showProperties}`}>
                    Ubicada en una zona semicéntrica de Tandil, esta propiedad combina la tranquilidad
                    de un barrio residencial con la cercanía al centro de la ciudad. A pocos minutos de
                    comercios, escuelas, espacios verdes y servicios esenciales, ofrece un entorno cómodo,
                    accesible y en constante crecimiento. Ideal para quienes buscan una buena conexión con
                    el movimiento urbano sin resignar calma y calidad de vida.
                </h5>

                <h5 className={`${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    {modoEdicion ? (
                        <input
                            type="text"
                            name="ubicationDescription"
                            className={`${styles.inputProperties} ${styles.inputUbicationProperties}`}
                            value={formulario.ubicationDescription}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ) : (
                        <span>{formulario.ubicationDescription}</span>
                    )}
                </h5>

                <h5 className={`${isEditableFile ? styles.showProperties : styles.notShowProperties}`}>
                    {modoEdicion ? (
                        <input
                            type="text"
                            name="ubicationDescriptionF"
                            className={`${styles.inputProperties} ${styles.inputUbicationProperties}`}
                            value={formulario.ubicationDescriptionF}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ) : (
                        <span>{formulario.ubicationDescriptionF}</span>
                    )}
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