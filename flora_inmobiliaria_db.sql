--
-- PostgreSQL database dump - para importación automática
--

-- Configuración inicial
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Limpieza de objetos existentes (orden inverso de dependencias)
DROP TABLE IF EXISTS public.image CASCADE;
DROP TABLE IF EXISTS public.characteristic CASCADE;
DROP TABLE IF EXISTS public._prisma_migrations CASCADE;
DROP TABLE IF EXISTS public.admin CASCADE;
DROP TABLE IF EXISTS public.property CASCADE;

DROP SEQUENCE IF EXISTS public."Characteristic_id_characteristic_seq" CASCADE;
DROP SEQUENCE IF EXISTS public.admin_id_admin_seq CASCADE;
DROP SEQUENCE IF EXISTS public.image_id_image_seq CASCADE;
DROP SEQUENCE IF EXISTS public.property_id_property_seq CASCADE;

DROP TYPE IF EXISTS public.characteristic_category_enum CASCADE;
DROP TYPE IF EXISTS public.operation_enum CASCADE;
DROP TYPE IF EXISTS public.property_type_enum CASCADE;

-- Creación de tipos ENUM
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

CREATE TYPE public.operation_enum AS ENUM (
    'alquiler',
    'venta'
);

CREATE TYPE public.property_type_enum AS ENUM (
    'casa',
    'departamento',
    'campo',
    'local_comercial',
    'lote'
);

-- Configuración de tablespace y acceso
SET default_tablespace = '';
SET default_table_access_method = heap;

-- Creación de secuencias
CREATE SEQUENCE public.admin_id_admin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.property_id_property_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public."Characteristic_id_characteristic_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.image_id_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Tabla admin
CREATE TABLE public.admin (
                              id_admin integer NOT NULL DEFAULT nextval('public.admin_id_admin_seq'::regclass),
                              admin_email character varying(255) NOT NULL,
                              admin_password character varying(255) NOT NULL,

                              CONSTRAINT admin_pkey PRIMARY KEY (id_admin)
);

ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admin.id_admin;

-- Tabla property
CREATE TABLE public.property (
                                 id_property integer NOT NULL DEFAULT nextval('public.property_id_property_seq'::regclass),
                                 description text,
                                 price integer NOT NULL,
                                 type public.property_type_enum NOT NULL,
                                 category public.operation_enum NOT NULL,
                                 address text,
                                 ubication text,
                                 city text,

                                 CONSTRAINT property_pkey PRIMARY KEY (id_property)
);

ALTER SEQUENCE public.property_id_property_seq OWNED BY public.property.id_property;

