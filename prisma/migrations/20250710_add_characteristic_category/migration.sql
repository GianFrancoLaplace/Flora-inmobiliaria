CREATE TYPE public.characteristic_category_enum AS ENUM (
    'superficie_total',
    'superficie_descubierta',
    'superficie_semicubierta',
    'superficie_cubierta',
    'ambientes',
    'dormitorios',
    'dormitorios_suite',
    'banos',
    'cocheras',
    'cobertura_cochera',
    'balcon_terraza',
    'expensas',
    'fecha_expensa',
    'agua',
    'cantidad_plantas',
    'tipo_piso',
    'estado_inmueble',
    'orientacion',
    'luminosidad',
    'disposicion',
    'antiguedad',
    'ubicacion_cuadra',
    'otros'
);

-- Agregar la columna
ALTER TABLE public.characteristic 
ADD COLUMN category public.characteristic_category_enum DEFAULT 'otros';