"use client"
import styles from "./Administration.module.css";
import { cactus } from "@/app/(views)/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUnifiedFilter } from "@/hooks/GetProperties";
import { DeleteProperty } from "@/hooks/DeleteProperty";
import { useRouter } from "next/navigation";

export default function Administration() {
    const router = useRouter();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<any>(null);

    const {
        properties,
        loading,
        error,
        formatPrice,
        formatCharacteristics,
        refetchProperties,
    } = useUnifiedFilter();

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
        if (!propertyToDelete) return;
        try {
            const response = await deleteProperty(propertyToDelete.id);
            if (response) {
                await refetchProperties();
                setShowConfirmModal(false);
                setPropertyToDelete(null);
            } else {
                console.error(deleteError);
            }
        } catch (e) {
            console.error(e);
        }
    };

	if (loading) {
		return (
			<div className={`${styles.statusContainer} ${styles.statusContainerLoading}`}>
				<h3>Cargando propiedades...</h3>
			</div>
		);
	}

	if (error) {
		return (
			<div className={`${styles.statusContainer} ${styles.statusContainerError}`}>
				<h4>Error al cargar las propiedades: {error}</h4>
			</div>
		);
	}

    return (
        <div>
            <div className={`${styles.sectionProperties} ${cactus.className}`}>
                <div>
                    <Link href="/administracion/ficha/nueva?mode=create" className={styles.linkProperties}>
                        <button className={`${styles.buttonNewPublication} ${cactus.className}`}>
                            Crear publicación
                        </button>
                    </Link>
                </div>
            </div>

            {deleteError && (
                <div className={styles.errorContainer}>
                    <p>Error al eliminar: {deleteError}</p>
                </div>
            )}

	        {properties.length === 0 ? (
		        <div className={`${styles.statusContainer} ${styles.statusContainerEmpty}`}>
			        <h4>No se encontraron propiedades con los filtros aplicados.</h4>
		        </div>
	        ) : (
                properties.map((prop) => (
                    <div key={prop.id} className={`${styles.cardsProperties} ${cactus.className}`}>
                        <div className={`${styles.cardProperties} ${cactus.className}`}>
                            <div className={`${styles.imageProperties} ${cactus.className}`}>
                                <Image
                                    src={prop.images[0]?.url?.trim() || "/backgrounds/notImage.jpg"}
                                    alt="Imagen interior casa"
                                    width={285}
                                    height={175}
                                />
                            </div>

                            <Link href={`/propiedades/ficha/${prop.id}`} className={styles.linkProperties}>
                                <div className={`${styles.infoProperties} ${cactus.className}`}>
                                    <div className={styles.priceProperties}>
                                        <h2>{formatPrice(prop.price)}</h2>
                                    </div>
                                    <div className={styles.restInfoProperties}>
                                        <h4>{prop.address}, {prop.city}</h4>
                                        {/*<h4>{formatCharacteristics(prop.characteristics)}</h4>*/}
                                    </div>
                                </div>
                            </Link>

                            <div className={styles.buttonsProperties}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`/administracion/ficha/${prop.id}?mode=edit`);
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

            {showConfirmModal && propertyToDelete && (
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modalContent} ${cactus.className}`}>
                        <span>¿Desea eliminar la publicación?</span>
                        <span>Esta acción no se puede deshacer.</span>
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