-- Tabla characteristic con constraints corregidas
CREATE TABLE public.characteristic (
                                       id_characteristic integer NOT NULL DEFAULT nextval('public."Characteristic_id_characteristic_seq"'::regclass),
                                       characteristic character varying(255) NOT NULL,
                                       property_id integer NOT NULL,
                                       category public.characteristic_category_enum DEFAULT 'otros'::public.characteristic_category_enum,
                                       data_type VARCHAR(20) NOT NULL,
                                       value_integer INTEGER,
                                       value_text TEXT,

    -- Constraints nombradas para mejor manejo
                                       CONSTRAINT characteristic_pkey PRIMARY KEY (id_characteristic),
                                       CONSTRAINT check_data_type_values CHECK (data_type IN ('integer', 'text')),
                                       CONSTRAINT check_single_value CHECK (
                                           (CASE WHEN value_integer IS NOT NULL THEN 1 ELSE 0 END +
                                            CASE WHEN value_text IS NOT NULL THEN 1 ELSE 0 END) = 1
                                           ),
                                       CONSTRAINT check_data_type_consistency CHECK (
                                           (data_type = 'integer' AND value_integer IS NOT NULL) OR
                                           (data_type = 'text' AND value_text IS NOT NULL)
                                           ),
    -- Foreign key
                                       CONSTRAINT characteristic_property_id_fkey
                                           FOREIGN KEY (property_id) REFERENCES public.property(id_property)
                                               ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER SEQUENCE public."Characteristic_id_characteristic_seq" OWNED BY public.characteristic.id_characteristic;

-- Tabla image
CREATE TABLE public.image (
                              id_image integer NOT NULL DEFAULT nextval('public.image_id_image_seq'::regclass),
                              url text,
                              id_property integer,

                              CONSTRAINT image_pkey PRIMARY KEY (id_image),
                              CONSTRAINT fk_image_property
                                  FOREIGN KEY (id_property) REFERENCES public.property(id_property)
                                      ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER SEQUENCE public.image_id_image_seq OWNED BY public.image.id_image;

-- Tabla para migraciones de Prisma
CREATE TABLE public._prisma_migrations (
                                           id character varying(36) NOT NULL,
                                           checksum character varying(64) NOT NULL,
                                           finished_at timestamp with time zone,
                                           migration_name character varying(255) NOT NULL,
                                           logs text,
                                           rolled_back_at timestamp with time zone,
                                           started_at timestamp with time zone DEFAULT now() NOT NULL,
                                           applied_steps_count integer DEFAULT 0 NOT NULL,

                                           CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
);

-- Inserción de datos
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES
    ('d6148756-b722-4ef7-ba6c-2548d8dd4241', 'e0063a6570196c2a449a8e6693743c7bef6d543b58d8753a4be99102d2ba2905', '2025-07-10 20:25:35.402893-03', '20250710_init', NULL, NULL, '2025-07-10 20:25:35.402893-03', 0),
    ('96f5fa08-5fcc-4e74-bfb5-dc21433c8ae7', '38cde79c20b6dda83d29e86d0b477c1312042783749356f1f6b2bcd2ee544f43', '2025-07-10 21:46:48.746605-03', '20250710_add_characteristic_category', NULL, NULL, '2025-07-10 21:46:48.746605-03', 0);

INSERT INTO public.admin (id_admin, admin_email, admin_password) VALUES
    (1, 'admin@inmobiliaria.com', 'password123'),
    (2, 'milagrosalvarez2604@gmail.com', '$2a$12$9MM5lHxOkGEA7Fu0/dv/l.086E8XBjDaGiNiyfylUGBnzbW4UBNEO');

INSERT INTO public.property (id_property, description, price, type, category, address, ubication, city) VALUES
    (13, 'Departamento de 2 ambientes en pleno centro, totalmente amoblado, con balcón y excelente vista.', 45000, 'lote', 'alquiler', 'Pinto 567', 'Microcentro', 'Tandil'),
    (14, 'Terreno urbano de 500m² en zona residencial, apto para construcción, con todos los servicios.', 25000000, 'lote', 'venta', 'Calle Las Flores 890', 'Barrio Villa Aguirre', 'Tandil'),
    (15, 'Casa quinta con piscina, 4 dormitorios, quincho y amplio parque. Perfecta para descanso.', 120000, 'departamento', 'alquiler', 'Ruta 226 Km 8', 'Zona Rural', 'Tandil'),
    (16, 'Local comercial en pleno centro, 50m², ideal para oficina o comercio. Muy buena ubicación.', 80000, 'local_comercial', 'alquiler', 'Av. Espora 345', 'Centro Comercial', 'Tandil');-- Características numéricas

INSERT INTO public.characteristic (id_characteristic, characteristic, property_id, category, data_type, value_integer) VALUES
    -- Superficies
    (194, 'Superficie cubierta', 13, 'superficie_cubierta', 'integer', 180),
    (195, 'Superficie descubierta', 14, 'superficie_descubierta', 'integer', 70),
    (209, 'Superficie total', 13, 'superficie_total', 'integer', 55),
    (210, 'Superficie cubierta', 14, 'superficie_cubierta', 'integer', 55),
    (230, 'Superficie total', 14, 'superficie_total', 'integer', 800),
    (231, 'Superficie cubierta', 14, 'superficie_cubierta', 'integer', 200),
    (232, 'Superficie semicubierta', 14, 'superficie_semicubierta', 'integer', 50),
    (233, 'Superficie descubierta', 14, 'superficie_descubierta', 'integer', 550),
    (251, 'Superficie total', 15, 'superficie_total', 'integer', 50),
    (252, 'Superficie cubierta', 15, 'superficie_cubierta', 'integer', 50),
    (265, 'Superficie total', 16, 'superficie_total', 'integer', 120),
    (266, 'Superficie cubierta', 16, 'superficie_cubierta', 'integer', 100),
    (267, 'Superficie descubierta', 16, 'superficie_descubierta', 'integer', 20),
    -- Ambientes y espacios
    (196, 'Ambientes', 15, 'ambientes', 'integer', 6),
    (211, 'Ambientes', 15, 'ambientes', 'integer', 2),
    (234, 'Ambientes', 14, 'ambientes', 'integer', 8),
    (253, 'Ambientes', 15, 'ambientes', 'integer', 2),
    (268, 'Ambientes', 16, 'ambientes', 'integer', 5),
    -- Dormitorios
    (197, 'Dormitorios', 16, 'dormitorios', 'integer', 3),
    (212, 'Dormitorios', 16, 'dormitorios', 'integer', 1),
    (235, 'Dormitorios', 14, 'dormitorios', 'integer', 4),
    (269, 'Dormitorios', 16, 'dormitorios', 'integer', 3),
    (270, 'Dormitorios suite', 16, 'dormitorios_suite', 'integer', 1),
    -- Baños
    (213, 'Baños', 16, 'banos', 'integer', 1),
    (254, 'Baños', 15, 'banos', 'integer', 1),
    (271, 'Baños', 16, 'banos', 'integer', 2),
    -- Cocheras
    (272, 'Cocheras', 16, 'cocheras', 'integer', 1),
    (200, 'Cobertura cochera', 13, 'cobertura_cochera', 'integer', 1),
    (273, 'Cobertura cochera', 16, 'cobertura_cochera', 'integer', 1),
    -- Plantas
    (201, 'Cantidad de plantas', 14, 'cantidad_plantas', 'integer', 1),
    (274, 'Cantidad de plantas', 16, 'cantidad_plantas', 'integer', 2);

-- Características textuales
INSERT INTO public.characteristic (id_characteristic, characteristic, property_id, category, data_type, value_text) VALUES
    -- Tipos de piso
    (202, 'Cerámica', 15, 'tipo_piso', 'text', 'Cerámica'),
    (243, 'Cerámica', 14, 'tipo_piso', 'text', 'Cerámica'),
    (275, 'Porcelanato', 16, 'tipo_piso', 'text', 'Porcelanato'),
    -- Estado del inmueble
    (203, 'Muy bueno', 16, 'estado_inmueble', 'text', 'Muy bueno'),
    (244, 'Muy bueno', 14, 'estado_inmueble', 'text', 'Muy bueno'),
    (258, 'Muy bueno', 15, 'estado_inmueble', 'text', 'Muy bueno'),
    (276, 'Excelente', 16, 'estado_inmueble', 'text', 'Excelente'),
    -- Disposición
    (206, 'Frente', 13, 'disposicion', 'text', 'Frente'),
    (279, 'Frente', 16, 'disposicion', 'text', 'Frente'),
    -- Antigüedad
    (207, '15 años', 14, 'antiguedad', 'text', '15 años'),
    (280, 'A estrenar', 16, 'antiguedad', 'text', 'A estrenar'),
    -- Ubicación en cuadra
    (208, 'Esquina', 15, 'ubicacion_cuadra', 'text', 'Esquina'),
    (228, 'Esquina', 13, 'ubicacion_cuadra', 'text', 'Esquina'),
    (263, 'Media cuadra', 15, 'ubicacion_cuadra', 'text', 'Media cuadra'),
    (281, 'Media cuadra', 16, 'ubicacion_cuadra', 'text', 'Media cuadra'),
    -- Luminosidad
    (227, 'Muy luminoso', 13, 'luminosidad', 'text', 'Muy luminoso'),
    (260, 'Muy luminoso', 15, 'luminosidad', 'text', 'Muy luminoso'),
    (278, 'Muy luminoso', 16, 'luminosidad', 'text', 'Muy luminoso'),
    -- Orientación
    (245, 'Sur', 14, 'orientacion', 'text', 'Sur'),
    (277, 'Este', 16, 'orientacion', 'text', 'Este'),
    -- Otros
    (229, 'Terreno baldío', 13, 'otros', 'text', 'Terreno baldío'),
    (264, 'Ideal oficina o comercio', 15, 'otros', 'text', 'Ideal oficina o comercio'),
    (282, 'Barrio privado', 16, 'otros', 'text', 'Barrio privado');

-- Configuración de secuencias al valor actual
SELECT pg_catalog.setval('public."Characteristic_id_characteristic_seq"', 282, true);
SELECT pg_catalog.setval('public.admin_id_admin_seq', 2, true);
SELECT pg_catalog.setval('public.image_id_image_seq', 1, false);
SELECT pg_catalog.setval('public.property_id_property_seq', 17, true);