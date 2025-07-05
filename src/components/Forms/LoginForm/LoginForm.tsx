'use client';
import styles from './LoginForm.module.css';
import { cactus } from "@/app/(views)/ui/fonts";
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function LoginForm() {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Acá podrías validar credenciales antes de redirigir
        router.push('/administracion');
    };

    return (
        <main className={styles.loginContainer}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.fieldProperties}>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="Usuario"
                        className={styles.input}
                    />
                </div>
                <div className={styles.fieldProperties}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Contraseña"
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={`${styles.loginBtn} ${cactus.className}`}>
                    Iniciar sesión
                </button>

                <h6>Inicio de sesión exclusivo para administradores</h6>
            </form>
        </main>
    );
}
