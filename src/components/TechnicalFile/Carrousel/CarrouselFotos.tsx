'use client';

import Image from 'next/image';
import {useState} from "react";
import styles from "./CarrouselFotos.module.css";
import {Property} from "@/types/Property";

const image = ["/backgrounds/fichaBackground.jpg", "/backgrounds/fichaBackground.2.jpg", "/backgrounds/fichaBackground.3.jpg"]

type prop = {
    isEditableFile: boolean;
    property: Property
}

export default function CarrouselFotos({isEditableFile, property} : prop){
  const[actual, setActual] = useState(0);
  console.log(property)
  
  const[showConfirmModal, setShowConfirmModal] = useState(false);
  const[imageToDelete, setImageToDelete] = useState<any>(null);
  
  const handleAceptDelete = (image: any) =>{
      setImageToDelete(image);
      setShowConfirmModal(true);
  }
  
  const handleCancelDelete = ()=>{
      setImageToDelete(null);
      setShowConfirmModal(false);
  }

  const next = () => setActual((prev) => (prev + 1) % image.length);
  const prev = () => setActual((prev) => (prev - 1 + image.length) % image.length)
  return(
      <div className={styles.imageContainerProperties}>
          {image.map((img, i) => (
              <Image
                  key={i}
                  src={img}
                  alt="Imagen Us"
                  layout="fill"
                  objectFit="cover"
                  className={`${styles.imageProperties} ${i === actual ? styles.imagePropertiesActive : ''}`}
              />
          ))}
          <div className= {`${isEditableFile ? styles.containerAddImage : styles.notVisible}`}>
              <div>
                  <input type={"file"} id={"inputId"} className={styles.inputProperties}/>
                  <label htmlFor={"inputId"} className={styles.labelAddImageProperties}>Añadir imagen</label>
              </div>
              <div>
                  <button onClick={(e) => {
                      e.preventDefault();
                      handleAceptDelete("null");
                  }} className={styles.deleteIconProperties}><Image src={"/icons/deleteIcon.png"} alt={"Icono de eliminar"} width={34} height={34}/> </button>
              </div>
          </div>
          {showConfirmModal && imageToDelete && (
          <div className={styles.messageCardPropertie}>
              <p>¿Desea eliminar la imagen?</p>
              <p>Esta acción no se podrá deshacer.</p>
              <div className={styles.buttonMessageProperties}>
                  <button className={styles.aceptButtonProperties}>Si, deseo eliminarla</button>
                  <button onClick={handleCancelDelete} className={styles.cancelButtonProperties}>No, gracias</button>
              </div>
          </div>
              )
          }

          <div className={styles.buttonProperties}>
              <button onClick={prev}>
                  <Image src="/icons/IconFlechaDireccionContraria.png" alt="Icono de flecha para el carrousel" width={30} height={30} />
              </button>
              <button onClick={next}>
                  <Image src="/icons/IconFlecha.png" alt="Icono de flecha para el carrousel" width={30} height={30} />
              </button>
          </div>
      </div>
  );
}