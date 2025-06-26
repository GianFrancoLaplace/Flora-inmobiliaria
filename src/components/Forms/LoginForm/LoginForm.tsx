import styles from './LoginForm.module.css'
import {cactus} from "@/app/ui/fonts";
import Link from "next/link";

export default function LoginForm() {
    return(
        <main className={styles.loginContainer}>
            <h2>Iniciar sesión</h2>
            <form>
                <div className={styles.fieldProperties}>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username" required
                        placeholder="Usuario"
                        className={styles.input}
                    />
                </div>
                <div className={styles.fieldProperties}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password" required
                        placeholder="Contraseña"
                        className={styles.input}
                    />
                </div>
                <Link href={"/Administration"} className={styles.linkProperties}>
                    <button type="submit" className={`${styles.loginBtn} ${cactus.className}`}>Iniciar sesión</button>
                </Link>

                <h6>Inicio de sesión exclusivo para administradores</h6>
            </form>
        </main>
    )
}