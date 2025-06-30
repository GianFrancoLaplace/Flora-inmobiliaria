--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-30 13:43:43

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
-- TOC entry 852 (class 1247 OID 16572)
-- Name: operation_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.operation_enum AS ENUM (
    'alquiler',
    'venta'
);


ALTER TYPE public.operation_enum OWNER TO postgres;

--
-- TOC entry 849 (class 1247 OID 16559)
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
-- TOC entry 4913 (class 0 OID 0)
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
    direction text,
    description text,
    price integer,
    property_type_id_property_type public.property_type_enum NOT NULL,
    categoria_id_category public.operation_enum NOT NULL,
    characteristics text[]
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
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_id_property_seq OWNED BY public.property.id_property;


--
-- TOC entry 4754 (class 2604 OID 16590)
-- Name: admin id_admin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id_admin SET DEFAULT nextval('public.admin_id_admin_seq'::regclass);


--
-- TOC entry 4753 (class 2604 OID 16581)
-- Name: property id_property; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property ALTER COLUMN id_property SET DEFAULT nextval('public.property_id_property_seq'::regclass);


--
-- TOC entry 4907 (class 0 OID 16587)
-- Dependencies: 220
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin (id_admin, admin_email, admin_password) VALUES
(1, 'admin@inmobiliaria.com', 'password123');


--
-- TOC entry 4905 (class 0 OID 16578)
-- Dependencies: 218
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.property (id_property, direction, description, price, property_type_id_property_type, categoria_id_category, characteristics) VALUES
(1, 'Av. Libertador 1234, San Isidro', 'Casa familiar con jardín amplio', 285000, 'casa', 'venta', NULL),
(2, 'Gorriti 4567, Palermo', 'Departamento moderno 2 ambientes', 120000, 'departamento', 'alquiler', NULL),
(3, 'Ruta Provincial 41 Km 15, Chascomús', 'Campo de 5 hectáreas con casa', 450000, 'campo', 'venta', NULL),
(4, 'Los Jazmines 890, Pilar', 'Duplex en barrio cerrado', 195000, 'duplex', 'venta', NULL),
(5, 'San Martín 2234, Tandil', 'Local comercial céntrico', 85000, 'local_comercial', 'alquiler', NULL);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 219
-- Name: admin_id_admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_admin_seq', 1, true);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 217
-- Name: property_id_property_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_id_property_seq', 5, true);


--
-- TOC entry 4758 (class 2606 OID 16594)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);


--
-- TOC entry 4756 (class 2606 OID 16585)
-- Name: property property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_pkey PRIMARY KEY (id_property);


-- Completed on 2025-06-30 13:43:44

--
-- PostgreSQL database dump complete
--

