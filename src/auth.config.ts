import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: "@/app/(views)/Login", // La página a la que se redirige si el acceso es denegado
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user; // true si el usuario ha iniciado sesión
            const isOnAdministration = nextUrl.pathname.startsWith('/Administracion/EditableSheet');

            // Caso 1: El usuario intenta acceder a la página de administración
            if (isOnAdministration) {
                if (isLoggedIn) {
                    // Si está en /Administration y ha iniciado sesión, permite el acceso.
                    return true;
                }
                // Si intenta entrar a /Administration sin iniciar sesión, lo redirige a /Login.
                return false;
            }

            // Caso 2: El usuario ya ha iniciado sesión
            else if (isLoggedIn) {
                // Si ya ha iniciado sesión e intenta ir a la página de Login,
                // lo redirigimos a su panel de administración.
                // Esto evita que vea la página de login si ya está autenticado.
                if (nextUrl.pathname === '/Login') {
                    return Response.redirect(new URL('/Administracion/EditableSheet', nextUrl));
                }
                // Para cualquier otra página (/, /Propiedades, etc.), permite el acceso.
                return true;
            }

            // Caso 3: El usuario no ha iniciado sesión y no está intentando acceder a /Administration.
            // Permite el acceso a todas las páginas públicas (/, /Nosotros, etc.).
            return true;
        },
    },
    providers: [], // Los proveedores se definen en auth.ts
} satisfies NextAuthConfig;