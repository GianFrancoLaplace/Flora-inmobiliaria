'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import Image from 'next/image';
import styles from './FichaTecnica.module.css'
import {cactus} from "@/app/ui/fonts";
import {useState} from "react";
import {usePathname} from "next/navigation";

export default function Ficha() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formulario, setFormulario] = useState({
        adress: 'Dirección',
        operation: 'Dirección | OPERACIÓN',
        city: 'Ciudad',
        ubicationDescription: '',
        price: 'Precio',
        description: '',
        ficha: ''
    });
    const pathname = usePathname();
    const isEmptyFile = pathname === '/Administracion/FichaVacia';
    const isEditableFile = pathname === '/Administracion/FichaEditable'

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const activarEdicion = (): void => setModoEdicion(true);
    const desactivarEdicion = (): void => setModoEdicion(false);
    return(
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
                <div className={`${styles.adressProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                    {modoEdicion ? (
                        <input
                            type="text"
                            name="adress"
                            className={styles.inputProperties}
                            value={formulario.adress}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ) : (
                        <h1>{formulario.adress}</h1>
                    )}

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
                        <h1>Av. Avellaneda 987</h1>
                        <h1>|</h1>
                        <h1>VENTA</h1>
                    </div>
                </div>
                <div className={`${isEmptyFile ? styles.mainInfo : styles.notShowProperties}`}>
                    <div className={styles.editProperties}>
                        {modoEdicion ? (
                            <input
                                type = "text"
                                name = "operation"
                                className={styles.inputProperties}
                                value = {formulario.operation}
                                onChange = {manejarCambio}
                                onBlur = {desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.operation}</h1>
                        )}
                        <button onClick={activarEdicion} className={`${isEmptyFile ? styles.editButtonProperties : styles.notShowProperties}`}><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={30}
                            height={30}/>
                        </button>
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
                    {modoEdicion ? (
                        <input
                            type = "text"
                            name = "city"
                            className={styles.inputProperties}
                            value = {formulario.city}
                            onChange = {manejarCambio}
                            onBlur = {desactivarEdicion}
                        />
                    ) : (
                        <h1>{formulario.city}</h1>
                    )}
                    <button onClick={activarEdicion} className={`${styles.editButtonProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30}/>
                    </button>
                </div>
                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>Ciudad de Tandil</h5>
            </div>

            <div className={styles.mainBoxesGridProperties}>
                <div>
                    <DataCard/>
                </div>
                <div>
                    <DataCard/>
                </div>
                <div>
                    <DataCard/>
                </div>
                <div>
                    <DataCard/>
                </div>
                <div>
                    <DataCard/>
                </div>
            </div>

            <div className={styles.mainInfoPrice}>
                <div className={`${styles.priceEditionProperties} ${isEmptyFile ? styles.showProperties : styles.notShowProperties}`}>
                        {modoEdicion ? (
                            <input
                                type = "text"
                                name = "price"
                                className={styles.inputProperties}
                                value = {formulario.price}
                                onChange = {manejarCambio}
                                onBlur = {desactivarEdicion}
                            />
                        ) : (
                            <h1>{formulario.price}</h1>
                        )}
                    <button onClick={activarEdicion} className={styles.editButtonProperties}><Image
                        src={'/icons/iconoEdit.png'}
                        alt={'Icono para editar'}
                        width={30}
                        height={30}/>
                    </button>
                </div>
                <h1 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>USD 550.000</h1>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
                    <div className={`${isEmptyFile ? styles.ubicationEditProperties : styles.notShowProperties}`}>
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
                    ):(
                        <h5>{formulario.description}</h5>
                    )}
                </h5>
                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
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
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Superficie Total: 500m2</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Superficie Descubierta: 322.57m2</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Superficie Semicubierta: 322.57m2</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Superficie Cubierta: 322.57m2</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Ambientes: 30</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Dormitorios: 10</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Dormitorios en Suite: 5</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Baños: 8</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Cocheras: 4</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Cobertura Cochera: Cubierta</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Tipo de Cochera: Fija</h5>
                        </div>
                    </div>
                    <div className={styles.sectionProperties}>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Expensas: $120.000</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Fecha de la Expensa: 2025-10-02</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Agua: $60.000</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Tipo de Baulera: Individual</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Tipo de Piso: Roble</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Estado Inmueble: A Refaccionar</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Orientación: Norte</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Luminosidad: Muy Luminoso</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Disposición: Frente</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Antiguedad: 5 Años</h5>
                        </div>
                        <div className={styles.itemProperties}>
                            <Image
                                src={'/icons/share.png'}
                                alt={'icono acorde a la informacion proporcionada'}
                                width={20}
                                height={20}
                            />
                            <h5>Ubicación en la Cuadra: Esquina</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Ubicación</h3>
                    <div className={`${isEmptyFile ? styles.ubicationEditProperties : styles.notShowProperties}`}>
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
                <h5 className={`${isEmptyFile ? styles.notShowProperties : styles.showProperties}`}>
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
                            className={styles.inputProperties}
                            value={formulario.ubicationDescription}
                            onChange={manejarCambio}
                            onBlur={desactivarEdicion}
                        />
                    ):(
                        <h5>{formulario.ubicationDescription}</h5>
                    )}
                </h5>
                <div className={styles.mapaInteractivo}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6345.872814972624!2d-59.128316!3d-37.320334!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95911f92a1699e0f%3A0xb7acb39bd2ed6d7!2sMitre%201247%2C%20B7000%20Tandil%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1750441385483!5m2!1ses!2sar"
                        width="600"
                        height="400"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </main>
    )
}