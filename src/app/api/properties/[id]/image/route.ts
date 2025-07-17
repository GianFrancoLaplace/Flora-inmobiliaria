import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import {prisma} from "@/lib/prisma";

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest, context: { params: { id: string }}) {
    const { id } = context.params;
    const propertyId = parseInt(id);

    try {
        if(isNaN(propertyId) || propertyId <= 0){
            return NextResponse.json(
                { message: "Propiedad invalida" },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { message: "No se encontró archivo" },
                { status: 400 }
            );
        }

        const property = await prisma.property.findUnique({
            where: {id_property: propertyId},
        });

        if(!property){
            return NextResponse.json(
                { message: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        // Convertir archivo a buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Subir a Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "properties", // Opcional: organizar en carpetas
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        const imageUrl = uploadResponse.secure_url;

        // Guardar en la base de datos
        const newImage = await prisma.image.create({
            data: {
                url: imageUrl,
                id_property: propertyId,
                id_image: 1 // Esto debería ser auto-incrementado o único
            },
        });

        return NextResponse.json(
            { message: "Imagen agregada correctamente", image: newImage },
            { status: 200 }
        );

    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json(
            { message: "Error al procesar la imagen" },
            { status: 500 }
        );
    }
}