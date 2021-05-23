--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:58:38

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
-- TOC entry 230 (class 1259 OID 361590)
-- Name: session; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO yjcrmgct;

--
-- TOC entry 4017 (class 0 OID 361590)
-- Dependencies: 230
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.session (sid, sess, expire) FROM stdin;
gTwgnuFnOAkzRS-8eiLnQIyuxZ39cEtF	{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id":1,"email":"hovanvydut@gmail.com","name":"Vy Admin 1","phone":"0961882993","address":"Đà Nẵng, Việt Nam","avatar":"https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-4_kvblgd_cd1cys.png","role":1,"created_at":"2020-07-22T11:54:27.765Z","last_updated":"2020-11-03T07:57:48.060Z"}}}	2021-05-24 00:25:13
\.


--
-- TOC entry 3894 (class 2606 OID 361597)
-- Name: session PK_7575923e18b495ed2307ae629ae; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY (sid);


-- Completed on 2021-05-23 09:58:46

--
-- PostgreSQL database dump complete
--

