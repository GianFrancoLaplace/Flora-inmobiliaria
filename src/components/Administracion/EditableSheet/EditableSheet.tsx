'use client';
import styles from "@/components/Administracion/Administration.module.css";
import {cactus} from "@/app/(views)/ui/fonts";
import SignOutButton from '@/components/botonSingOut/SignOutButton';
import FichaPropiedad from "@/app/(views)/propiedades/ficha/page";

export default function EditableSheet() {
    return(

        <main>
                <div className="mt-4">
                    {/* Aquí simplemente renderizas el botón */}
                    <SignOutButton />
                </div>


                <FichaPropiedad></FichaPropiedad>
        </main>
    )
}