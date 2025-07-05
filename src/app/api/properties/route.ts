// app/api/propiedades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const propiedades = await prisma.property.findMany(); //obtiene de la base de datos todas las propiedades
        return NextResponse.json(propiedades); //las devuelve en formato json
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        return NextResponse.json(
            { message: 'Error al obtener propiedades' },
            { status: 500 }
        );
    }
}
