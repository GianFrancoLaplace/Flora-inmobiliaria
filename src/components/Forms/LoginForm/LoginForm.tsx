'use client';

import styles from './LoginForm.module.css';
import { cactus } from "@/app/(views)/ui/fonts";
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {

    const [state, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <main className={styles.loginContainer}>
            <h2>Iniciar sesión</h2>

            <form action={formAction} className={styles.form}>
                <div className={styles.fieldProperties}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Email"
                        className={styles.input}
                    />

                    {state?.errors?.email &&
                        <p className={styles.error}>{state.errors.email}</p>
                    }
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
                        minLength={6}
                    />

                    {state?.errors?.password &&
                        <p className={styles.error}>{state.errors.password}</p>
                    }
                </div>

                <button
                    type="submit"
                    className={`${styles.loginBtn} ${cactus.className}`}
                    aria-disabled={isPending} 
                >
                    {isPending ? 'Iniciando...' : 'Iniciar sesión'}
                </button>


                {state?.message &&
                    <p className={styles.error}>{state.message}</p>
                }

                <h6>Inicio de sesión exclusivo para administradores</h6>
            </form>
        </main>
    )
}