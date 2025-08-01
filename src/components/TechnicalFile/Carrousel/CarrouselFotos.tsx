'use client';

import Image from 'next/image';
import { useState } from "react";
import styles from "./CarrouselFotos.module.css";
import { Property } from "@/types/Property";
import useAdminImages from '@/hooks/AdminImages';

type Prop = {
  isEditableFile: boolean;
  property: Property;
};

export default function CarrouselFotos({ isEditableFile, property }: Prop) {
  const [actual, setActual] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<any>(null);
  const [images, setImages] = useState(property.images);

  const {
    createImage,
    deleteImage,
    loading: uploading,
  } = useAdminImages();

  const handleDeleteClick = (image: any) => {
    setImageToDelete(image);
    setShowConfirmModal(true);
  };
  const handleCancelDelete = () => {
    setImageToDelete(null);
    setShowConfirmModal(false);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await createImage(property.id, file);
      if (result) {
        alert('Imagen subida exitosamente!');
        setImages((prev: any[]) => [...prev, result]); // agregamos la nueva imagen al estado
        setActual(images.length); // nos movemos a la nueva imagen
      }
    } catch (err) {
      console.error(err);
      alert('Error al subir la imagen');
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!imageToDelete) return;

    const result = await deleteImage(property.id, imageToDelete.id);
    if (result) {
      alert('Imagen eliminada correctamente');
      const newImages = images.filter((img) => img.id !== imageToDelete.id);

      setImages(newImages);

      // Acomodar el índice actual
      if (actual >= newImages.length) {
        setActual(Math.max(0, newImages.length - 1));
      }

      setShowConfirmModal(false);
      setImageToDelete(null);
    }
  };


  const next = () => setActual((prev) => (prev + 1) % images.length);
  const prev = () => setActual((prev) => (prev - 1 + images.length) % images.length);

  return (
      <div className={styles.imageContainerProperties}>
        {images.length > 0 && (
            <Image
                key={images[actual].id}
                src={images[actual].url}
                alt="Imagen propiedad"
                layout="fill"
                objectFit="cover"
                className={`${styles.imageProperties} ${styles.imagePropertiesActive}`}
            />
        )}

        <div className={`${isEditableFile ? styles.containerAddImage : styles.notVisible}`}>
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
          {images.length > 0 && (
              <div>
                <button onClick={() => handleDeleteClick(images[actual].id)} className={styles.deleteIconProperties}>
                  <Image src="/icons/deleteIcon.png" alt="Ícono de eliminar" width={34} height={34} />
                </button>
              </div>
          )}

        </div>

        {showConfirmModal && imageToDelete && (
            <div className={styles.messageCardPropertie}>
              <p>¿Desea eliminar la imagen?</p>
              <p>Esta acción no se podrá deshacer.</p>
              <div className={styles.buttonMessageProperties}>
                <button onClick={handleDeleteConfirmed} disabled={imageToDelete} className={styles.aceptButtonProperties}>
                  Sí, deseo eliminarla
                </button>
                <button onClick={handleCancelDelete} className={styles.cancelButtonProperties}>
                  No, gracias
                </button>
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
  );
}
