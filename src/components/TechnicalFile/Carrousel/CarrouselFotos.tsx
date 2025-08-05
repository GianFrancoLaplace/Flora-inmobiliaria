'use client';

import Image from 'next/image';
import { useState, useEffect } from "react";
import styles from "./CarrouselFotos.module.css";
import { Property } from "@/types/Property";
import useAdminImages from '@/hooks/AdminImages';

type Prop = {
    isEditableFile: boolean;
    property: Property;
    isEmptyFile: boolean;
    onImagesChange?: (images: any[]) => void;
};

type ImageFile = {
    id: string;
    url: string;
    file: File;
};

export default function CarrouselFotos({ isEditableFile, isEmptyFile, property, onImagesChange }: Prop) {
    const [actual, setActual] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<any>(null);

    const [images, setImages] = useState(property.images || []);
    const [tempImages, setTempImages] = useState<ImageFile[]>([]);

    const {
        createImage,
        deleteImage,
        loading: uploading,
    } = useAdminImages();

    useEffect(() => {
        if (onImagesChange) {
            if (isEmptyFile) {
                onImagesChange(tempImages);
            } else {
                onImagesChange(images);
            }
        }
    }, [images, tempImages, onImagesChange, isEmptyFile]);

    const handleDeleteClick = (imageIdentifier: any) => {
        setImageToDelete(imageIdentifier);
        setShowConfirmModal(true);
    };

    const handleCancelDelete = () => {
        setImageToDelete(null);
        setShowConfirmModal(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona solo archivos de imagen.');
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('La imagen es demasiado grande. Máximo 5MB.');
            return;
        }

        if (isEmptyFile) {
            try {
                const tempId = `temp-${Date.now()}-${Math.random()}`;
                const tempUrl = URL.createObjectURL(file);

                const newImage: ImageFile = {
                    id: tempId,
                    url: tempUrl,
                    file: file
                };

                setTempImages(prev => [...prev, newImage]);
                setActual(tempImages.length);
            } catch (err) {
                console.error('Error al procesar la imagen:', err);
                alert('Error al procesar la imagen');
            }
        } else {
            if (!property.id || property.id === 0) {
                alert('Error: No se puede subir la imagen sin un ID de propiedad válido.');
                return;
            }

            try {
                const result = await createImage(property.id, file);
                if (result) {
                    alert('¡Imagen subida exitosamente!');
                    setImages((prev: any[]) => [...prev, result]);
                    setActual(images.length);
                }
            } catch (err) {
                console.error(err);
                alert('Error al subir la imagen');
            }
        }
    };

  const handleDeleteConfirmed = async () => {
    if (!imageToDelete) return;

    const result = await deleteImage(property.id, images[actual].id);
    if (result) {
      alert('¡Imagen eliminada correctamente!');
      const newImages = images.filter((img) => img.id !== images[actual].id);

      setImages(newImages);

      if (actual >= newImages.length) {
        setActual(Math.max(0, newImages.length - 1));
      }

      setShowConfirmModal(false);
      setImageToDelete(null);
    }
  };


  // const handleDeleteConfirmed = async () => {
    //     if (imageToDelete === null) return;
    //
    //     if (isEmptyFile) {
    //         const indexToDelete = tempImages.findIndex(img => img.id === images[actual].id);
    //         if (indexToDelete === -1) return;
    //
    //         URL.revokeObjectURL(tempImages[indexToDelete].url);
    //
    //         const newTempImages = tempImages.filter((_, index) => index !== indexToDelete);
    //
    //         setTempImages(newTempImages);
    //
    //         if (actual >= newTempImages.length) {
    //             setActual(Math.max(0, newTempImages.length - 1));
    //         }
    //     } else {
    //         if (!property.id || property.id === 0) {
    //             alert('Error: No se puede eliminar la imagen sin un ID de propiedad válido.');
    //             return;
    //         }
    //
    //         const result = await deleteImage(property.id, imageToDelete.id);
    //         if (result) {
    //             alert('¡Imagen eliminada correctamente!');
    //             const newImages = images.filter((img) => img.id !== imageToDelete.id);
    //             setImages(newImages);
    //
    //             if (actual >= newImages.length) {
    //                 setActual(Math.max(0, newImages.length - 1));
    //             }
    //         }
    //     }
    //
    //     setShowConfirmModal(false);
    //     setImageToDelete(null);
    // };

    useEffect(() => {
        return () => {
            tempImages.forEach(img => {
                try {
                    URL.revokeObjectURL(img.url);
                } catch (error) {
                    console.warn('Error al limpiar URL temporal:', error);
                }
            });
        };
    }, [tempImages]);

    useEffect(() => {
        const currentImages = isEmptyFile ? tempImages : images;
        if (actual >= currentImages.length && currentImages.length > 0) {
            setActual(0);
        }
    }, [images, tempImages, actual, isEmptyFile]);

    const currentImages = isEmptyFile ? tempImages : images;
    const hasImages = currentImages.length > 0;
    
    const next = () => {
        if (currentImages.length > 0) {
            setActual((prev) => (prev + 1) % currentImages.length);
        }
    };

    const prev = () => {
        if (currentImages.length > 0) {
            setActual((prev) => (prev - 1 + currentImages.length) % currentImages.length);
        }
    };

    return (
        <div className={styles.imageContainerProperties}> {/* Un contenedor que englobe todo */}
            <div>
                {hasImages && actual < currentImages.length && (
                    <Image
                        key={currentImages[actual].id}
                        src={currentImages[actual].url || '/placeholder-image.jpg'}
                        alt="Imagen propiedad"
                        layout="fill"
                        objectFit="cover"
                        className={`${styles.imageProperties} ${styles.imagePropertiesActive}`}
                        onError={(e) => {
                            console.error('Error al cargar imagen:', e);
                        }}
                    />
                )}
              {hasImages && (
              <div className={`${isEditableFile? styles.containerAddImage : ""} ${isEmptyFile? styles.containerAddImageForEmptyFile : ""}`}>
                <div>
                  <input
                      type="file"
                      id="inputId"
                      className={styles.inputProperties}
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={uploading}
                  />
                  <label htmlFor="inputId" className={styles.labelAddImageProperties}>
                    {uploading ? 'Subiendo...' : 'Añadir imagen'}
                  </label>
                </div>
                {hasImages && (
                    <div>
                      <button  onClick={() => handleDeleteClick(currentImages[actual].id)} disabled={uploading} className={styles.deleteIconProperties}>
                        <Image src="/icons/deleteIcon.png" alt="Ícono de eliminar" width={34} height={34} />
                      </button>
                    </div>
                )}
              </div>
              )}


              {!hasImages && (isEditableFile || isEmptyFile) &&(
                    <div className={`${styles.containerAddImageForEmptyFile} ${styles.withoutImageProperties}`}>
                      <div>
                        <input
                            type="file"
                            id="inputId"
                            className={styles.inputProperties}
                            onChange={handleImageUpload}
                            accept="image/*"
                            disabled={uploading}
                        />
                        <label htmlFor="inputId" className={styles.labelAddImageProperties}>
                          {uploading ? 'Subiendo...' : 'Añadir imagen'}
                        </label>
                      </div>
                    </div>
                )}

                {images.length > 1 && (
                    <div className={styles.buttonProperties}>
                      <button onClick={prev}>
                        <Image src="/icons/IconFlechaDireccionContraria.png" alt="Flecha izquierda" width={30} height={30} />
                      </button>
                      <button onClick={next}>
                        <Image src="/icons/IconFlecha.png" alt="Flecha derecha" width={30} height={30} />
                      </button>
                    </div>
                )}
            </div>

          {showConfirmModal && imageToDelete && (
              <div className={styles.messageCardPropertie}>
                <p>¿Desea eliminar la imagen?</p>
                <p>Esta acción no se podrá deshacer.</p>
                <div className={styles.buttonMessageProperties}>
                  <button onClick={handleDeleteConfirmed} className={styles.aceptButtonProperties}>
                    Sí, deseo eliminarla
                  </button>
                  <button onClick={handleCancelDelete} className={styles.cancelButtonProperties}>
                    No, gracias
                  </button>
                </div>
              </div>
          )}
        </div>
    )
}