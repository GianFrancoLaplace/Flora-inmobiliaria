// app/api/propiedades/route.ts
import {NextRequest, NextResponse} from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyService } from '@/services/propertyService';
import { Property, Characteristic } from '@/types/Property';
import { mapOperationToState, mapPropertyType } from '@/helpers/PropertyMapper';
import {array} from "ts-interface-checker";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  //
  // const tipos = searchParams.get('tipo')?.split(',') ?? undefined;
  // const operaciones = searchParams.get('operacion')?.split(',') ?? undefined;
  //
  // try {
  //   const service = new PropertyService(tipos, operaciones);
  //   const where = service.buildWhereClause();
  //
  //   const propiedadesRaw = await prisma.property.findMany({
  //     where: Object.keys(where).length > 0 ? where : undefined,
  //     include: {
  //       // characteristics: true,
  //     },
  //   });

    // const propiedades: Property[] = propiedadesRaw.map((p) => ({
    //   id: p.id_property,
    //   address: p.address || '',
    //   city: '',
    //   state: mapOperationToState(p.categoria_id_category),
    //   price: p.price || 0,
    //   description: p.description || '',
    //   type: mapPropertyType(p.property_type_id_property_type),
    //   // characteristic: p.characteristic.map((c): Characteristic => ({
    //   //   id: c.id_characteristic,
    //   //   characteristic: c.characteristic,
    //   //   amount: c.amount,
    //   // })),
    // }));

  //   return NextResponse.json(propiedades);
  // } catch (error) {
  //   console.error(error);
  //   return new NextResponse('Error al obtener propiedades', { status: 500 });
  // }
}




export async function POST(request: NextRequest) {
  try{
    const body = await request.json();
    const errors : string[] = [];


    if(typeof body.address !=="string" || body.address.trim().length > 0){
      errors.push("Dirección inválida");
    }
    if(typeof body.description !=="string" || body.address.trim().length > 0){
      errors.push("Descripción inválida");
    }
    if(body.price <=0 || !isNaN(body.price)){
      errors.push("Precio inválido");
    }
    if(! Object.values(PropertyType).includes(body.property_type_id_property_type)){
      errors.push("Tipo de propiedad inválida");
    }
    if(! Object.values(PropertyState).includes(body.categoria_id_category)){
      errors.push("Categoría inválida");
    }

    if(errors.length>0){
      return NextResponse.json({errors}, {status: 400});
    }


    const newProperty = await prisma.property.create({
      data: {price : body.price,
        direction : body.address, //en schema.prisma es direction y en la db address
        description : body.description,
        property_type_id_property_type : body.property_type_id_property_type,
        categoria_id_category : body.categoria_id_category,
      },
    })

    if(newProperty == null){
      return NextResponse.json(("No se pudo crear la propiedad"), {status: 500});
    } //else, se creó correctamente

  } catch (e) {
    console.error(e);
    return new NextResponse('El servidor falló al procesar la solicitud', { status: 500 });
  }
}
