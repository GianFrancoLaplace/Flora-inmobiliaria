--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-10 21:02:57

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
-- TOC entry 855 (class 1247 OID 16572)
-- Name: operation_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.operation_enum AS ENUM (
    'alquiler',
    'venta'
);


ALTER TYPE public.operation_enum OWNER TO postgres;

--
-- TOC entry 852 (class 1247 OID 16559)
-- Name: property_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_type_enum AS ENUM (
    'casa',
    'departamento',
    'campo',
    'duplex',
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
    property_id integer NOT NULL
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
-- TOC entry 4933 (class 0 OID 0)
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
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_admin_seq OWNED BY public.admin.id_admin;


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
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_id_property_seq OWNED BY public.property.id_property;


--
-- TOC entry 4763 (class 2604 OID 16590)
-- Name: admin id_admin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 16666)
-- Name: characteristic id_characteristic; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic ALTER COLUMN id_characteristic SET DEFAULT nextval('public."Characteristic_id_characteristic_seq"'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16581)
-- Name: property id_property; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property ALTER COLUMN id_property SET DEFAULT nextval('public.property_id_property_seq'::regclass);


--
-- TOC entry 4927 (class 0 OID 16683)
-- Dependencies: 223
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES 
('d6148756-b722-4ef7-ba6c-2548d8dd4241', 'e0063a6570196c2a449a8e6693743c7bef6d543b58d8753a4be99102d2ba2905', '2025-07-10 20:25:35.402893-03', '20250710_init', NULL, NULL, '2025-07-10 20:25:35.402893-03', 0);


--
-- TOC entry 4924 (class 0 OID 16587)
-- Dependencies: 220
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin (id_admin, admin_email, admin_password) VALUES 
(1, 'admin@inmobiliaria.com', 'password123');


--
-- TOC entry 4926 (class 0 OID 16663)
-- Dependencies: 222
-- Data for Name: characteristic; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- No data for characteristic table


--
-- TOC entry 4922 (class 0 OID 16578)
-- Dependencies: 218
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.property (id_property, description, price, property_type_id_property_type, categoria_id_category, address, ubication) VALUES 
(1, 'Casa familiar con jardín amplio', 285000, 'casa', 'venta', NULL, NULL),
(2, 'Departamento moderno 2 ambientes', 120000, 'departamento', 'alquiler', NULL, NULL),
(3, 'Campo de 5 hectáreas con casa', 450000, 'campo', 'venta', NULL, NULL),
(4, 'Duplex en barrio cerrado', 195000, 'duplex', 'venta', NULL, NULL),
(5, 'Local comercial céntrico', 85000, 'local_comercial', 'alquiler', NULL, NULL);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 221
-- Name: Characteristic_id_characteristic_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Characteristic_id_characteristic_seq"', 1, false);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_admin_seq', 1, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_id_property_seq', 5, true);


--
-- TOC entry 4772 (class 2606 OID 16668)
-- Name: characteristic Characteristic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "Characteristic_pkey" PRIMARY KEY (id_characteristic);


--
-- TOC entry 4774 (class 2606 OID 16691)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16594)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);


--
-- TOC entry 4768 (class 2606 OID 16585)
-- Name: property property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_pkey PRIMARY KEY (id_property);


--
-- TOC entry 4775 (class 2606 OID 16669)
-- Name: characteristic Characteristic_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characteristic
    ADD CONSTRAINT "Characteristic_property_id_fkey" FOREIGN KEY (property_id) REFERENCES public.property(id_property) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2025-07-10 21:02:58

--
-- PostgreSQL database dump complete
--