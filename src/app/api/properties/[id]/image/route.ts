import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    const propertyId = parseInt(id);

    if (isNaN(propertyId) || propertyId <= 0) {
        return NextResponse.json({ message: 'Propiedad inválida' }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
        where: { id_property: propertyId },
    });

    if (!property) {
        return NextResponse.json({ message: 'Propiedad no encontrada' }, { status: 404 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ message: 'No se encontró archivo' }, { status: 400 });
        }

        // Convertimos File (Web API) a buffer para Node
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Subimos el archivo a Cloudinary desde el buffer
        const uploaded = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'propiedades',
                    public_id: `property_${propertyId}_${Date.now()}`,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        const cloudinaryResult = uploaded as any; // podés tiparlo con UploadApiResponse si querés

        // Guardamos la URL de Cloudinary en la base de datos
        const newImage = await prisma.image.create({
            data: {
                url: cloudinaryResult.secure_url,
                id_property: propertyId,
            },
        });

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        console.error('Error al subir imagen:', error);
        return NextResponse.json({ message: 'Error al subir imagen' }, { status: 500 });
    }
}
