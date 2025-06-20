'use client';
import DataCard from '@/components/features/DataCard/DataCard'
import Image from 'next/image';
import styles from './FichaVacia.module.css'
import {cactus} from "@/app/ui/fonts";
import { useState } from 'react';

export default function Ficha() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [adress, setText] = useState('Dirección');
    const [operation, setOperation] = useState('Dirección | OPERACIÓN');
    const [city, setCity] = useState('Ciudad');



    // 👇 Acá están las funciones que mencionás
    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value);
    };

    const manejarCambioOperation = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOperation(e.target.value);
    };

    const manejarCambioCity = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCity(e.target.value);
    };

    const activarEdicion = (): void => setModoEdicion(true);

    const desactivarEdicion = (): void => setModoEdicion(false);


    return(
        <main className={styles.page}>
            <div className={styles.mainAdressProperties}>
                <div className={styles.adressProperties}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                value={adress}
                                onChange={manejarCambio}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{adress}</h1>
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
                <button><Image
                    src={'/icons/share.png'}
                    alt={'Share Icon'}
                    width={30}
                    height={30}
                /></button>
            </div>

            <div className={styles.mediaCarouselProperties}>
                <div className={styles.imgProperties}>
                    <Image
                        src={'/backgrounds/fichaBackground.jpg'}
                        alt={'carousel de multimedia de la propiedad'}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

               <button id={styles.imageIconoEditPhoto} className={styles.editButtonProperties}>
                   <Image
                       src={'/icons/pencilEdit.svg'}
                       alt={'Icono para editar'}
                       width={50}
                       height={50}
                   />
               </button>
        </div>

    <div className={styles.main}>
            <div className={styles.mainInfo}>
                    <div className={styles.infoProperties}>
                        {modoEdicion ? (
                            <input
                                type="text"
                                value={operation}
                                onChange={manejarCambioOperation}
                                onBlur={desactivarEdicion}
                            />
                        ) : (
                            <h1>{operation}</h1>
                        )}
                    </div>
                    <div>
                        <button onClick={activarEdicion} className={styles.editButtonProperties}><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={30}
                            height={30}/>
                        </button>
                    </div>
                </div>
                <div>
                    <button type="button" className={`${styles.askBtn} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                </div>
            </div>

            <div className={styles.cityProperties}>
                {modoEdicion ? (
                    <input
                        type="text"
                        value={city}
                        onChange={manejarCambioCity}
                        onBlur={desactivarEdicion}
                    />
                ) : (
                    <h1>{city}</h1>
                )}
                <button onClick={activarEdicion} className={styles.editButtonProperties}><Image
                    src={'/icons/iconoEdit.png'}
                    alt={'Icono para editar'}
                    width={30}
                    height={30}/>
                </button>
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

            <div className={styles.mainInfo}>
                <h1>Precio</h1>
                <button className={styles.editButtonProperties}><Image
                    src={'/icons/iconoEdit.png'}
                    alt={'Icono para editar'}
                    width={30}
                    height={30}/>
                </button>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <div className={styles.editProperties}>
                        <h3>Descripción</h3>
                        <button className={styles.editButtonProperties}><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={30}
                            height={30}/>
                        </button>
                    </div>
                </div>
                <h5>Ubicado en una de las zonas más buscadas de la ciudad, este departamento de tres
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
                    <div className={styles.editProperties}>
                        <h3>Ficha</h3>
                        <button className={styles.editButtonProperties}><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={30}
                            height={30}/>
                        </button>
                    </div>
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
                    <div className={styles.ubicationEditProperties}>
                        <h3>Ubicación</h3>
                        <button className={styles.editButtonProperties}>
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
                <h5 id={"ubicacionText"}>

                </h5>
            </div>
        </main>
    )
}