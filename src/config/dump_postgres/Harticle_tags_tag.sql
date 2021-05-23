--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:57:08

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
-- TOC entry 235 (class 1259 OID 361624)
-- Name: article_tags_tag; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.article_tags_tag (
    "articleId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public.article_tags_tag OWNER TO yjcrmgct;

--
-- TOC entry 4021 (class 0 OID 361624)
-- Dependencies: 235
-- Data for Name: article_tags_tag; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.article_tags_tag ("articleId", "tagId") FROM stdin;
1	1
4	3
4	2
4	1
5	3
5	2
5	1
6	3
6	2
6	1
7	3
7	2
7	1
\.


--
-- TOC entry 3896 (class 2606 OID 361628)
-- Name: article_tags_tag PK_25290137c7f85b582eea2bc470d; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article_tags_tag
    ADD CONSTRAINT "PK_25290137c7f85b582eea2bc470d" PRIMARY KEY ("articleId", "tagId");


--
-- TOC entry 3893 (class 1259 OID 361630)
-- Name: IDX_5fee2a10f8d6688bd2f2c50f15; Type: INDEX; Schema: public; Owner: yjcrmgct
--

CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON public.article_tags_tag USING btree ("tagId");


--
-- TOC entry 3894 (class 1259 OID 361629)
-- Name: IDX_9b7dd28292e2799512cd70bfd8; Type: INDEX; Schema: public; Owner: yjcrmgct
--

CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON public.article_tags_tag USING btree ("articleId");


--
-- TOC entry 3898 (class 2606 OID 361646)
-- Name: article_tags_tag FK_5fee2a10f8d6688bd2f2c50f15e; Type: FK CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article_tags_tag
    ADD CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e" FOREIGN KEY ("tagId") REFERENCES public.tag(id) ON DELETE CASCADE;


--
-- TOC entry 3897 (class 2606 OID 361641)
-- Name: article_tags_tag FK_9b7dd28292e2799512cd70bfd81; Type: FK CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article_tags_tag
    ADD CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81" FOREIGN KEY ("articleId") REFERENCES public.article(id) ON DELETE CASCADE;


-- Completed on 2021-05-23 09:57:15

--
-- PostgreSQL database dump complete
--

