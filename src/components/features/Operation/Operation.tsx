import styles from "@/components/features/Operation/Operation.module.css";

export default function Operation(){
    return(
        <div className={styles.main}>
            <div className={`${styles.mainInfo}`}>
                <div className={styles.mainInfoH1}>
                    <h1>Av. Avellaneda 987</h1>
                    <h1>|</h1>
                    <h1>VENTA</h1>
                </div>
            </div>
        </div>
    );
}