"use client"
import styles from "./Administration.module.css";
import { cactus } from "@/app/(views)/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUnifiedFilter } from "@/hooks/GetProperties";
import {DeleteProperty} from "@/hooks/DeleteProperty";
import router from "next/router";

export default function Administration() {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<any>(null);

    const {
        properties,
        loading,
        error,
        formatPrice,
        formatCharacteristics,
        refetchProperties,
        //removePropertyFromState
    } = useUnifiedFilter(); //llamo al hook para que se rendericen las propiedades con o sin filtros
    
    const {
        deleteProperty,
        isDeleting,
        deleteError
    } = DeleteProperty();

    const handleDeleteClick = (property: any) => {
        setPropertyToDelete(property);
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setPropertyToDelete(null);
    };

    const handleConfirmDelete = async () => {
        console.log(propertyToDelete);
        if (!propertyToDelete) return;

        try {
            const response = await deleteProperty(propertyToDelete.id);
            if(response) {
                await refetchProperties();
                setShowConfirmModal(false);
                setPropertyToDelete(null);
            } else {
                console.log(deleteError);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <p>Cargando propiedades...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>Error al cargar las propiedades: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className={`${styles.sectionProperties} ${cactus.className}`}>
                <div>
                    <Link href={'/administracion/ficha/nueva?mode=create'} className={styles.linkProperties}>
                        <button className={`${styles.buttonNewPublication} ${cactus.className}`}>
                            Crear publicación
                        </button>
                    </Link>
                    <button className={`${styles.showInactivePublication} ${cactus.className}`}>
                        Ver publicaciones inactivas
                    </button>
                </div>
            </div>

             {/* Mostrar error de eliminación si existe */}
            {deleteError && (
                <div className={styles.errorContainer}>
                    <p>Error al eliminar: {deleteError}</p>
                </div>
            )}

            {properties.length === 0 ? (
                <div className={styles.noPropertiesContainer}>
                    <p>No se encontraron propiedades con los filtros aplicados.</p>
                </div>
            ) : (
                properties.map((prop) => (
                    <div key={prop.id} className={`${styles.cardsProperties} ${cactus.className}`}>
                        <div className={`${styles.cardProperties} ${cactus.className}`}>
                            <div className={`${styles.imageProperties} ${cactus.className}`}>
                                <Image
                                    src="/imgs/interior1.jpeg"
                                    // src={prop.image}
                                    alt="Imagen interior casa"
                                    width={285}
                                    height={175}
                                />
                            </div>

                            <Link href={`/propiedades/ficha/${prop.id}`} className={styles.linkProperties}>
                                <div className={`${styles.infoProperties} ${cactus.className}`}>
                                    <div className={styles.priceProperties}>
                                        <h5>{formatPrice(prop.price)}</h5>
                                    </div>
                                    <div className={styles.restInfoProperties}>
                                        <h5>{prop.address}, {prop.city}</h5>
                                        <h5>{formatCharacteristics(prop.characteristics)}</h5>
                                    </div>
                                </div>
                            </Link>

                            <div className={styles.buttonsProperties}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`administracion/ficha/${prop.id}?mode=edit`);
                                    }}
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
                ))
            )}

            {/* Modal de confirmación */}
            {showConfirmModal && propertyToDelete && (
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modalContent} ${cactus.className}`}>
                        <p>
                            ¿Desea eliminar la publicación?
                        </p>
                        <p>Esta acción no se puede deshacer.</p>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={handleConfirmDelete}
                                className={`${styles.deleteButton} ${cactus.className}`}
                                disabled={isDeleting}
                                type="button"
                            >
                                Sí, deseo eliminarla
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className={`${styles.cancelButton} ${cactus.className}`}
                                type="button"
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