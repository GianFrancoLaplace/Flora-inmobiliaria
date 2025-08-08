import {CharacteristicCategory, CharacteristicCreate, CharacteristicValidationInput,Characteristic} from "@/types/Characteristic";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {CharacteristicService} from "@/services/characteristicService";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params antes de usarlos
        const { id } = await params;
        const idProperty = parseInt(id);

        if (!idProperty) {
            return NextResponse.json(
                {message: "Id inválido"},
                {status: 400}
            )
        }

        const characteristics = await prisma.characteristic.findMany({
            where: {propertyId: idProperty},
            orderBy: {idCharacteristic: "asc"},
        });

        if (!characteristics) {
            return NextResponse.json(
                {message: "Error al obtener las carácterísticas"},
                {status: 404}
            )
        }

        const mapped = characteristics.map((c) => ({
            id: c.idCharacteristic,
            characteristic: c.characteristic,
            data_type: c.dataType === "integer" ? "integer" : "text",
            value_integer: c.valueInteger ?? undefined,
            value_text: c.valueText ?? undefined,
            category: c.category ?? undefined,
            iconUrl: undefined,
        }));

        return NextResponse.json(mapped, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {message: "Error del servidor"},
            {status: 500}
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params antes de usarlos
        const { id: idAsString } = await params;
        const id = parseInt(idAsString, 10);

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
            return NextResponse.json({errors: "el id no pertenece a ninguna caracteristica"}, {status: 404})
        }

        await prisma.characteristic.delete({
            where: {
                idCharacteristic: id
            }
        })

        return NextResponse.json({message: "caracteristica eliminada con exito"}, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar la característica:", error);
        return NextResponse.json(
            { message: 'Error interno del servidor al intentar eliminar la característica.' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } } // Corregido: ya no es una promesa
) {
    try {
        console.log("entre al put");
        const { id: idAsString } = params; // Corregido: ya no es una promesa
        const id = parseInt(idAsString, 10);

        if (isNaN(id) || id <= 0) {
            return NextResponse.json({ message: "ID inválido" }, { status: 400 });
        }

        const existing = await prisma.characteristic.findUnique({
            where: { idCharacteristic: id }
        });

        if (!existing) {
            return NextResponse.json({ message: `La característica con ID ${id} no fue encontrada.` }, { status: 404 });
        }

        const body: { value_integer?: number; value_text?: string } = await request.json();

        // --- CONSTRUCCIÓN DEL OBJETO DE VALIDACIÓN CORREGIDO ---

        // Creamos una copia del objeto existente para no modificarlo directamente
        const updatedData = { ...existing };

        // Actualizamos los valores con los que vienen del body
        if (body.value_integer !== undefined) {
            updatedData.valueInteger = body.value_integer;
        }
        if (body.value_text !== undefined) {
            updatedData.valueText = body.value_text;
        }

        // Ahora, construimos 'toValidate' asegurando la compatibilidad de tipos
        if (!updatedData.category) {
            // Si la categoría es null, la validación fallará (o la manejamos como 'otros')
            return NextResponse.json({ message: 'La característica no tiene una categoría válida para validar.' }, { status: 400 });
        }

        const toValidate: CharacteristicValidationInput = {
            characteristic: updatedData.characteristic,
            // Ahora TypeScript sabe que 'category' no es null aquí
            category: updatedData.category as CharacteristicCategory,
            // Hacemos un casting seguro porque sabemos que solo puede ser 'integer' o 'text'
            data_type: updatedData.dataType as 'integer' | 'text',
            // Convertimos null a undefined para que coincida con nuestro tipo
            value_integer: updatedData.valueInteger ?? undefined,
            value_text: updatedData.valueText ?? undefined,
        };

        const validationResult = CharacteristicService.validate(toValidate);

        if (!validationResult.isValid) {
            return NextResponse.json(
                {
                    message: 'Datos de características inválidos',
                    // Devolvemos el array, es mejor práctica
                    errors: validationResult.errors
                },
                { status: 400 }
            );
        }

        // --- FIN DE LA CORRECCIÓN ---

        const updatedCharacteristic = await prisma.characteristic.update({
            where: {
                idCharacteristic: id
            },
            data: {
                // Actualizamos con los datos del body que ya verificamos
                valueInteger: body.value_integer,
                valueText: body.value_text,
            },
        });

        return NextResponse.json({
            message: 'Característica actualizada exitosamente',
            characteristic: updatedCharacteristic
        }, { status: 200 });

    } catch (error) {
        console.error(`Error al actualizar la característica:`, error);
        return NextResponse.json({
            message: 'Error interno del servidor al actualizar la característica.'
        }, { status: 500 });
    }
}