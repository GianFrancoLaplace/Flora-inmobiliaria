import SalesForm from '@/components/Forms/SalesForm/SalesForm'
import styles from "@/app/QuieroVender/page.module.css";
import {cactus} from "@/app/public/ui/fonts";

export default function Venta() {
    return (
        <main className={`${styles.page} ${cactus.className}`}>
            <SalesForm/>
        </main>
    )
}