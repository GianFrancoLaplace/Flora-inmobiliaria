export const dynamic = "force-dynamic";
export const revalidate = 0;

import {CharacteristicCreate, CharacteristicValidationInput} from "@/types/Characteristic";
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
                    message: 'Datos de caracteristicas inválidos',
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