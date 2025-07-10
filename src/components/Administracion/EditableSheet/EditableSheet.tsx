'use client';
import FichaPropiedad from "@/app/(views)/Propiedades/ficha/page";
import SignOutButton from '@/components/botonSingOut/SignOutButton';


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