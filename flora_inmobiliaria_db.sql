--
-- PostgreSQL database dump - Corregido para pgAdmin
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

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

--
-- TOC entry 868 (class 1247 OID 16697)
-- Name: characteristic_category_enum; Type: TYPE; Schema: public; Owner: postgres
--

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

--
-- TOC entry 853 (class 1247 OID 16572)
-- Name: operation_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.operation_enum AS ENUM (
    'alquiler',
    'venta'
);

--
-- TOC entry 874 (class 1247 OID 17039)
-- Name: property_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_type_enum AS ENUM (
    'casa',
    'departamento',
    'campo',
    'local_comercial',
    'lote'
);

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16663)
-- Name: characteristic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characteristic (
    id_characteristic integer NOT NULL,
    characteristic character varying(255) NOT NULL,
    amount integer NOT NULL,
    property_id integer NOT NULL,
    category public.characteristic_category_enum DEFAULT 'otros'::public.characteristic_category_enum
);

--
-- TOC entry 221 (class 1259 OID 16662)
-- Name: Characteristic_id_characteristic_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Characteristic_id_characteristic_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 221
-- Name: Characteristic_id_characteristic_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Characteristic_id_characteristic_seq" OWNED BY public.characteristic.id_characteristic;

--
-- TOC entry 223 (class 1259 OID 16683)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);

--
-- TOC entry 220 (class 1259 OID 16587)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id_admin integer NOT NULL,
    admin_email character varying(255) NOT NULL,
    admin_password character varying(255) NOT NULL
);

--
-- TOC entry 219 (class 1259 OID 16586)
-- Name: admin_id_admin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_admin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admin.id_admin;

--
-- TOC entry 225 (class 1259 OID 16752)
-- Name: image_id_image_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 224 (class 1259 OID 16753)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id_image integer NOT NULL DEFAULT nextval('public.image_id_image_seq'::regclass),
    url text,
    id_property integer
);

--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 225
-- Name: image_id_image_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_image_seq OWNED BY public.image.id_image;

--
-- TOC entry 218 (class 1259 OID 16578)
-- Name: property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property (
    id_property integer NOT NULL,
    description text,
    price integer NOT NULL,
    property_type_id_property_type public.property_type_enum NOT NULL,
    categoria_id_category public.operation_enum NOT NULL,
    address text,
    ubication text,
    city text
);

--
-- TOC entry 217 (class 1259 OID 16577)
-- Name: property_id_property_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_id_property_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_id_property_seq OWNED BY public.property.id_property;

--
-- TOC entry 4770 (class 2604 OID 16590)
-- Name: admin id_admin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);

--
-- TOC entry 4771 (class 2604 OID 16666)
-- Name: characteristic id_characteristic; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic ALTER COLUMN id_characteristic SET DEFAULT nextval('public."Characteristic_id_characteristic_seq"'::regclass);

--
-- TOC entry 4772 (class 2604 OID 16756)
-- Name: image id_image; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN id_image SET DEFAULT nextval('public.image_id_image_seq'::regclass);

--
-- TOC entry 4769 (class 2604 OID 16581)
-- Name: property id_property; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property ALTER COLUMN id_property SET DEFAULT nextval('public.property_id_property_seq'::regclass);

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES
('d6148756-b722-4ef7-ba6c-2548d8dd4241', 'e0063a6570196c2a449a8e6693743c7bef6d543b58d8753a4be99102d2ba2905', '2025-07-10 20:25:35.402893-03', '20250710_init', NULL, NULL, '2025-07-10 20:25:35.402893-03', 0),
('96f5fa08-5fcc-4e74-bfb5-dc21433c8ae7', '38cde79c20b6dda83d29e86d0b477c1312042783749356f1f6b2bcd2ee544f43', '2025-07-10 21:46:48.746605-03', '20250710_add_characteristic_category', NULL, NULL, '2025-07-10 21:46:48.746605-03', 0);

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin (id_admin, admin_email, admin_password) VALUES
(1, 'admin@inmobiliaria.com', 'password123'),
(2, 'milagrosalvarez2604@gmail.com', '$2a$12$9MM5lHxOkGEA7Fu0/dv/l.086E8XBjDaGiNiyfylUGBnzbW4UBNEO');

--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.property (id_property, description, price, property_type_id_property_type, categoria_id_category, address, ubication, city) VALUES
(13, 'Departamento de 2 ambientes en pleno centro, totalmente amoblado, con balcón y excelente vista.', 45000, 'lote', 'alquiler', 'Pinto 567', 'Microcentro', 'Tandil'),
(14, 'Terreno urbano de 500m² en zona residencial, apto para construcción, con todos los servicios.', 25000000, 'lote', 'venta', 'Calle Las Flores 890', 'Barrio Villa Aguirre', 'Tandil'),
(15, 'Casa quinta con piscina, 4 dormitorios, quincho y amplio parque. Perfecta para descanso.', 120000, 'departamento', 'alquiler', 'Ruta 226 Km 8', 'Zona Rural', 'Tandil'),
(16, 'Local comercial en pleno centro, 50m², ideal para oficina o comercio. Muy buena ubicación.', 80000, 'local_comercial', 'alquiler', 'Av. Espora 345', 'Centro Comercial', 'Tandil');

