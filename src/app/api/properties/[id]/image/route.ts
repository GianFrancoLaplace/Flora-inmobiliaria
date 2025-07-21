import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

console.log("ESTOY EN EL ROUTE DE IMAGE");
export async function POST(request: NextRequest, context: { params: { id: string } }) {
    console.log("ESTOY EN EL POST");
    const { id } = context.params;
    const propertyId = parseInt(id);
    try {

        if(isNaN(propertyId) || propertyId <= 0){
            return NextResponse.json(
                { message: "Propiedad inválida" },
                { status: 400 }
            )
        }

        const property = await prisma.property.findUnique({
            where: { id_property: propertyId },
        });

        if(!property){
            return NextResponse.json(
                { message: "Propiedad no encontrada" },
                { status: 404 }
            )
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { message: "No se encontró archivo" },
                { status: 400 }
            )
        }

        const uploadedUrl = `https://tu-storage.com/${file.name}`;

        const newImage = await prisma.image.create({
            data: {
                url: uploadedUrl,
                id_property: propertyId,
            },
        });

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Error al crear la imagen', { status: 500 });
    }
}
