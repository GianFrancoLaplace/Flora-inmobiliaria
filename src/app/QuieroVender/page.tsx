import SalesForm from '@/components/Forms/SalesForm/SalesForm'
import styles from "@/app/Login/page.module.css";
import {cactus} from "@/app/ui/fonts";

export default function Venta() {
    return (
        <main className={`${styles.page} ${cactus.className}`}>
            <div className={styles.formContainerProperties}>
                <SalesForm/>
            </div>
        </main>
    )
}