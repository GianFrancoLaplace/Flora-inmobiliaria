import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: "/login", // La página a la que se redirige si el acceso es denegado
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user; // true si el usuario ha iniciado sesión
            const isOnAdministration = nextUrl.pathname.startsWith('/administracion');

            // Caso 1: El usuario intenta acceder a la página de administración
            if (isOnAdministration) {
                if (isLoggedIn) {
                    // Si está en /Administration y ha iniciado sesión, permite el acceso.
                    return true;
                }
                return true;
            }

            else if (isLoggedIn) {

                if (nextUrl.pathname === '/login') {
                    return Response.redirect(new URL('/administracion', nextUrl));
                }
                return true;
            }


            return true;
        },
    },
    providers: [], // Los proveedores se definen en auth.ts
} satisfies NextAuthConfig;