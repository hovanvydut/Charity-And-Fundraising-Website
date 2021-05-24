--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:58:23

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
-- TOC entry 234 (class 1259 OID 361614)
-- Name: contact_message; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.contact_message (
    id integer NOT NULL,
    name character varying NOT NULL,
    info character varying NOT NULL,
    subject character varying NOT NULL,
    note character varying,
    status character varying,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contact_message OWNER TO yjcrmgct;

--
-- TOC entry 233 (class 1259 OID 361612)
-- Name: contact_message_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.contact_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_message_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 233
-- Name: contact_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.contact_message_id_seq OWNED BY public.contact_message.id;


--
-- TOC entry 3893 (class 2604 OID 361617)
-- Name: contact_message id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.contact_message ALTER COLUMN id SET DEFAULT nextval('public.contact_message_id_seq'::regclass);


--
-- TOC entry 4020 (class 0 OID 361614)
-- Dependencies: 234
-- Data for Name: contact_message; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.contact_message (id, name, info, subject, note, status, message, created_at) FROM stdin;
2	Nguyen Thanh Tung	nguyenthanhtung@gmail.com	Quyen gop ao quan	\N	\N	Minfdasf salfjsalf fdsa fdsafasf fas fsda	2020-07-30 03:50:20.691471
3	Nguyen Thanh Tung	dsafdasfd	sfdsafdsafasfdsa	\N	\N	dsasfas ff asfa	2020-07-30 03:55:11.997237
\.


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 233
-- Name: contact_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.contact_message_id_seq', 3, true);


--
-- TOC entry 3896 (class 2606 OID 361623)
-- Name: contact_message PK_1476ca9a6265a586f618ea918fd; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.contact_message
    ADD CONSTRAINT "PK_1476ca9a6265a586f618ea918fd" PRIMARY KEY (id);


-- Completed on 2021-05-23 09:58:31

--
-- PostgreSQL database dump complete
--

