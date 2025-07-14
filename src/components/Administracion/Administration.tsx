"use client"
import styles from "./Administration.module.css";
import { cactus } from "@/app/(views)/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

    const properties: {id: number, precio: string, direccion: string, descripcion: string, imagen: string}[] = [
        {
            id: 1,
            precio: "150.000",
            direccion: "Av. Avellaneda 789",
            descripcion: "Descripción",
            imagen: "/backgrounds/fichaBackground.jpg",
        }
    ];

    /*const Administration = () => {
        const [property, setProperty] = useState(null);

        useEffect(() => {
            const fetchProperty = async () => {
                try {
                    const res = await fetch(p); // Cambiá el ID según necesites
                    const data = await res.json();
                    setProperty(data);
                } catch (err) {
                    console.error("Error al obtener la propiedad", err);
                }
            };
            fetchProperty();
        },
        []);*/

    //método que traiga las propiedades de la bbdd

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
                    <Link href={'/administracion/fichavacia'} className={styles.linkProperties}>
                        <button className={`${styles.buttonNewPublication} ${cactus.className}`}>Crear publicación</button>
                    </Link>
                    <button className={`${styles.showInactivePublication} ${cactus.className}`}>Ver publicaciones inactivas</button>
                </div>
            </div>

            {properties.map((prop) => (
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

                        <Link href="/propiedades/ficha" className={styles.linkProperties}>
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
                                onClick={() => (window.location.href = "/administracion/fichaeditable")}
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