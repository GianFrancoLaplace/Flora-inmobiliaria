'use client';

import Image from 'next/image';
import {useState} from "react";

const image = ["/backgrounds/fichaBackgroung", "/backgrounds/fichaBackgroung2", "/backgrounds/fichaBackgroung3"]

export default function CarrouselFotos(){
  const[actual, setActual] = useState(0);

  const next = () => setActual((prev) => (prev + 1) % image.length);
  const prev = () => setActual((prev) => (prev - 1 + image.length) % image.length)
  return(
      <div>
        <Image
            src={image[actual]}
            alt="Imagen Us"
            width={1000}          // valor de referencia
            height={200}          // altura delgada
            priority
            style={{ width: '100%' }} // esto hace que se escale al 100%
        />
        <button onClick={prev}> ◀ </button>
        <button onClick={next}> ▶ </button>
      </div>
    //   <Image
    //     src={'/icons/share.png'}
    //     alt={'Share Icon'}
    //     width={30}
    //     height={30}
    // />
  );
}