'use client';

import { useState } from 'react';
import styles from "@/components/Administracion/Administracion.module.css";
import {cactus} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Administracion()
{
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const handleDeleteClick = (propertyId) => {
        setPropertyToDelete(propertyId);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        // aca se  agrega la lógica para eliminar la propiedad
        console.log(`Eliminando propiedad ${propertyToDelete}`);

        // Cerrar el modal
        setShowConfirmModal(false);
        setPropertyToDelete(null);

        // aca se hace la llamada a la base de datos para eliminar
        // deleteProperty(propertyToDelete);
    };

    const handleCancelDelete = () => {
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
                          <Link href="FichaVacia/FichaVacia.tsx">
                            <button >
                                <Image
                                    src={'/icons/iconoEdit.png'}
                                    alt={'Icono para editar'}
                                    width={25}
                                    height={25}/>
                            </button>
                          </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault(); // Evita que el Link se active
                                    handleDeleteClick('property-1');
                                }}
                                type="button"
                            >
                                <Image
                                    src={'/icons/iconoDelete.png'}
                                    alt={'Icono para eliminar'}
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
                        <button>
                            <Image
                                src={'/icons/iconoEdit.png'}
                                alt={'Icono para editar'}
                                width={25}
                                height={25}/>
                        </button>
                        <button
                            onClick={() => handleDeleteClick('property-2')}
                            type="button"
                        >
                            <Image
                                src={'/icons/iconoDelete.png'}
                                alt={'Icono para eliminar'}
                                width={25}
                                height={25}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
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