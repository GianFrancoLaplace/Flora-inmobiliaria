import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    try {
        const { id } = await params;
        const idProperty = parseInt(id);

        if(!idProperty){
            return NextResponse.json(
                {message: "Id inválido"},
                {status: 400}
            )
        }

        const characteristics = await prisma.characteristic.findMany({
            where: { propertyId: idProperty },
            orderBy: { idCharacteristic: "asc" },
        });

        if(!characteristics){
            return NextResponse.json(
                {message: "Error al obtener las carácterísticas"},
                {status: 404}
            )
        }

        return NextResponse.json(characteristics, { status: 200 });
    }
    catch (e){
        console.log(e);
        return NextResponse.json(
            {message: "Error del servidor"},
            {status: 500}
        )
    }
}