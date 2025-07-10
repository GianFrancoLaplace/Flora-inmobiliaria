 'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
// 1. Quitado el import de 'redirect' que no se usaba
import { z } from 'zod';

// Schema de validación para el login (sin cambios, está bien)
const LoginSchema = z.object({
    email: z.string().email({
        message: 'Por favor, ingresa un email válido.',
    }),
    password: z.string().min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres.',
    }),
});

// Tipo para el estado del formulario (sin cambios, está bien)
export type State = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

// Se ha eliminado la función 'authenticate' antigua y se ha renombrado
// 'authenticateWithValidation' para ser la única función de autenticación.
export async function authenticate(
    prevState: State | undefined,
    formData: FormData,
): Promise<State> {
    // Validar los campos del formulario
    const validatedFields = LoginSchema.safeParse(
        Object.fromEntries(formData.entries()),
    );

    // Si la validación falla, retornar errores
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos faltantes o inválidos. Error al iniciar sesión.',
        };
    }

    const { email, password } = validatedFields.data;

    try {
        // signIn redirigirá automáticamente al usuario en caso de éxito
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/administracion', // Puedes quitar esto si ya lo tienes en auth.config.ts
        });

        // 2. Añadido un return para satisfacer a TypeScript.
        // Este código es inalcanzable en la práctica, pero soluciona el error TS2366.
        return { message: null, errors: {} };

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { message: 'Las credenciales proporcionadas son incorrectas.' };
                default:
                    return { message: 'Algo salió mal. Por favor, inténtelo de nuevo.' };
            }
        }
        // Es MUY IMPORTANTE volver a lanzar el error si no es un AuthError.
        // Esto es lo que permite que la redirección de NextAuth funcione.
        throw error;
    }
}

// Acción única para cerrar sesión y redirigir
export async function handleSignOut() {
    await signOut({ redirectTo: '/login' });
}