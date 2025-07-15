--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-12 11:09:01

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
-- TOC entry 871 (class 1247 OID 16697)
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


ALTER TYPE public.characteristic_category_enum OWNER TO postgres;

--
-- TOC entry 856 (class 1247 OID 16572)
-- Name: operation_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.operation_enum AS ENUM (
    'alquiler',
    'venta'
);


ALTER TYPE public.operation_enum OWNER TO postgres;

--
-- TOC entry 853 (class 1247 OID 16559)
-- Name: property_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_type_enum AS ENUM (
    'casa',
    'departamento',
    'campo',
    'local_comercial',
    'terreno'
);


ALTER TYPE public.property_type_enum OWNER TO postgres;

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


ALTER TABLE public.characteristic OWNER TO postgres;

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


ALTER SEQUENCE public."Characteristic_id_characteristic_seq" OWNER TO postgres;

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


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16587)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id_admin integer NOT NULL,
    admin_email character varying(255) NOT NULL,
    admin_password character varying(255) NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

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


ALTER SEQUENCE public.admin_id_admin_seq OWNER TO postgres;

--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admin.id_admin;


--
-- TOC entry 224 (class 1259 OID 16753)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id_image integer NOT NULL,
    url text,
    id_property integer
);


ALTER TABLE public.image OWNER TO postgres;

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
    ubication text
);


ALTER TABLE public.property OWNER TO postgres;

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


ALTER SEQUENCE public.property_id_property_seq OWNER TO postgres;

--
-- TOC entry 4947 (class 0 OID 0)
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
(2, 'milagrosalvarez2604@gmail.com', 'administracionlideresmgano');


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.property (id_property, description, price, property_type_id_property_type, categoria_id_category, address, ubication) VALUES
(1, 'Casa familiar con jardín amplio', 285000, 'casa', 'venta', NULL, NULL),
(2, 'Departamento moderno 2 ambientes', 120000, 'departamento', 'alquiler', NULL, NULL),
(3, 'Campo de 5 hectáreas con casa', 450000, 'campo', 'venta', NULL, NULL),
(4, 'Duplex en barrio cerrado', 195000, 'duplex', 'venta', NULL, NULL),
(5, 'Local comercial céntrico', 85000, 'local_comercial', 'alquiler', NULL, NULL);


--
-- Data for Name: characteristic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.characteristic (id_characteristic, characteristic, amount, property_id, category) VALUES
(1, 'Superficie total', 250, 1, 'superficie_total'),
(2, 'Superficie descubierta', 150, 1, 'superficie_descubierta'),
(3, 'Superficie cubierta', 100, 1, 'superficie_cubierta'),
(4, 'Ambientes', 4, 1, 'ambientes'),
(5, 'Dormitorios', 3, 1, 'dormitorios'),
(6, 'Baños', 2, 1, 'banos'),
(7, 'Cocheras', 2, 1, 'cocheras'),
(8, 'Balcón/Terraza', 1, 1, 'balcon_terraza'),
(9, 'Cantidad de plantas', 1, 1, 'cantidad_plantas'),
(10, 'Antigüedad', 5, 1, 'antiguedad'),
(11, 'Superficie total', 65, 2, 'superficie_total'),
(12, 'Superficie cubierta', 65, 2, 'superficie_cubierta'),
(13, 'Ambientes', 2, 2, 'ambientes'),
(14, 'Dormitorios', 1, 2, 'dormitorios'),
(15, 'Baños', 1, 2, 'banos'),
(16, 'Cocheras', 1, 2, 'cocheras'),
(17, 'Balcón/Terraza', 1, 2, 'balcon_terraza'),
(18, 'Expensas', 25000, 2, 'expensas'),
(19, 'Antigüedad', 2, 2, 'antiguedad'),
(20, 'Luminosidad', 1, 2, 'luminosidad'),
(21, 'Superficie total', 50000, 3, 'superficie_total'),
(22, 'Superficie descubierta', 49500, 3, 'superficie_descubierta'),
(23, 'Superficie cubierta', 500, 3, 'superficie_cubierta'),
(24, 'Ambientes', 6, 3, 'ambientes'),
(25, 'Dormitorios', 4, 3, 'dormitorios'),
(26, 'Dormitorios suite', 1, 3, 'dormitorios_suite'),
(27, 'Baños', 3, 3, 'banos'),
(28, 'Cocheras', 3, 3, 'cocheras'),
(29, 'Cobertura cochera', 1, 3, 'cobertura_cochera'),
(30, 'Agua', 1, 3, 'agua'),
(31, 'Cantidad de plantas', 1, 3, 'cantidad_plantas'),
(32, 'Antigüedad', 15, 3, 'antiguedad'),
(33, 'Superficie total', 180, 4, 'superficie_total'),
(34, 'Superficie semicubierta', 20, 4, 'superficie_semicubierta'),
(35, 'Superficie cubierta', 160, 4, 'superficie_cubierta'),
(36, 'Ambientes', 5, 4, 'ambientes'),
(37, 'Dormitorios', 3, 4, 'dormitorios'),
(38, 'Dormitorios suite', 1, 4, 'dormitorios_suite'),
(39, 'Baños', 3, 4, 'banos'),
(40, 'Cocheras', 2, 4, 'cocheras'),
(41, 'Balcón/Terraza', 2, 4, 'balcon_terraza'),
(42, 'Expensas', 45000, 4, 'expensas'),
(43, 'Cantidad de plantas', 2, 4, 'cantidad_plantas'),
(44, 'Antigüedad', 3, 4, 'antiguedad'),
(45, 'Orientación', 1, 4, 'orientacion'),
(46, 'Superficie total', 80, 5, 'superficie_total'),
(47, 'Superficie cubierta', 80, 5, 'superficie_cubierta'),
(48, 'Ambientes', 2, 5, 'ambientes'),
(49, 'Baños', 1, 5, 'banos'),
(50, 'Expensas', 15000, 5, 'expensas'),
(51, 'Agua', 1, 5, 'agua'),
(52, 'Cantidad de plantas', 1, 5, 'cantidad_plantas'),
(53, 'Tipo de piso', 1, 5, 'tipo_piso'),
(54, 'Estado del inmueble', 1, 5, 'estado_inmueble'),
(55, 'Ubicación en cuadra', 1, 5, 'ubicacion_cuadra'),
(56, 'Antigüedad', 10, 5, 'antiguedad');


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- No hay datos para insertar en la tabla image


--
-- Name: Characteristic_id_characteristic_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Characteristic_id_characteristic_seq"', 56, true);


--
-- Name: admin_id_admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_admin_seq', 2, true);


--
-- Name: property_id_property_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_id_property_seq', 5, true);


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
-- TOC entry 4785 (class 2606 OID 16669)
-- Name: characteristic Characteristic_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "Characteristic_property_id_fkey" FOREIGN KEY (property_id) REFERENCES public.property(id_property) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4786 (class 2606 OID 16760)
-- Name: image fk_image_propery; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT fk_image_propery FOREIGN KEY (id_property) REFERENCES public.property(id_property) NOT VALID;


-- Completed on 2025-07-12 11:09:02

--
-- PostgreSQL database dump complete
--