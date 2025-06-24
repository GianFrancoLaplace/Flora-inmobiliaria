import styles from "@/components/Home/Home.module.css";

export default function Home()
{
    return (
        <div className={styles.imageProperties}>
            <div className={styles.navImageProperties}/>
            <h1 className={"Titulo"}>Acerca de Nostros</h1>;
            <h3 className={"Slogan"}>Experiencia | Compromiso | Transparencia</h3>;


        </div>

    );
}