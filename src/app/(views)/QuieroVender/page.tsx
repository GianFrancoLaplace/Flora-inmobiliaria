import SalesForm from '@/components/Forms/SalesForm/SalesForm'
import styles from "./page.module.css";
import {cactus} from "../ui/fonts";

export default function Venta() {
    return (
        <main className={`${styles.page} ${cactus.className}`}>
            <SalesForm/>
        </main>
    )
}