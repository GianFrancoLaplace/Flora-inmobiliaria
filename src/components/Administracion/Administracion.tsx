import styles from "@/components/Administracion/Administracion.module.css";
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Administracion() {
    const propiedades = [
        {
            id: 1,
            precio: 'USD 340.000',
            direccion: 'San Martin 567, Tandil',
            descripcion: '7 ambientes | 3 dormitorios | 2 baños',
            imagen: '/imgs/interior1.jpeg'
        },
        {
            id: 2,
            precio: 'USD 210.000',
            direccion: 'Belgrano 123, Tandil',
            descripcion: '4 ambientes | 2 dormitorios | 1 baño',
            imagen: '/imgs/interior1.jpeg'
        },
        {
            id: 3,
            precio: 'USD 90.000',
            direccion: 'Av. Avellaneda 980, Tandil',
            descripcion: '4 ambientes | 2 dormitorios | 1 baño',
            imagen: '/imgs/interior1.jpeg'
        },
        {
            id: 4,
            precio: 'USD 780.000',
            direccion: '9 de Julio, Tandil',
            descripcion: '7 ambientes | 4 dormitorios | 1 baño',
            imagen: '/imgs/interior1.jpeg'
        },
        {
            id: 5,
            precio: 'USD 780.000',
            direccion: '9 de Julio, Tandil',
            descripcion: '7 ambientes | 4 dormitorios | 1 baño',
            imagen: '/imgs/interior1.jpeg'
        },
        {
            id: 6,
            precio: 'USD 780.000',
            direccion: '9 de Julio, Tandil',
            descripcion: '7 ambientes | 4 dormitorios | 1 baño',
            imagen: '/imgs/interior1.jpeg'
        },
    ];

    return (
        <div>
            <div className={`${styles.sectionProperties} ${cactus.className}`}>
                <div>
                    <Link href={'/Administracion/FichaVacia'} className={styles.linkProperties}>
                        <button className={`${styles.buttonNewPublication} ${cactus.className}`}>Crear publicación</button>
                    </Link>
                    <button className={`${styles.showInactivePublication} ${cactus.className}`}>Ver publicaciones inactivas</button>
                </div>
            </div>

            {propiedades.map((prop, index) => (
                <Link key={prop.id} href={'/Propiedades/Ficha'} className={styles.linkProperties}>
                    <div className={`${styles.cardsProperties} ${cactus.className}`}>
                        <div className={`${styles.cardProperties} ${cactus.className}`}>
                            <div className={`${styles.imageProperties} ${cactus.className}`}>
                                <Image
                                    src={prop.imagen}
                                    alt={'Imagen interior casa'}
                                    width={285}
                                    height={175}
                                />
                            </div>

                            <div className={`${styles.infoProperties} ${cactus.className}`}>
                                <div className={styles.priceProperties}>
                                    <h5>{prop.precio}</h5>
                                </div>
                                <div className={`${styles.restInfoProperties} ${cactus.className}`}>
                                    <h5>{prop.direccion}</h5>
                                    <h5>{prop.descripcion}</h5>
                                </div>
                            </div>

                            <div className={styles.buttonsProperties}>
                                <button>
                                    <Image
                                        src={'/icons/iconoEdit.png'}
                                        alt={'Icono para editar'}
                                        width={25}
                                        height={25}
                                    />
                                </button>
                                <button>
                                    <Image
                                        src={'/icons/iconoDelete.png'}
                                        alt={'Icono para eliminar'}
                                        width={25}
                                        height={25}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    );
}