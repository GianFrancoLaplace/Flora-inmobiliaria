"use client"
import styles from "@/components/Administracion/Administracion.module.css";
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Administracion() {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

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

    const handleDeleteClick = (propertyId) => {
        setPropertyToDelete(propertyId);
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setPropertyToDelete(null);
    };

    const handleConfirmDelete = () => {
        // Aquí puedes agregar la lógica para eliminar la propiedad
        console.log('Eliminando propiedad:', propertyToDelete);
        setShowConfirmModal(false);
        setPropertyToDelete(null);
    };

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

            {propiedades.map((prop) => (
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
                            <div className={`${styles.buttonsProperties}`}>
                                <Link href="FichaVacia/FichaVacia.tsx">
                                    <button>
                                        <Image
                                            src={'/icons/iconoEdit.png'}
                                            alt={'Icono para editar'}
                                            width={25}
                                            height={25}
                                        />
                                    </button>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault(); // Evita que el Link se active
                                        handleDeleteClick(`property-${prop.id}`);
                                    }}
                                    type="button"
                                >
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

            {/* cartel de confirmación */}
            {showConfirmModal && (
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modalContent} ${cactus.className}`}>
                        <h3>Confirmar eliminación</h3>
                        <p>¿Estás seguro de que deseas eliminar esta propiedad?</p>
                        <p>Esta acción no se puede deshacer.</p>

                        <div className={styles.modalButtons}>
                            <button
                                onClick={handleCancelDelete}
                                className={`${styles.cancelButton} ${cactus.className}`}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className={`${styles.deleteButton} ${cactus.className}`}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}