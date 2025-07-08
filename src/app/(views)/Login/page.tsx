    import styles from './page.module.css'
    import LoginForm from '@/components/Forms/LoginForm/LoginForm'
    import {cactus} from "@/app/(views)/ui/fonts";
    
    export default function Login(){
        return (
            <main className={`${styles.page} ${cactus.className}`}>
                <div className={styles.formContainerProperties}>
                    <LoginForm />
                </div>
            </main>
        )
    }