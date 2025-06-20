import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import DataCard from '@/components/features/DataCard/DataCard'
import Image from 'next/image';
import styles from './FichaTecnica.module.css'
import {cactus} from "@/app/ui/fonts";

export default function Ficha() {
    return(
        <main className={styles.page}>
            <div>
                <ContactInformation/>
            </div>

            <div className={styles.mainAdressProperties}>
                <h1>Av. Avellaneda 987</h1>
                <Image
                    src={'/icons/share.png'}
                    alt={'Share Icon'}
                    width={30}
                    height={30}
                />
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
                <div className={styles.mainInfo}>
                    <h1>Av. Avellaneda 987</h1>
                    <h1>|</h1>
                    <h1>VENTA</h1>
                </div>
                <div>
                    <button type="button" className={`${styles.askBtn} ${cactus.className}`}>
                        Consultar por esta propiedad
                    </button>
                </div>
            </div>

            <div className={styles.cityProperties}>
                <h5>Ciudad de Tandil</h5>
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
                <h1>USD 550.000</h1>
            </div>

            <div className={styles.descriptionsProperties}>
                <div className={styles.titleProperties}>
                    <h3>Descripción</h3>
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
                </div>
                <h5>
                    Ubicada en una zona semicéntrica de Tandil, esta propiedad combina la tranquilidad
                    de un barrio residencial con la cercanía al centro de la ciudad. A pocos minutos de
                    comercios, escuelas, espacios verdes y servicios esenciales, ofrece un entorno cómodo,
                    accesible y en constante crecimiento. Ideal para quienes buscan una buena conexión con
                    el movimiento urbano sin resignar calma y calidad de vida.
                </h5>
            </div>
        </main>
    )
}