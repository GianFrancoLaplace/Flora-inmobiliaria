import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/magnoLogo.png"
          alt="Magno logo"
          width={198}
          height={200}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://www.figma.com/design/edBzcuBuqGyKY1sBo6IyLI/floraCordeiro?node-id=0-1&p=f&t=T85jrtBxhqXGDgcf-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Figma
          </a>
          <a
            href="https://trello.com/b/TTUjxt0R/floracordeiroinmobiliaria"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >

            Trello
          </a>
        </div>
      </main>
    </div>
  );
}
