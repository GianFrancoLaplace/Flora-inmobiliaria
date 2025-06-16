import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <footer className={styles.footer}>
        <a href="/PruebaInmobiliaria">
          Inmobiliaria
        </a>
      </footer>
    </div>
  );
}
