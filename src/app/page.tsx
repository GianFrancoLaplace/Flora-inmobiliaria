import Image from "next/image";
import styles from "./page.module.css";

const imagesData = [
  {
    id: 1,
    src: '/images/casaEjemplo.png',
    alt: 'Casa ejemplo 1',
    width: 300,
    height: 200
  },
  {
    id: 2, // Cambié el id porque tenías dos con id: 1
    src: '/images/casaEjemplo.png',
    alt: 'Casa ejemplo 2',
    width: 300,
    height: 200
  },
  {
    id: 3, // Cambié el id porque tenías dos con id: 1
    src: '/images/casaEjemplo.png',
    alt: 'Casa ejemplo 2',
    width: 300,
    height: 200
  },
  {
    id: 4, // Cambié el id porque tenías dos con id: 1
    src: '/images/casaEjemplo.png',
    alt: 'Casa ejemplo 2',
    width: 300,
    height: 200
  },
  {
    id: 5, // Cambié el id porque tenías dos con id: 1
    src: '/images/casaEjemplo.png',
    alt: 'Casa ejemplo 2',
    width: 300,
    height: 200
  }
];

export default function Home() {
  return (
      <div className={styles.page}>
        <main className={styles.main}>

          <div className={styles.imagenesContainer}>
            <h2>Mis Imágenes</h2>
            <div className={styles.imagenesGrid}>
              {imagesData.map((image) => (
                  <div key={image.id} className={styles.imagenCard}>
                    <div className={styles.imagenWrapper}>
                      <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className={styles.imagen}
                      />
                    </div>
                  </div>
              ))}
            </div>
          </div>

        </main>
      </div>
  );
}