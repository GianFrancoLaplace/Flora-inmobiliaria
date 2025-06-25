import VenderForm from '@/components/Forms/VenderForm/VenderForm'
import styles from "@/app/Login/page.module.css";
import {cactus} from "@/app/ui/fonts";

export default function Venta() {
    return (
        <main className={`${styles.page} ${cactus.className}`}>
            <div className={styles.formContainerProperties}>
                <VenderForm/>
            </div>
        </main>
    )
}