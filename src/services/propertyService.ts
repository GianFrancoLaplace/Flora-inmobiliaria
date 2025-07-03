import { PropertyTypeEnum, OperationEnum, Prisma } from '@prisma/client';

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
}
