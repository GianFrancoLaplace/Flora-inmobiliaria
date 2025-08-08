import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPropertyType, mapOperationToState } from '@/helpers/PropertyMapper';
import { Property, PropertyUpdateData } from '@/types/Property';
import { Characteristic } from "@/types/Characteristic";
import { PropertyService } from "@/services/propertyService";
import { getIconByCategory, mapPrismaCharacteristicCategory } from "@/helpers/IconMapper"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await params antes de usarlos
        const { id } = await params;
        const propertyId = parseInt(id);

        if (isNaN(propertyId)) {
            return NextResponse.json({ message: 'ID de propiedad inválido' }, { status: 400 });
        }

        const propiedad = await prisma.property.findUnique({
            where: { idProperty : propertyId  },
            include: {
                characteristics: true,
                images: true,
            },
        });

        if (!propiedad) {
            return NextResponse.json(
                { message: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        const propiedadFormateada: Property = {
            id: propiedad.idProperty,
            address: propiedad.address || '',
            city: '',
            state: mapOperationToState(propiedad.category),
            price: propiedad.price,
            description: propiedad.description || '',
            type: mapPropertyType(propiedad.type),
            ubication: propiedad.ubication || '',
            images: propiedad.images.map((img) => ({
                id: img.idImage,
                url: img.url !== null ? img.url : "",
            })),

            characteristics: propiedad.characteristics
                .filter((c) => {
                    const isIntegerValid =
                        c.dataType === 'integer' &&
                        c.valueInteger !== null &&
                        c.valueInteger !== 0;
                    const isTextValid =
                        c.dataType === 'text' &&
                        c.valueText &&
                        c.valueText.trim() !== '';
                    return isIntegerValid || isTextValid;
                })
                .map((c): Characteristic => {
                    const mappedCategory = mapPrismaCharacteristicCategory(c.category);
                    const iconUrl = getIconByCategory(mappedCategory);

                    return {
                        id: c.idCharacteristic,
                        characteristic: c.characteristic,
                        data_type: c.dataType === 'integer' ? 'integer' : 'text',
                        value_integer:
                            c.dataType === 'integer' && c.valueInteger !== null
                                ? c.valueInteger
                                : undefined,
                        value_text:
                            c.dataType === 'text' &&
                            c.valueText &&
                            c.valueText.trim() !== ''
                                ? c.valueText.trim()
                                : undefined,
                        category: mappedCategory,
                        iconUrl: iconUrl,
                    };
                }),
        };

        return NextResponse.json(propiedadFormateada);
    } catch (error) {
        console.error('Error al obtener la propiedad:', error);
        return NextResponse.json(
            { message: 'Error al obtener la propiedad' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    console.log("PUT request received for property");
    try {
        // Await params antes de usarlos
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const propertyId = parseInt(id);

        if (isNaN(propertyId)) {
            return NextResponse.json(
                { message: 'ID de propiedad inválido' },
                { status: 400 }
            );
        }

        const body: PropertyUpdateData = await request.json();
        const service = new PropertyService([], []);

        const validationErrors = service.verifyFields(body);
        validationErrors.forEach(element => {
            console.log("error: " + element.message);
        });

        if (validationErrors.length > 0) {
            return NextResponse.json(
                {
                    message: 'Datos de propiedad inválidos',
                    errors: validationErrors
                },
                { status: 400 }
            );
        }

        const existingProperty = await prisma.property.findUnique({
            where: { idProperty: propertyId }
        });

        if (!existingProperty) {
            return NextResponse.json(
                { message: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        const updateData: Record<string, unknown> = {};

        if (body.address !== undefined) updateData.address = body.address;
        if (body.state !== undefined) updateData.category = body.state;
        if (body.price !== undefined) updateData.price = body.price;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.type !== undefined) updateData.type = body.type;

        const updatedProperty = await prisma.property.update({
            where: { idProperty: propertyId },
            data: updateData
        });

        return NextResponse.json({
            message: 'Propiedad actualizada exitosamente',
            property: updatedProperty
        });

    } catch (error) {
        console.error('Error al actualizar la propiedad:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor al actualizar la propiedad' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await params antes de usarlos
        const { id } = await params;
        const propertyId = parseInt(id);

        if (isNaN(propertyId) || propertyId <= 0) {
            return NextResponse.json(
                { message: "ID inválido" },
                { status: 400 }
            );
        }

        const property = await prisma.property.findUnique({
            where: { idProperty: propertyId },
        });

        if (!property) {
            return NextResponse.json(
                { message: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        await prisma.property.delete({
            where: { idProperty: propertyId },
        });

        return NextResponse.json(
            { message: "Propiedad eliminada" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error del servidor" },
            { status: 500 }
        );
    }
}