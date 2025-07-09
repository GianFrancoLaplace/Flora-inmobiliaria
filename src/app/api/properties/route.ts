// app/api/propiedades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyService } from '@/services/propertyService';
import { Property, PropertyState, PropertyType, Characteristic } from '@/types/Property'; 
import { mapOperationToState, mapPropertyType } from '@/helpers/PropertyMapper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const tipos = searchParams.get('tipo')?.split(',') ?? undefined;
  const operaciones = searchParams.get('operacion')?.split(',') ?? undefined;

  try {
    const service = new PropertyService(tipos, operaciones);
    const where = service.buildWhereClause();

    const propiedadesRaw = await prisma.property.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        characteristics: true,
      },
    });

    const propiedades: Property[] = propiedadesRaw.map((p) => ({
      id: p.id_property,
      address: p.direction || '',
      city: '', 
      state: mapOperationToState(p.categoria_id_category),
      price: p.price,
      description: p.description || '',
      type: mapPropertyType(p.property_type_id_property_type),
      characteristic: p.characteristics.map((c): Characteristic => ({
        id: c.id_characteristic,
        characteristic: c.characteristic,
        amount: c.amount,
      })),
    }));

    return NextResponse.json(propiedades);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error al obtener propiedades', { status: 500 });
  }
}

