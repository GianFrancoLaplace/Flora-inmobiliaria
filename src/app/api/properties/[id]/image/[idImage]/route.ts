import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function DELETE(request : NextRequest, context: {params: {id: string, idImage: string}}){
    const { id } = context.params;
    const propertyId = parseInt(id);
    const { idImage } = context.params;
    const imageId = parseInt(idImage);

    try {
        if((isNaN(imageId) || imageId <= 0) || (isNaN(propertyId) || propertyId <= 0)){
            return NextResponse.json(
                { message: "Propiedad y/o imagen inválida" },
                { status: 400 }
            );
        }

        const image = await prisma.image.findUnique({
            where: { id_image: imageId },
        });

        if(!image || image.id_property !== propertyId){
            return NextResponse.json(
                { message: "Imagen o propiedad no encontrada" },
                { status: 404 }
            )
        }

        await prisma.image.delete({
            where: {id_image: imageId}
        })

        return NextResponse.json(
            { message: "Imagen eliminada" },
            { status: 200 }
        )
    }
    catch (e) {
        console.log(e);
        return new NextResponse('El servidor falló al procesar la solicitud', {status: 500});
    }
}