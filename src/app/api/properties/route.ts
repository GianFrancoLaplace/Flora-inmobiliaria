// app/api/propiedades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OperationEnum, PropertyTypeEnum } from '@prisma/client';
import { PropertyService } from '@/services/propertyService';

export async function GET() {
    try {
        const propiedades = await prisma.property.findMany(); //obtiene de la base de datos todas las propiedades
        return NextResponse.json(propiedades); //las devuelve en formato json
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        return NextResponse.json(
            { message: 'Error al obtener propiedades' },
            { status: 500 }
        );
    }
}

export async function GETBYFILTERS(request: Request) {
  const { searchParams } = new URL(request.url);

  const tipos = searchParams.get('tipo')?.split(',') ?? undefined;
  const operaciones = searchParams.get('operacion')?.split(',') ?? undefined;

  try {
    const service = new PropertyService(tipos, operaciones);
    const where = service.buildWhereClause();

    const propiedades = await prisma.property.findMany({
      where,
    });

    return NextResponse.json(propiedades);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error al obtener propiedades', { status: 500 });
  }
}


