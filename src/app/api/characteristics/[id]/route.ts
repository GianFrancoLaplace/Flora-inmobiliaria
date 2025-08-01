import {CharacteristicCreate, CharacteristicValidationInput} from "@/types/Characteristic";

import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {CharacteristicService} from "@/services/characteristicService";



export async function DELETE(request: NextRequest,{params}:{params:{id: string}})   {
try {
    const { id: idAsString } = params; // Desestructuramos y renombramos para claridad
    const id = parseInt(idAsString, 10); // Convertimos el string a un número base 10

    if (isNaN(id) || id <= 0) {
        return NextResponse.json(
            { message: "El ID proporcionado no es un número válido." },
            { status: 400 }
        );
    }
    const existing = await prisma.characteristic.findUnique({
        where: {
            idCharacteristic: id
        }
    })

    if (!existing) {
        return NextResponse.json({erros: "el no pertenece a ninguna caracteristica"},{status:404})
    }
    await prisma.characteristic.delete({
        where: {
            idCharacteristic: id
        }
    })
    return NextResponse.json({message: "caracteristica eliminada con exito"},{ status: 200 });
} catch (error) {
    console.error("Error al eliminar la característica:", error);

    // Manejo de errores genéricos
    return NextResponse.json(
        { message: 'Error interno del servidor al intentar eliminar la característica.' },
        { status: 500 }
    );
}
}
export async function PUT(request: NextRequest,{params}:{params:{id: string}})   {
    try {
        const { id: idAsString } = params;
        const id = parseInt(idAsString, 10);
        if (isNaN(id) || id <= 0) {
            return NextResponse.json({erros:"id invalido"},{status:500})
        }
        const existing = await prisma.characteristic.findUnique({
            where: {
                idCharacteristic: id
            }
        })
        if (!existing) {
            return NextResponse.json({erros:"el id brindado no pertenece a ninguna caracteristica"},{status:404});
        }
        const body: CharacteristicCreate = await request.json();
        const toValidate : CharacteristicValidationInput = body as CharacteristicValidationInput;
        const validationErrors = CharacteristicService.validate(toValidate);

        if (validationErrors.errors.length > 0) {
            return NextResponse.json(
                {
                    message: 'Datos de caracteristicas inválidos',
                    errors: validationErrors.errors.toString()
                },
                { status: 400 }
            );
        }
        const updatedCharacteristic = await prisma.characteristic.update({
           where: {
               idCharacteristic: id
           },
            data: {
            valueInteger: body.value_integer,
            valueText:    body.value_text,
            },
        });
        return NextResponse.json(updatedCharacteristic, { status: 200 });

    } catch (error) {
        console.error(`Error al actualizar la propiedad con ID ${params.id}:`, error);
        return NextResponse.json({ message: 'Error interno del servidor al actualizar la propiedad.' }, { status: 500 });
    }
}