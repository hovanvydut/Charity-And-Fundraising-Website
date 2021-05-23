--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:58:51

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
-- TOC entry 225 (class 1259 OID 361547)
-- Name: tag; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tag OWNER TO yjcrmgct;

--
-- TOC entry 224 (class 1259 OID 361545)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 224
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- TOC entry 3893 (class 2604 OID 361550)
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- TOC entry 4021 (class 0 OID 361547)
-- Dependencies: 225
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.tag (id, name, slug, created_at, last_updated) FROM stdin;
1	Quyên góp	quyen-gop	2020-07-29 10:16:16.318163	2020-07-29 10:16:16.318163
2	Từ thiện	tu-thien	2020-08-17 09:17:04.535527	2020-08-17 09:17:04.535527
3	Trẻ em mồ côi	tre-em-mo-coi	2020-08-17 09:17:19.119256	2020-08-17 09:17:19.119256
\.


--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 224
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.tag_id_seq', 4, true);


--
-- TOC entry 3897 (class 2606 OID 361557)
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


-- Completed on 2021-05-23 09:59:00

--
-- PostgreSQL database dump complete
--

