--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:59:05

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
-- TOC entry 229 (class 1259 OID 361574)
-- Name: user; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    phone character varying NOT NULL,
    address character varying NOT NULL,
    avatar character varying DEFAULT 'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-3_dh1jvk_qawoat.png'::character varying,
    role integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO yjcrmgct;

--
-- TOC entry 228 (class 1259 OID 361572)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 228
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3893 (class 2604 OID 361577)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4026 (class 0 OID 361574)
-- Dependencies: 229
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public."user" (id, email, password, name, phone, address, avatar, role, created_at, last_updated) FROM stdin;
2	moderator1@gmail.com	$2b$10$Q7Ly314L/XsZIVXpgjfxdOf5FlXe0PIuPFhzUfsUvgz15bRnGusw.	MOD 1	0961882992	Da Nang, Viet Nam	https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-1_e8giie_ikuxxm.png	2	2020-07-22 12:41:43.319018	2020-08-16 14:19:04.942221
3	moderator23@gmail.com	$2b$10$wbdZvLVD8e7gTxugiJWEXeceYiaTwC0ezezDe.nZkV4VMgvwot9cm	MOD 2	0961882922	Da Nang, Viet Nam	https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-2_poacpz_dqvof2.png	2	2020-07-29 09:33:18.595515	2020-08-16 14:58:30.356223
12	vymio84@gmail.com	$2b$10$zXU5ScRlZ4cXG9qT6dRpr..MqHSQloBy.WJ7C4oh9cBiWokmvx3Jm	Hồ Văn Vy	0961882885	Đà Nẵng, Việt Nam	https://res.cloudinary.com/dgext7ewd/image/upload/v1597595500/Charity_And_Fundraising/upload/avatar/c1okw7ll4fjwqislztrx.jpg	3	2020-08-18 15:14:41.262652	2020-08-18 15:15:18.595574
11	thnhantr@gmail.com	$2b$10$n.dSJC1m5/p6OHeBVbw11e67pt/G19r6EuVeq7yp.uw6Xyaj/Gg8i	Trần Thanh Nhàn	0906553147	Đà Nẵng, Việt Nam	http://res.cloudinary.com/dgext7ewd/image/upload/v1597764959/Charity_And_Fundraising/upload/avatar/gabpv97lhdq9w9rojs1t.jpg	3	2020-08-18 15:11:17.395114	2020-08-18 15:36:38.9664
8	tl28072001@gmail.com	$2b$10$tdT67mJrDu4KrCIHX9fBEuw2mv3a3TnxIvhwSuglg87/UT6enT5c.	Lê Phước Anh Tuấn	0935114910	Đà Nẵng, Việt Nam	http://res.cloudinary.com/dgext7ewd/image/upload/v1597763991/Charity_And_Fundraising/upload/avatar/hjwjavyw1kkqjilpoaoe.jpg	3	2020-08-18 15:08:16.704811	2020-08-18 15:20:19.36097
9	binhoang2001dn@gmail.com	$2b$10$AmfJTQwllKv7qXKDLWlg5.adR712JGkAEA9lnGsJ6Omm.A97gXgRS	Hoàng Xuân Phát	0932403248	Đà Nẵng, Việt Nam	http://res.cloudinary.com/dgext7ewd/image/upload/v1597764194/Charity_And_Fundraising/upload/avatar/aegy3ahocrghyh2i9zv3.jpg	3	2020-08-18 15:10:08.632284	2020-08-18 15:23:21.31186
13	lehuubo123@gmail.com	$2b$10$zV9wt0.pCL3HIxYG3d9b9unMYQw8UHe8vt3KyMTxpuJY6vs7VgY3C	Bơ	0961882886	Đà Nẵng, Việt Nam	http://res.cloudinary.com/dgext7ewd/image/upload/v1597764397/Charity_And_Fundraising/upload/avatar/vn6dsv72wzb0bfyxtohf.jpg	3	2020-08-18 15:17:28.508783	2020-08-18 15:26:45.442958
10	viettai1912@gmail.com	$2b$10$N6UgnPDpaEsPTu/Uj2S2y.ay8ws46mSLcACGL06eBueYWev6bv8au	Đặng Nguyễn Việt Tài	0905694438	Đà Nẵng, Việt Nam	http://res.cloudinary.com/dgext7ewd/image/upload/v1597764557/Charity_And_Fundraising/upload/avatar/w6webqoyy2e0zfvuv1qz.jpg	3	2020-08-18 15:10:39.743277	2020-08-18 15:29:24.698675
14	nphuc0281@gmail.com	$2b$10$vpsr3rkfe2tyzw.Izot1eOV6/2AktJ9duGfc.wWK13HsylnnGDQn2	Nguyễn Vũ Phúc Nguyên	0373974112	Đà Nẵng, Việt Nam	https://i.imgur.com/IQiJMKk.png	3	2020-08-18 16:01:06.02848	2020-08-18 16:29:58.161894
15	vdnace@gmail.com	$2b$10$C76wX6cLasU6vLkEi.c7O.xBpyNKMW4ZXbBHVZ3hxKX6qd.jiMRxS	Văn Đình Nhật	0768524807	Thuỷ Dương, Hương Thuỷ, TT- Huế	http://res.cloudinary.com/dgext7ewd/image/upload/v1597768434/Charity_And_Fundraising/upload/avatar/rqsqxy8nrrimkdmqfhyf.jpg	3	2020-08-18 16:20:54.956766	2020-08-18 16:34:16.193143
1	hovanvydut@gmail.com	$2b$10$Rz9ObMgNHkQxVVrele.4w.Asf4b5qj70lWRBQGM3ZBSuZmu8FA5Dy	Vy Admin 1	0961882993	Đà Nẵng, Việt Nam	https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-4_kvblgd_cd1cys.png	1	2020-07-22 11:54:27.765494	2020-11-03 07:57:48.060741
\.


--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 228
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.user_id_seq', 15, true);


--
-- TOC entry 3898 (class 2606 OID 361585)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3900 (class 2606 OID 361589)
-- Name: user UQ_8e1f623798118e629b46a9e6299; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE (phone);


--
-- TOC entry 3902 (class 2606 OID 361587)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


-- Completed on 2021-05-23 09:59:16

--
-- PostgreSQL database dump complete
--

