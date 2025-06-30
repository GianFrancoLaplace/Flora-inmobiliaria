import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        
        // Convierte a número si tu ID es numérico
        const propertyId = parseInt(id);
        
        // Si tu ID es string, usa directamente: id
        const propiedad = await prisma.property.findUnique({
            where: {
                id_property: propertyId // o id: id si es string
            }
        });

        if (!propiedad) {
            return NextResponse.json(
                { message: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(propiedad);
    } catch (error) {
        console.error('Error al obtener la propiedad:', error);
        return NextResponse.json(
            { message: 'Error al obtener la propiedad' },
            { status: 500 }
        );
    }
}
