'use client';

import Image from 'next/image';
import {useState} from "react";
import styles from "./CarrouselFotos.module.css";

const image = ["/backgrounds/fichaBackground.jpg", "/backgrounds/fichaBackground.2.jpg", "/backgrounds/fichaBackground.3.jpg"]

export default function CarrouselFotos(){
  const[actual, setActual] = useState(0);

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

          <div className={styles.h}>
              <button><input type={"file"} className={styles.v}/></button>
          </div>

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