import {Property} from "@/types/Property";
import {Characteristic, CharacteristicCreate, CharacteristicValidationInput} from "@/types/Characteristic";
import {CharacteristicService} from "@/services/characteristicService";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";


export async function POST(request: NextRequest) {
    try {

        const body: CharacteristicCreate = await request.json();
        const toValidate : CharacteristicValidationInput = body as CharacteristicValidationInput;
        const validationErrors = CharacteristicService.validate(toValidate);


        if (validationErrors.errors.length > 0) {
            return NextResponse.json(
                {
                    message: 'Datos de propiedad inválidos',
                    errors: validationErrors.errors.toString()
                },
                { status: 400 }
            );
        }

        const newCharacteristic = await prisma.characteristic.create({
            data: {
                characteristic: body.characteristic,
                propertyId:   body.property_id,
                category:     body.category,
                dataType:     body.data_type,
                valueInteger: body.value_integer,
                valueText:    body.value_text,
            }
        });

        if (!newCharacteristic) {
            return NextResponse.json({ errors: "error interno, fallo en el servidor/base de datos" }, { status: 500 });
        }

        return NextResponse.json(newCharacteristic, { status: 201 });

    } catch (e) {
        console.error(e);
        return new NextResponse('El servidor falló al procesar la solicitud', { status: 500 });
    }
}
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