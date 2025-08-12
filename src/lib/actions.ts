// src/lib/actions.ts
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            // En v5, se usa 'error.type' para diferenciar los errores
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Las credenciales proporcionadas son incorrectas.';
                default:
                    return 'Algo salió mal. Por favor, inténtelo de nuevo.';
            }
        }

        throw error;
    }
}

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' });
}