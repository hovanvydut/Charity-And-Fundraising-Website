--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:57:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 223 (class 1259 OID 361534)
-- Name: category; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.category OWNER TO yjcrmgct;

--
-- TOC entry 222 (class 1259 OID 361532)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 222
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 3893 (class 2604 OID 361537)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 4021 (class 0 OID 361534)
-- Dependencies: 223
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.category (id, name, slug, created_at, last_updated) FROM stdin;
1	Hoạt động quyên góp, từ thiện	hoat-dong-quyen-gop-tu-thien	2020-07-29 10:16:00.155713	2020-08-17 09:27:11.892492
\.


--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 222
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- TOC entry 3897 (class 2606 OID 361544)
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


-- Completed on 2021-05-23 09:57:55

--
-- PostgreSQL database dump complete
--

