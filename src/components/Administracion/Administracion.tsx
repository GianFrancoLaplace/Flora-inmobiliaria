import styles from "@/components/Administracion/Administracion.module.css";
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Administracion()
{
    return (
        <div>
            <div className={`${styles.sectionProperties} ${cactus.className}`}>
                <div>
                    <Link href={'/Administracion/FichaVacia'} className={styles.linkProperties}><button className={`${styles.buttonNewPublication} ${cactus.className}`}>Crear publicación</button></Link>
                    <button className={`${styles.showInactivePublication} ${cactus.className}`}>Ver publicaciones inactivas</button>
                </div>
            </div>
            <Link href={'/Propiedades/Ficha'} className={`${styles.linkProperties}`}>
             <div className={`${styles.cardsProperties} ${cactus.className}`}>
                <div className={`${styles.cardProperties} ${cactus.className}`}>
                    <div className={`${styles.imageProperties} ${cactus.className}`}>
                        <Image
                        src={'/imgs/interior1.jpeg'}
                        alt={'Imagen interior casa'}
                        width={285}
                        height={175}/>
                    </div>

                    <div className={`${styles.infoProperties} ${cactus.className}`}>
                        <div className={`${styles.priceProperties}`}>
                            <h5>USD 340.000</h5>
                        </div>
                        <div className={`${styles.restInfoProperties} ${cactus.className}`}>
                            <h5>San Martin 567, Tandil</h5>
                            <h5> 7 ambientes | 3 dormitorios | 2 baños </h5>
                        </div>
                    </div>
                    <div className={`${styles.buttonsProperties}`}>
                        <button><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={25}
                            height={25}/></button>
                        <button><Image
                            src={'/icons/iconoDelete.png'}
                            alt={'Icono para elimianr'}
                            width={25}
                            height={25}/>
                        </button>
                    </div>
                </div>
            </div>
            </Link>
            <div className={`${styles.cardsProperties} ${cactus.className}`}>
                <div className={`${styles.cardProperties} ${cactus.className}`}>
                    <div className={`${styles.imageProperties} ${cactus.className}`}>
                        <Image
                            src={'/imgs/interior1.jpeg'}
                            alt={'Imagen interior casa'}
                            width={285}
                            height={175}/>
                    </div>

                    <div className={`${styles.infoProperties} ${cactus.className}`}>
                        <div className={`${styles.priceProperties}`}>
                            <h5>USD 340.000</h5>
                        </div>
                        <div className={`${styles.restInfoProperties} ${cactus.className}`}>
                            <h5>San Martin 567, Tandil</h5>
                            <h5> 7 ambientes | 3 dormitorios | 2 baños </h5>
                        </div>
                    </div>
                    <div className={`${styles.buttonsProperties}`}>
                        <button><Image
                            src={'/icons/iconoEdit.png'}
                            alt={'Icono para editar'}
                            width={25}
                            height={25}/>
                        </button>
                        <button><Image
                            src={'/icons/iconoDelete.png'}
                            alt={'Icono para elimianr'}
                            width={25}
                            height={25}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}