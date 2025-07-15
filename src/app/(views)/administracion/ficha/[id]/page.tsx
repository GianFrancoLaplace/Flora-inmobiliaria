import { notFound } from 'next/navigation';
import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import {Property} from "@/types/Property";

type Mode = 'view' | 'edit' | 'create';

type PageProps = {
    params: { id: string };
    searchParams: {mode? : Mode};
}

async function getProperty(id: string) : Promise<Property | null> {
    try {
        // Construir URL absoluta para el servidor
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/api/properties/${id}`, {
            cache: 'no-store' // Para datos que cambian frecuentemente
        });

        if (!response.ok) {
            console.error(`Error fetching property ${id}:`, response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function UnifiedPropertyPage({
                                                      params,
                                                      searchParams
                                                  }: PageProps) {
    const mode = searchParams.mode || 'view'; // Default a view

    // Manejo especial para crear nueva propiedad
    if (params.id === 'nueva') {
        if (mode !== 'create')
            notFound(); // Solo permite mode=create para nueva


        return (
            <main>
                <TechnicalSheet
                    mode="create"
                    property={null}
                />
            </main>
        );
    }

    // Para propiedades existentes
    const property = await getProperty(params.id);

    if (!property) {
        notFound();
    }

    // Validar que el mode sea apropiado
    const validModes = ['view', 'edit'];
    const finalMode = validModes.includes(mode) ? mode : 'view';

    console.log('Found ' + finalMode);

    return (
        <main>
            <TechnicalSheet
                mode={finalMode}
                property={property}
            />
        </main>
    );
}

// Metadata dinámica basada en mode
export async function generateMetadata({ params, searchParams }: PageProps) {
    const mode = searchParams.mode || 'view';

    if (params.id === 'nueva') {
        return {
            title: 'Crear Nueva Propiedad',
            description: 'Crear una nueva publicación inmobiliaria'
        };
    }

    const property = await getProperty(params.id);

    if (!property) {
        return { title: 'Propiedad no encontrada' };
    }

    const modeTexts = {
        view: 'Ver',
        edit: 'Editar',
        create: 'Crear'
    };

    return {
        title: `${modeTexts[mode]}: ${property.address}`,
        description: property.description
    };
}