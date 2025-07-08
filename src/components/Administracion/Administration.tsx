"use client"
import styles from "./Administration.module.css";
import { cactus } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Property = {
    id: number;
    precio: string;
    direccion: string;
    descripcion: string;
    imagen: string;
};

export default function Administration() {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

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

    const handleDeleteClick = (property: Property) => {
        setPropertyToDelete(property);
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setPropertyToDelete(null);
    };

    const handleConfirmDelete = () => {
        // aca se debe agregar la lógica para eliminar la propiedad
        console.log('Eliminando propiedad:', propertyToDelete);
        setShowConfirmModal(false);
        setPropertyToDelete(null);
    };

    return (
        <div>
            <div className={`${styles.sectionProperties} ${cactus.className}`}>
                <div>
                    <Link href={'/Administracion/EmptySheet'} className={styles.linkProperties}>
                        <button className={`${styles.buttonNewPublication} ${cactus.className}`}>Crear publicación</button>
                    </Link>
                    <button className={`${styles.showInactivePublication} ${cactus.className}`}>Ver publicaciones inactivas</button>
                </div>
            </div>

            {propiedades.map((prop) => (
                <div key={prop.id} className={`${styles.cardsProperties} ${cactus.className}`}>
                    <div className={`${styles.cardProperties} ${cactus.className}`}>
                        <div className={`${styles.imageProperties} ${cactus.className}`}>
                            <Image
                                src={prop.imagen}
                                alt="Imagen interior casa"
                                width={285}
                                height={175}
                            />
                        </div>

                        <Link href="/Propiedades/Sheet" className={styles.linkProperties}>
                            <div className={`${styles.infoProperties} ${cactus.className}`}>
                                <div className={styles.priceProperties}>
                                    <h5>{prop.precio}</h5>
                                </div>
                                <div className={styles.restInfoProperties}>
                                    <h5>{prop.direccion}</h5>
                                    <h5>{prop.descripcion}</h5>
                                </div>
                            </div>
                        </Link>

                        <div className={styles.buttonsProperties}>
                            <button
                                onClick={() => (window.location.href = "/Administracion/EditableSheet")}
                                type="button"
                            >
                                <Image
                                    src="/icons/iconoEdit.png"
                                    alt="Editar"
                                    width={25}
                                    height={25}
                                />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteClick(prop);
                                }}
                                type="button"
                            >
                                <Image
                                    src="/icons/deleteIcon.png"
                                    alt="Eliminar"
                                    width={25}
                                    height={25}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Cartel de confirmación */}
            {showConfirmModal && propertyToDelete && ( // Añadido check para propertyToDelete
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modalContent} ${cactus.className}`}>
                        <p>
                            ¿Desea eliminar la publicación “<span>{propertyToDelete.direccion}</span>”?
                        </p>
                        <p>Esta acción no se puede deshacer.</p>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={handleConfirmDelete}
                                className={`${styles.deleteButton} ${cactus.className}`}
                            >
                                Sí, deseo eliminarla
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className={`${styles.cancelButton} ${cactus.className}`}
                            >
                                No, gracias
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}