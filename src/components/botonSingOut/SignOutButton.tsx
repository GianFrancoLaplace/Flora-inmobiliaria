// src/components/SignOutButton.tsx

import { handleSignOut } from '../../lib/actions';


export default function SignOutButton() {
    return (


        <form action={handleSignOut}>
            <button
                type="submit"
            >
                Cerrar Sesión
            </button>
        </form>
    );
}