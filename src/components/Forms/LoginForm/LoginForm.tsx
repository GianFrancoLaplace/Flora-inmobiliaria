'use client';

import styles from './LoginForm.module.css';
import { cactus } from "@/app/ui/fonts";
import { useActionState } from 'react'; // 1. Importa el hook para manejar el estado de la acción
import { authenticate } from '@/lib/actions'; // 2. Importa tu Server Action (asegúrate de que la ruta sea correcta)

export default function LoginForm() {
    // 3. Configura el hook.
    // Recibe la acción 'authenticate' y un estado inicial 'undefined'.
    // Devuelve:
    // - state: El estado actual (los errores o mensajes que retorne tu acción)
    // - formAction: La función que debes pasar al 'action' del formulario.
    // - isPending: Un booleano que es 'true' mientras la acción se está ejecutando.
    const [state, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <main className={styles.loginContainer}>
            <h2>Iniciar sesión</h2>
            {/* 4. El 'action' del formulario ahora usa 'formAction' del hook. No necesitas 'onSubmit'. */}
            <form action={formAction} className={styles.form}>
                <div className={styles.fieldProperties}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email" // El nombre debe coincidir con el schema de Zod
                        required
                        placeholder="Email"
                        className={styles.input}
                    />
                    {/* Muestra errores específicos del campo email */}
                    {state?.errors?.email &&
                        <p className={styles.error}>{state.errors.email}</p>
                    }
                </div>

                <div className={styles.fieldProperties}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password" // El nombre debe coincidir con el schema de Zod
                        required
                        placeholder="Contraseña"
                        className={styles.input}
                        minLength={6}
                    />
                    {/* Muestra errores específicos del campo password */}
                    {state?.errors?.password &&
                        <p className={styles.error}>{state.errors.password}</p>
                    }
                </div>

                <button
                    type="submit"
                    className={`${styles.loginBtn} ${cactus.className}`}
                    aria-disabled={isPending} // 5. Deshabilita el botón mientras se procesa el login
                >
                    {isPending ? 'Iniciando...' : 'Iniciar sesión'}
                </button>

                {/* 6. Muestra el mensaje de error general (ej. "Credenciales inválidas") */}
                {state?.message &&
                    <p className={styles.error}>{state.message}</p>
                }

                <h6>Inicio de sesión exclusivo para administradores</h6>
            </form>
        </main>
    )
}