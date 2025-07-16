import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPropertyType, mapOperationToState } from '@/helpers/PropertyMapper';
import { Property, Characteristic, PropertyState, PropertyType } from '@/types/Property';
import { PropertyUpdateData, ValidationError } from "@/helpers/UpdateProperty"
import { getIconByCategory, mapPrismaCharacteristicCategory } from "@/helpers/IconMapper"

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const propertyId = parseInt(id);

        const propiedad = await prisma.property.findUnique({
            where: {
                id_property: propertyId,
            },
            include: {
                characteristics: true,
            },
        });

        if (!propiedad) {
            return NextResponse.json(
                { message: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        const propiedadFormateada: Property = {
            id: propiedad.id_property,
            address: propiedad.address || '',
            city: '',
            state: mapOperationToState(propiedad.categoria_id_category),
            price: propiedad.price,
            description: propiedad.description || '',
            type: mapPropertyType(propiedad.property_type_id_property_type),
            characteristics: propiedad.characteristics
                .filter((c) => c.amount !== null && c.amount !== 0) //valido que no se incluyan caracteristicas vacias/valor cero
                .map((c): Characteristic => {
                    const mappedCategory = mapPrismaCharacteristicCategory(c.category);
                    const iconUrl = getIconByCategory(mappedCategory);

                    console.log('Categoria DB:', c.category);
                    console.log('Categoria mapeada:', mappedCategory);
                    console.log('Icono URL:', iconUrl);

                    return {
                        id: c.id_characteristic,
                        characteristic: c.characteristic,
                        amount: c.amount,
                        category: mappedCategory,
                        iconUrl: iconUrl
                    };
                }),
            ubication: propiedad.ubication || ''
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
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const propertyId = parseInt(id);

        if (isNaN(propertyId)) {
            return NextResponse.json(
                { message: 'ID de propiedad inválido' },
                { status: 400 }
            );
        }

        const body: PropertyUpdateData = await request.json();

        const validationErrors = validatePropertyData(body);
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
            where: { id_property: propertyId }
        });

        if (!existingProperty) {
            return NextResponse.json(
                { message: 'Propiedad no encontrada' },
                { status: 404 }
            );
        }

        const updateData: Record<string, unknown> = {};

        if (body.address !== undefined) updateData.address = body.address;
        if (body.state !== undefined) updateData.estado = body.state;
        if (body.price !== undefined) updateData.precio = body.price;
        if (body.description !== undefined) updateData.descripcion = body.description;
        if (body.type !== undefined) updateData.tipo_propiedad = body.type;

        updateData.actualizado_en = new Date();

        const updatedProperty = await prisma.property.update({
            where: { id_property: propertyId },
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

function validatePropertyData(data: PropertyUpdateData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (data.address !== undefined) {
        if (typeof data.address !== 'string' || data.address.trim().length === 0) {
            errors.push({
                field: 'address',
                message: 'La dirección debe ser un texto válido y no puede estar vacía'
            });
        }
    }

    if (data.state !== undefined) {
        if (!Object.values(PropertyState).includes(data.state)) {
            errors.push({
                field: 'state',
                message: 'El estado debe ser: EN VENTA, VENDIDA, EN ALQUILER o ALQUILADA'
            });
        }
    }

    if (data.price !== undefined) {
        if (typeof data.price !== 'number' || data.price <= 0) {
            errors.push({
                field: 'price',
                message: 'El precio debe ser un número mayor a cero'
            });
        }
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string' || data.description.trim().length === 0) {
            errors.push({
                field: 'description',
                message: 'La descripción debe ser un texto válido y no puede estar vacía'
            });
        }
    }

    if (data.type !== undefined) {
        if (!Object.values(PropertyType).includes(data.type)) {
            errors.push({
                field: 'type',
                message: 'El tipo de propiedad debe ser un valor válido'
            });
        }
    }

    return errors;
}

// function validateCharacteristics(data: CharacteristicUpdateData): ValidationError[] {
//
//     const errors: ValidationError[] = [];
//
//     if (data.bedrooms !== undefined) {
//         if (!Number.isInteger(data.bedrooms) || data.bedrooms <= 0) {
//             errors.push({
//                 field: 'bedrooms',
//                 message: 'El número de dormitorios debe ser mayor a cero'
//             });
//         }
//     }
//
//     if (data.bathrooms !== undefined) {
//         if (!Number.isInteger(data.bathrooms) || data.bathrooms <= 0) {
//             errors.push({
//                 field: 'bathrooms',
//                 message: 'El número de baños debe ser mayor a cero'
//             });
//         }
//     }
//
//     if (data.squareMeters !== undefined) {
//         if (typeof data.squareMeters !== 'number' || data.squareMeters <= 0) {
//             errors.push({
//                 field: 'squareMeters',
//                 message: 'Los metros cuadrados deben ser un número mayor a cero'
//             });
//         }
//     }
//     return errors;
// }

export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;
    const propertyId = parseInt(id);
    try {
        if (isNaN(propertyId) || propertyId <= 0) {
            return NextResponse.json(
                { message: "ID inválido" },
                { status: 400 }
            );
        }

        const property = await prisma.property.findUnique({
            where: { id_property: propertyId },
        });

        if (!property) {
            return NextResponse.json(
                { message: "Propiedad no encontrada" },
                { status: 404 }
            );
        }

        await prisma.property.delete({
            where: { id_property: propertyId },
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