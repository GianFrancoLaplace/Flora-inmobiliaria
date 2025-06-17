    import styles from './page.module.css'
    import VentaForm from '@/components/features/VentaForm/VentaForm'
    import {cactus} from "@/app/ui/fonts";
    
    export default function QuieroVender(){
        return (
            <main className={`${styles.page} ${cactus.className}`}>
                <div className={styles.formContainerProperties}>
                    <VentaForm />
                </div>
            </main>
        )
    }