import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { PropertyTypeEnum, OperationEnum, Property } from '@prisma/client';

type CreatePropertyResult =
    | { errors: string[]; property?: undefined }
    | { property: Property; errors?: undefined };


interface PropertyInput {
  address: string;
  description: string;
  ubication: string;
  price: number;
  property_type_id_property_type: PropertyTypeEnum;
  categoria_id_category: OperationEnum;
  // city?: string;
}

export class PropertyService {
  private rawTipos: string[] | undefined; //defino mis array de operaciones y tipos para los filtros
  private rawOperaciones: string[] | undefined;

  constructor(tipos: string[] | undefined, operaciones: string[] | undefined) {
    this.rawTipos = tipos;
    this.rawOperaciones = operaciones;
  }

  private isValidEnumValue(value: string, enumObject: Record<string, string>): boolean { //verifica la validez de un enum
  return Object.values(enumObject).includes(value);
}

  private parseTipos(): PropertyTypeEnum[] { //parsear tipos si es necesario para que sean aptos para validaciones
    if (!this.rawTipos) return [];
    return this.rawTipos.filter(tipo => this.isValidEnumValue(tipo, PropertyTypeEnum)) as PropertyTypeEnum[];
  }

  private parseOperaciones(): OperationEnum[] { //parsear operaciones
    if (!this.rawOperaciones) return [];
    return this.rawOperaciones.filter(op => this.isValidEnumValue(op, OperationEnum)) as OperationEnum[];
  }

  public buildWhereClause(): Prisma.PropertyWhereInput { //construyo clausula where por si hay filtros, si los hay los devuelve y sino
    const tipos = this.parseTipos();                     // un where vacio para que obtenga todas las propiedades
    const operaciones = this.parseOperaciones();

    const filters: Prisma.PropertyWhereInput = {};

    if (tipos.length > 0) {
      filters.property_type_id_property_type = { in: tipos };
    }

    if (operaciones.length > 0) {
      filters.categoria_id_category = { in: operaciones };
    }

    return filters;
  }






  public async createProperty(body: PropertyInput): Promise<CreatePropertyResult> {
    const errors: string[] = [];

    if (typeof body.address !== 'string' || body.address.trim().length === 0) {
      errors.push('Dirección inválida');
    }
    if (typeof body.description !== 'string' || body.description.trim().length === 0) {
      errors.push('Descripción inválida');
    }
    if (typeof body.ubication !== 'string' || body.ubication.trim().length === 0) {
      errors.push('Ubicación inválida');
    }
    if (typeof body.price !== 'number' || body.price <= 0 || isNaN(body.price)) {
      errors.push('Precio inválido');
    }
    if (!Object.values(PropertyTypeEnum).includes(body.property_type_id_property_type)) {
      errors.push('Tipo de propiedad inválida');
    }
    if (!Object.values(OperationEnum).includes(body.categoria_id_category)) {
      errors.push('Categoría inválida');
    }

    if (errors.length > 0) {
      return { errors };
    }

    const newProperty = await prisma.property.create({
      data: {
        price: body.price,
        address: body.address,
        description: body.description,
        property_type_id_property_type: body.property_type_id_property_type,
        categoria_id_category: body.categoria_id_category,
        ubication: body.ubication,
      },
    });

    if (!newProperty) {
      return { errors: ['No se pudo crear la propiedad'] };
    }

    return { property: newProperty };
  }
}
