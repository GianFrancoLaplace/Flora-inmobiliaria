// app/api/propiedades/route.ts
//probar filtros: http://localhost:3000/api/properties?tipo=departamento
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/Property';
import { Characteristic } from "@/types/Characteristic";
import { mapOperationToState, mapPropertyType } from '@/helpers/PropertyMapper';
import { mapPrismaCharacteristicCategory } from '@/helpers/IconMapper';
import { PropertyUpdateData } from '@/helpers/UpdateProperty';

type PriceFilter = {
    lte?: number;
    gte?: number;
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const types = searchParams.get('tipo')?.split(',') ?? undefined;
        const operations = searchParams.get('operacion')?.split(',') ?? undefined;
        const maxValue = searchParams.get('maxValue');

        const service = new PropertyService(types, operations);
        const where = service.buildWhereClause();

        if (maxValue && !isNaN(Number(maxValue))) {
            if (where.price) {
                (where.price as PriceFilter).lte = Number(maxValue);
            } else {
                where.price = {
                    lte: Number(maxValue)
                };
            }
        }

        const propertiesRaw = await prisma.property.findMany({
            where: Object.keys(where).length > 0 ? where : undefined,
            include: {
                characteristics: true,
                images: true,
            },
        });


        const properties: Property[] = propertiesRaw.map((p) => ({
            id: p.idProperty,
            address: p.address || '',
            city: '',
            state: mapOperationToState(p.category),
            price: p.price || 0,
            description: p.description || '',
            type: mapPropertyType(p.type),
            characteristics: p.characteristics.map((c): Characteristic => ({
                id: c.idCharacteristic,
                characteristic: c.characteristic,
                data_type: c.dataType === 'integer' ? 'integer' : 'text',
                value_integer: c.valueInteger ?? undefined,
                value_text: c.valueText?.trim() || undefined,
                category: mapPrismaCharacteristicCategory(c.category || null),
            })),
            ubication: p.ubication || '',

            images: (() => {
                const mainimage = p.images[0];
                return mainimage ? [{ id: mainimage.idImage, url: mainimage.url! }] : [];
            })(),
        }));



        return NextResponse.json(properties);
    } catch (error) {
        console.error('Error en GET /api/properties:', error);
        return new NextResponse('Error al obtener propiedades', { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {

        const body: PropertyUpdateData = await request.json();
        const service = new PropertyService([], []);

        const validationErrors = service.verifyFields(body);

        if (validationErrors.length > 0) {
            return NextResponse.json(
                {
                    message: 'Datos de propiedad inválidos',
                    errors: validationErrors
                },
                { status: 400 }
            );
        }

        const property = await request.json();

        const result = await service.createProperty(property);

        if (result.errors) {
            return NextResponse.json({ errors: result.errors }, { status: 400 });
        }

        return NextResponse.json(result.property, { status: 201 });

    } catch (e) {
        console.error(e);
        return new NextResponse('El servidor falló al procesar la solicitud', { status: 500 });
    }
}