--
-- Data for Name: characteristic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.characteristic (id_characteristic, characteristic, amount, property_id, category) VALUES
(194, 'Superficie cubierta', 180, 13, 'superficie_cubierta'),
(195, 'Superficie descubierta', 70, 14, 'superficie_descubierta'),
(196, 'Ambientes', 6, 15, 'ambientes'),
(197, 'Dormitorios', 3, 16, 'dormitorios'),
(200, 'Cobertura cochera', 1, 13, 'cobertura_cochera'),
(201, 'Cantidad de plantas', 1, 14, 'cantidad_plantas'),
(202, 'Cerámica', 0, 15, 'tipo_piso'),
(203, 'Muy bueno', 0, 16, 'estado_inmueble'),
(206, 'Frente', 0, 13, 'disposicion'),
(207, '15 años', 0, 14, 'antiguedad'),
(208, 'Esquina', 0, 15, 'ubicacion_cuadra'),
(209, 'Superficie total', 55, 13, 'superficie_total'),
(210, 'Superficie cubierta', 55, 14, 'superficie_cubierta'),
(211, 'Ambientes', 2, 15, 'ambientes'),
(212, 'Dormitorios', 1, 16, 'dormitorios'),
(213, 'Baños', 1, 16, 'banos'),
(227, 'Muy luminoso', 0, 13, 'luminosidad'),
(228, 'Esquina', 0, 13, 'ubicacion_cuadra'),
(229, 'Terreno baldío', 0, 13, 'otros'),
(230, 'Superficie total', 800, 14, 'superficie_total'),
(231, 'Superficie cubierta', 200, 14, 'superficie_cubierta'),
(232, 'Superficie semicubierta', 50, 14, 'superficie_semicubierta'),
(233, 'Superficie descubierta', 550, 14, 'superficie_descubierta'),
(234, 'Ambientes', 8, 14, 'ambientes'),
(235, 'Dormitorios', 4, 14, 'dormitorios'),
(243, 'Cerámica', 0, 14, 'tipo_piso'),
(244, 'Muy bueno', 0, 14, 'estado_inmueble'),
(245, 'Sur', 0, 14, 'orientacion'),
(251, 'Superficie total', 50, 15, 'superficie_total'),
(252, 'Superficie cubierta', 50, 15, 'superficie_cubierta'),
(253, 'Ambientes', 2, 15, 'ambientes'),
(254, 'Baños', 1, 15, 'banos'),
(258, 'Muy bueno', 0, 15, 'estado_inmueble'),
(260, 'Muy luminoso', 0, 15, 'luminosidad'),
(263, 'Media cuadra', 0, 15, 'ubicacion_cuadra'),
(264, 'Ideal oficina o comercio', 0, 15, 'otros'),
(265, 'Superficie total', 120, 16, 'superficie_total'),
(266, 'Superficie cubierta', 100, 16, 'superficie_cubierta'),
(267, 'Superficie descubierta', 20, 16, 'superficie_descubierta'),
(268, 'Ambientes', 5, 16, 'ambientes'),
(269, 'Dormitorios', 3, 16, 'dormitorios'),
(270, 'Dormitorios suite', 1, 16, 'dormitorios_suite'),
(271, 'Baños', 2, 16, 'banos'),
(272, 'Cocheras', 1, 16, 'cocheras'),
(273, 'Cobertura cochera', 1, 16, 'cobertura_cochera'),
(274, 'Cantidad de plantas', 2, 16, 'cantidad_plantas'),
(275, 'Porcelanato', 0, 16, 'tipo_piso'),
(276, 'Excelente', 0, 16, 'estado_inmueble'),
(277, 'Este', 0, 16, 'orientacion'),
(278, 'Muy luminoso', 0, 16, 'luminosidad'),
(279, 'Frente', 0, 16, 'disposicion'),
(280, 'A estrenar', 0, 16, 'antiguedad'),
(281, 'Media cuadra', 0, 16, 'ubicacion_cuadra'),
(282, 'Barrio privado', 0, 16, 'otros');

--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- No hay datos para insertar en la tabla image

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 221
-- Name: Characteristic_id_characteristic_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Characteristic_id_characteristic_seq"', 282, true);

--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_admin_seq', 2, true);

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 225
-- Name: image_id_image_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_image_seq', 1, false);

--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_id_property_seq', 17, true);

--
-- TOC entry 4780 (class 2606 OID 16668)
-- Name: characteristic Characteristic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "Characteristic_pkey" PRIMARY KEY (id_characteristic);

--
-- TOC entry 4782 (class 2606 OID 16691)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);

--
-- TOC entry 4778 (class 2606 OID 16594)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);

--
-- TOC entry 4784 (class 2606 OID 16759)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id_image);

--
-- TOC entry 4776 (class 2606 OID 16585)
-- Name: property property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_pkey PRIMARY KEY (id_property);

--
-- TOC entry 4785 (class 2606 OID 17055)
-- Name: characteristic Characteristic_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "Characteristic_property_id_fkey" FOREIGN KEY (property_id) REFERENCES public.property(id_property) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 4786 (class 2606 OID 17060)
-- Name: image fk_image_propery; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT fk_image_propery FOREIGN KEY (id_property) REFERENCES public.property(id_property) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- PostgreSQL database dump complete
--
