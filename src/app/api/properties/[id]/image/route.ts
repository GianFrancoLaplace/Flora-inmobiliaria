import { prisma } from '@/lib/prisma';
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(request : NextRequest, context: {params: {id: string, id_property: string}}){
    const propertyId = parseInt(context.params.id_property);
    const imageId = parseInt(context.params.id);


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

export async function POST(request: NextRequest, context: {params: {id_property: string}}) {
    const propertyId = parseInt(context.params.id_property);

    try {
        if(isNaN(propertyId) || propertyId <= 0){
            return NextResponse.json(
                { message: "Propiedad invalida" },
                { status: 500 }
            );
        }

        const body = await request.json()
        const url = body.url;

        if(!url){
            return NextResponse.json(
                { message: "Falta la url de la imagen" },
                { status: 400 }
            )
        }

        const property = await prisma.property.findUnique(
            {
                where: {id_property: propertyId},
            }
        )

        if(!property){
            return NextResponse.json(
                { message: "Propiedad no encontrada" },
                { status: 400 }
            )
        }

        const newImage = await prisma.image.create({
            data: {
                url,
                id_property: propertyId,
                id_image: 1
            },
        });

        return NextResponse.json(
            { message: "Imagen agregada correctamente" + newImage},
            { status: 200 }
        )
    }
    catch (e){
        console.log(e);
        return new NextResponse('El servidor falló al procesar la solicitud', {status: 500});
    }
}