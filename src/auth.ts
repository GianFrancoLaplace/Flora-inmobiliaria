// src/auth.ts

import NextAuth from 'next-auth';
import type { User as NextAuthUser } from 'next-auth'; // 1. Importa el tipo User de NextAuth con un alias
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User as AppUser } from '@/lib/definitions'; // El tipo de tu app
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!); // Cambiado a DATABASE_URL para coincidir con tu .env}

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
            // 2. Aquí le decimos a authorize que lo que devuelve debe ser compatible con el User de NextAuth
            async authorize(credentials): Promise<NextAuthUser | null> {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }

                const { email, password: inputPassword } = parsedCredentials.data;
                const userFromDb = await getUser(email);

                if (!userFromDb) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(inputPassword, userFromDb.admin_password);

                if (passwordsMatch) {
                    // 3. El objeto que retornamos ahora es compatible con NextAuthUser
                    return {
                        id: userFromDb.id_admin.toString(),
                        email: userFromDb.admin_email,
                    };
                }

                return null;
            },
        }),
    ],
});