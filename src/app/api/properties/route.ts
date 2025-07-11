// app/api/propiedades/route.ts
//probar filtros: http://localhost:3000/api/properties?tipo=departamento
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyService } from '@/services/propertyService';
import { Property, Characteristic, CharacteristicCategory } from '@/types/Property';
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
      address: p.address || '',
      city: '',
      state: mapOperationToState(p.categoria_id_category),
      price: p.price || 0,
      description: p.description || '',
      type: mapPropertyType(p.property_type_id_property_type),
      characteristics: p.characteristics.map((c): Characteristic => ({
        id: c.id_characteristic,
        characteristic: c.characteristic,
        amount: c.amount,
        category: CharacteristicCategory.SUPERFICIE_TOTAL
      })),
      ubication: '',
    }));

    return NextResponse.json(propiedades);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error al obtener propiedades', { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const service = new PropertyService(undefined, undefined);
    const result = await service.createProperty(body);

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    return NextResponse.json(result.property, { status: 201 });

  } catch (e) {
    console.error(e);
    return new NextResponse('El servidor falló al procesar la solicitud', { status: 500 });
  }
}
