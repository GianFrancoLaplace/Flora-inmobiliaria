// app/api/propiedades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyService } from '@/services/propertyService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const tipos = searchParams.get('tipo')?.split(',') ?? undefined; // si hay parametros los guardo para determinar si debo obtener por filtros
  const operaciones = searchParams.get('operacion')?.split(',') ?? undefined; //uso split para indicar con que los separo en el array

  try {
    const service = new PropertyService(tipos, operaciones);
    const where = service.buildWhereClause();

    const propiedades = await prisma.property.findMany({
      where: Object.keys(where).length > 0 ? where : undefined, // si no hay filtros devuelvo todo
    });

    return NextResponse.json(propiedades);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error al obtener propiedades', { status: 500 });
  }
}