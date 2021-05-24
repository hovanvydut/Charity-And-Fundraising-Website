--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:57:29

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
-- TOC entry 232 (class 1259 OID 361600)
-- Name: campaign; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.campaign (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    status character varying NOT NULL,
    thumbnail character varying DEFAULT 'https://res.cloudinary.com/dgext7ewd/image/upload/v1594021601/Charity_And_Fundraising/upload/default/default_image_sieswh.jpg'::character varying NOT NULL,
    content text,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.campaign OWNER TO yjcrmgct;

--
-- TOC entry 231 (class 1259 OID 361598)
-- Name: campaign_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.campaign_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaign_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 231
-- Name: campaign_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.campaign_id_seq OWNED BY public.campaign.id;


--
-- TOC entry 3893 (class 2604 OID 361603)
-- Name: campaign id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.campaign ALTER COLUMN id SET DEFAULT nextval('public.campaign_id_seq'::regclass);


--
-- TOC entry 4022 (class 0 OID 361600)
-- Dependencies: 232
-- Data for Name: campaign; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.campaign (id, name, description, status, thumbnail, content, slug, created_at, last_updated) FROM stdin;
1	Làng Hy Vọng	Quyên góp đồ dùng cũ cho trẻ em làng Hi Vọng	Đang phát động	http://res.cloudinary.com/dgext7ewd/image/upload/v1597657922/Charity_And_Fundraising/upload/campaign/ltujocj1pxp4txshhvfb.jpg	<p>🍀THƯ NGỎ - K&Ecirc;U GỌI QUY&Ecirc;N G&Oacute;P🍀</p>\r\n<p>K&iacute;nh gửi: Qu&yacute; Mạnh Thường Qu&acirc;n v&agrave; những tấm l&ograve;ng nh&acirc;n &aacute;i gần xa th&acirc;n mến!<br />Lời đầu ti&ecirc;n, nh&oacute;m m&igrave;nh xin gửi lời ch&uacute;c sức khỏe v&agrave; lời ch&agrave;o tr&acirc;n trọng nhất đến tất cả mọi người.<br />Mỗi con người, mỗi ho&agrave;n cảnh sinh ra v&agrave; lớn l&ecirc;n kh&aacute;c nhau, ch&uacute;ng ta được lớn l&ecirc;n trong sự y&ecirc;u thương của gia đ&igrave;nh với những điều kiện tốt để ph&aacute;t triển bản th&acirc;n m&igrave;nh c&oacute; được như ng&agrave;y h&ocirc;m nay, nhưng đ&atilde; bao giờ bạn nh&igrave;n lại, đ&acirc;u đ&oacute; xung quanh ch&uacute;ng ta vẫn c&ograve;n nhiều ho&agrave;n cảnh thiếu may mắn hơn ch&uacute;ng ta rất nhiều. Đặc biệt l&agrave; những trẻ em mồ c&ocirc;i, khuyết tật.<br />N&eacute;p m&igrave;nh một g&oacute;c nhỏ b&ecirc;n th&agrave;nh phố Đ&agrave; Nẵng đầy t&igrave;nh người, c&oacute; một ng&ocirc;i l&agrave;ng mang t&ecirc;n &ldquo;Hy Vọng&rdquo;. Tọa lạc tại địa chỉ 209 Dũng Sĩ Thanh Kh&ecirc;, th&agrave;nh phố Đ&agrave; Nẵng. Đ&acirc;y l&agrave; nơi nu&ocirc;i dạy trẻ em mồ c&ocirc;i, khuyết tật v&agrave; kh&ocirc;ng nơi nương tựa tại miền Trung Việt Nam n&oacute;i chung v&agrave; đặc biệt l&agrave; trẻ em đến từ Quảng Nam &ndash; Đ&agrave; Nẵng. L&agrave;ng l&agrave; nơi thầy c&ocirc; v&agrave; c&aacute;c thế hệ học tr&ograve; đ&atilde; c&ugrave;ng nhau nỗ lực vượt qua kh&oacute; khăn, x&acirc;y đắp hy vọng v&agrave; ước mơ cho rất nhiều ho&agrave;n cảnh trẻ thơ thiếu may mắn trong suốt 2 thập kỷ qua. Hiện đang c&oacute; hơn 130 trẻ em mồ c&ocirc;i, khuyết tật v&agrave; c&oacute; ho&agrave;n cảnh kh&oacute; khăn được nu&ocirc;i dưỡng tại L&agrave;ng.<br />Một m&ugrave;a tựu trường nữa lại đến, chắc hẳn ai trong ch&uacute;ng ta cũng đ&atilde; từng trải qua kh&ocirc;ng kh&iacute; tr&agrave;n ngập vui tươi, phấn khởi của ng&agrave;y tựu trường. Với mong muốn được g&oacute;p một phần sức nhỏ để c&aacute;c em học sinh ở L&agrave;ng Hy Vọng c&oacute; một h&agrave;nh trang đầy đủ hơn để bước v&agrave;o một năm học mới đầy vui vẻ v&agrave; th&uacute; vị. Nay nh&oacute;m m&igrave;nh xin được k&ecirc;u gọi những tấm l&ograve;ng nh&acirc;n &aacute;i tham gia ủng hộ, quy&ecirc;n g&oacute;p để mang lại nhiều hơn những m&oacute;n qu&agrave; &yacute; nghĩa cho c&aacute;c trẻ em tại đ&acirc;y. Nh&oacute;m m&igrave;nh rất mong sẽ nhận được sự hỗ trợ của mọi người.</p>\r\n<p>🎁 Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, truyện tranh, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).<br />🤝 H&igrave;nh thức nhận quy&ecirc;n g&oacute;p: Nh&oacute;m m&igrave;nh sẽ trực tiếp đến địa chỉ của c&aacute;c bạn để nhận những phần qu&agrave; được quy&ecirc;n g&oacute;p.<br />🤝 H&igrave;nh thức trao tặng: Những qu&agrave; tặng sẽ được nh&oacute;m m&igrave;nh trực tiếp trao tặng cho L&agrave;ng Hy Vọng.<br />🕛 Thời gian quy&ecirc;n g&oacute;p: Từ ng&agrave;y 12/7/2020 đến ng&agrave;y 31/7/2020.</p>\r\n<p>☎️ Mọi th&ocirc;ng tin v&agrave; sự đ&oacute;ng g&oacute;p xin li&ecirc;n hệ:<br />-Số điện thoại:<br />+ 0905694438 (Bạn T&agrave;i)<br />+ 0932403248 (Bạn Ph&aacute;t)<br />- Đường link điền th&ocirc;ng tin tham gia quy&ecirc;n g&oacute;p: https://forms.gle/qVsCov8DSo2vCw8R8<br />- Email: quyengopyeuthuong@gmail.com<br />- Fanpage: fb.com/Quy&ecirc;n-G&oacute;p-Y&ecirc;u-Thương-111523043958723/</p>\r\n<p>❤️ Xin ch&acirc;n th&agrave;nh cảm ơn mọi người đ&atilde; d&agrave;nh thời gian cho chương tr&igrave;nh từ thiện của nh&oacute;m m&igrave;nh. Trong thời gian quy&ecirc;n g&oacute;p, tiếp nhận qu&agrave; tặng nếu c&oacute; xảy ra sai s&oacute;t rất mong nhận được g&oacute;p &yacute; v&agrave; sự th&ocirc;ng cảm của mọi người!</p>	lang-hy-vong	2020-07-29 10:13:00.994087	2020-08-17 09:52:50.166384
\.


--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 231
-- Name: campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.campaign_id_seq', 2, true);


--
-- TOC entry 3898 (class 2606 OID 361611)
-- Name: campaign PK_0ce34d26e7f2eb316a3a592cdc4; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.campaign
    ADD CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY (id);


-- Completed on 2021-05-23 09:57:35

--
-- PostgreSQL database dump complete
--

