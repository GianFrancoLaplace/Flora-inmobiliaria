// src/auth.ts

import NextAuth from 'next-auth';
import type { User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User as AppUser } from '@/types/Property';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

async function getUser(email: string): Promise<AppUser | undefined> {
    try {
        const users = await sql<AppUser[]>`SELECT * FROM admin WHERE admin_email=${email}`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials): Promise<NextAuthUser | null> {
                console.log('\n--- INICIO DE DEBUG DE AUTORIZACIÓN ---');

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.log('Error: La validación de Zod falló.');
                    console.log('--- FIN DE DEBUG ---\n');
                    return null;
                }

                const { email, password: inputPassword } = parsedCredentials.data;
                console.log(`Paso 1: Credenciales recibidas del formulario.`);
                console.log(`   - Email: ${email}`);
                console.log(`   - Contraseña introducida: ${inputPassword}`);

                const userFromDb = await getUser(email);

                if (!userFromDb) {
                    console.log(`Error: No se encontró ningún usuario con el email: ${email}`);
                    console.log('--- FIN DE DEBUG ---\n');
                    return null;
                }

                console.log(`Paso 2: Usuario encontrado en la base de datos.`);
                console.log(`   - Email en BD: ${userFromDb.admin_email}`);
                console.log(`   - Hash de contraseña en BD: ${userFromDb.admin_password}`);

                console.log('Paso 3: Comparando contraseñas...');
                const passwordsMatch = await bcrypt.compare(inputPassword, userFromDb.admin_password);
                console.log(`   - ¿Coinciden las contraseñas?: ${passwordsMatch}`);

                if (passwordsMatch) {
                    console.log('Éxito: Las contraseñas coinciden. Devolviendo usuario.');
                    console.log('--- FIN DE DEBUG ---\n');
                    return {
                        id: userFromDb.id_admin.toString(),
                        email: userFromDb.admin_email,
                        name: userFromDb.admin_email,
                    };
                }
                console.log('Error: Las contraseñas NO coinciden. Devolviendo null.');
                console.log('--- FIN DE DEBUG ---\n');
                return null;
            },
        }),
    ],
});