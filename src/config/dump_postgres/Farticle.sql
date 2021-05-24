--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-23 09:55:56

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
-- TOC entry 227 (class 1259 OID 361560)
-- Name: article; Type: TABLE; Schema: public; Owner: yjcrmgct
--

CREATE TABLE public.article (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    description character varying NOT NULL,
    thumbnail character varying DEFAULT 'https://res.cloudinary.com/dgext7ewd/image/upload/v1594021601/Charity_And_Fundraising/upload/default/default_image_sieswh.jpg'::character varying NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL,
    "authorId" integer NOT NULL,
    "categoryId" integer
);


ALTER TABLE public.article OWNER TO yjcrmgct;

--
-- TOC entry 226 (class 1259 OID 361558)
-- Name: article_id_seq; Type: SEQUENCE; Schema: public; Owner: yjcrmgct
--

CREATE SEQUENCE public.article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.article_id_seq OWNER TO yjcrmgct;

--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 226
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yjcrmgct
--

ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;


--
-- TOC entry 3893 (class 2604 OID 361563)
-- Name: article id; Type: DEFAULT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);


--
-- TOC entry 4024 (class 0 OID 361560)
-- Dependencies: 227
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: yjcrmgct
--

COPY public.article (id, title, slug, description, thumbnail, content, created_at, last_updated, "authorId", "categoryId") FROM stdin;
7	🎀THÔNG BÁO VỀ DỰ ÁN "QUYÊN GÓP YÊU THƯƠNG"🎀	thong-bao-ve-du-an-quyen-gop-yeu-thuong	🤝 Sau một thời gian ngắn kêu gọi quyên góp, tính đến ngày 24/7/2020 nhóm chúng mình đã may mắn nhận được nhiều sự quan tâm cũng như ủng hộ của các nhà hảo tâm, nhờ đó mà có thêm được nhiều món quà ý nghĩa hơn để trao đến các em nhỏ ở Làng Hy Vọng.	http://res.cloudinary.com/dgext7ewd/image/upload/v1597853183/Charity_And_Fundraising/upload/article/sq4qpcbpcbhldr1ulctp.jpg	<p>🎀TH&Ocirc;NG B&Aacute;O VỀ DỰ &Aacute;N "QUY&Ecirc;N G&Oacute;P Y&Ecirc;U THƯƠNG"🎀</p>\r\n<p>🤝 Sau một thời gian ngắn k&ecirc;u gọi quy&ecirc;n g&oacute;p, t&iacute;nh đến ng&agrave;y 24/7/2020 nh&oacute;m ch&uacute;ng m&igrave;nh đ&atilde; may mắn nhận được nhiều sự quan t&acirc;m cũng như ủng hộ của c&aacute;c nh&agrave; hảo t&acirc;m, nhờ đ&oacute; m&agrave; c&oacute; th&ecirc;m được nhiều m&oacute;n qu&agrave; &yacute; nghĩa hơn để trao đến c&aacute;c em nhỏ ở L&agrave;ng Hy Vọng.<br />🤝 Nhận thấy t&igrave;nh h&igrave;nh căng thẳng với sự trở lại của đại dịch Covid-19 tr&ecirc;n địa b&agrave;n th&agrave;nh phố Đ&agrave; Nẵng, nh&oacute;m m&igrave;nh đ&atilde; khẩn trương họp gấp v&agrave; đưa ra quyết định sẽ dời ng&agrave;y trao tặng những phần qu&agrave; đến với c&aacute;c em ở L&agrave;ng Hi Vọng v&agrave;o ng&agrave;y 26/7/2020 thay v&igrave; ng&agrave;y 10/8/2020 như kế hoạch ban đầu.<br />🤝 Ng&agrave;y 25/7/2020, nh&oacute;m đ&atilde; ho&agrave;n th&agrave;nh giai đoạn nhận v&agrave; ph&acirc;n loại qu&agrave; tặng, cũng như chuẩn bị c&aacute;c tiết mục tr&ograve; chơi, văn nghệ để giao lưu với c&aacute;c em ở L&agrave;ng Hi Vọng. Sau khi li&ecirc;n lạc v&agrave; b&agrave;n bạc với L&agrave;ng Hi Vọng. Để đảm bảo an to&agrave;n cho c&aacute;c em với nguy cơ dịch bệnh Covid-19 trở lại, ch&uacute;ng m&igrave;nh đ&atilde; quyết định dời ng&agrave;y trao tặng lại sau đợt dịch Covid-19.</p>\r\n<p>💕 Nh&oacute;m ch&uacute;ng m&igrave;nh xin ch&acirc;n th&agrave;nh gửi lời cảm ơn, lời tri &acirc;n s&acirc;u sắc nhất đến tất cả mọi người, những nh&agrave; hảo t&acirc;m, những tấm l&ograve;ng nh&acirc;n &aacute;i đ&atilde; ủng hộ v&agrave; gi&uacute;p đỡ nh&oacute;m trong thời gian vừa qua. Rất mong dự &aacute;n của ch&uacute;ng m&igrave;nh sẽ lan tỏa y&ecirc;u thương cũng như l&ograve;ng nh&acirc;n &aacute;i đến nhiều người hơn nữa.</p>\r\n<p>💕 Ch&uacute;c mọi người lu&ocirc;n c&oacute; được sức khỏe dồi d&agrave;o để vượt qua đại dịch Covid-19 v&agrave; lu&ocirc;n tr&agrave;n đầy năng lượng để trở lại với c&ocirc;ng việc cũng như học tập sau đợt dịch lần n&agrave;y.</p>\r\n<p>-----------------------------------------</p>\r\n<p>🎁 Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, truyện tranh, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).</p>\r\n<p>🤝 H&igrave;nh thức nhận quy&ecirc;n g&oacute;p: Nh&oacute;m m&igrave;nh sẽ trực tiếp đến địa chỉ của c&aacute;c bạn để nhận những phần qu&agrave; được quy&ecirc;n g&oacute;p.</p>\r\n<p>- Đường link điền th&ocirc;ng tin tham gia quy&ecirc;n g&oacute;p: <a href="https://forms.gle/qVsCov8DSo2vCw8R8">https://forms.gle/qVsCov8DSo2vCw8R8</a></p>\r\n<p>- Fanpage:<a href="https://www.facebook.com/Quy%C3%AAn-G%C3%B3p-Y%C3%AAu-Th%C6%B0%C6%A1ng-111523043958723/"> fb.com/Quy&ecirc;n-G&oacute;p-Y&ecirc;u-Thương-111523043958723/</a><br /><a href="fb.com/Quy&ecirc;n-G&oacute;p-Y&ecirc;u-Thương-111523043958723/%20-">-</a> Website: <a href="../../">http://quyengopyeuthuong.social/</a></p>	2020-08-19 16:07:39.809214	2020-08-19 16:10:45.775358	1	1
1	🍀THƯ NGỎ - KÊU GỌI QUYÊN GÓP🍀	thu-ng-keu-goi-quyen-gop	Khởi động chiến dịch từ thiện trẻ em làng Hi Vọng	http://res.cloudinary.com/dgext7ewd/image/upload/v1596017898/Charity_And_Fundraising/upload/article/r155rjua4wwmxynog1kw.jpg	<p>K&iacute;nh gửi: Qu&yacute; Mạnh Thường Qu&acirc;n v&agrave; những tấm l&ograve;ng nh&acirc;n &aacute;i gần xa th&acirc;n mến!</p>\r\n<p>Lời đầu ti&ecirc;n, nh&oacute;m m&igrave;nh xin gửi lời ch&uacute;c sức khỏe v&agrave; lời ch&agrave;o tr&acirc;n trọng nhất đến tất cả mọi người.<br />Mỗi con người, mỗi ho&agrave;n cảnh sinh ra v&agrave; lớn l&ecirc;n kh&aacute;c nhau, ch&uacute;ng ta được lớn l&ecirc;n trong sự y&ecirc;u thương của gia đ&igrave;nh với những điều kiện tốt để ph&aacute;t triển bản th&acirc;n m&igrave;nh c&oacute; được như ng&agrave;y h&ocirc;m nay, nhưng đ&atilde; bao giờ bạn nh&igrave;n lại, đ&acirc;u đ&oacute; xung quanh ch&uacute;ng ta vẫn c&ograve;n nhiều ho&agrave;n cảnh thiếu may mắn hơn ch&uacute;ng ta rất nhiều. Đặc biệt l&agrave; những trẻ em mồ c&ocirc;i, khuyết tật.<br />N&eacute;p m&igrave;nh một g&oacute;c nhỏ b&ecirc;n th&agrave;nh phố Đ&agrave; Nẵng đầy t&igrave;nh người, c&oacute; một ng&ocirc;i l&agrave;ng mang t&ecirc;n &ldquo;Hy Vọng&rdquo;. Tọa lạc tại địa chỉ 209 Dũng Sĩ Thanh Kh&ecirc;, th&agrave;nh phố Đ&agrave; Nẵng. Đ&acirc;y l&agrave; nơi nu&ocirc;i dạy trẻ em mồ c&ocirc;i, khuyết tật v&agrave; kh&ocirc;ng nơi nương tựa tại miền Trung Việt Nam n&oacute;i chung v&agrave; đặc biệt l&agrave; trẻ em đến từ Quảng Nam &ndash; Đ&agrave; Nẵng. L&agrave;ng l&agrave; nơi thầy c&ocirc; v&agrave; c&aacute;c thế hệ học tr&ograve; đ&atilde; c&ugrave;ng nhau nỗ lực vượt qua kh&oacute; khăn, x&acirc;y đắp hy vọng v&agrave; ước mơ cho rất nhiều ho&agrave;n cảnh trẻ thơ thiếu may mắn trong suốt 2 thập kỷ qua. Hiện đang c&oacute; hơn 130 trẻ em mồ c&ocirc;i, khuyết tật v&agrave; c&oacute; ho&agrave;n cảnh kh&oacute; khăn được nu&ocirc;i dưỡng tại L&agrave;ng.</p>\r\n<p>Một m&ugrave;a tựu trường nữa lại đến, chắc hẳn ai trong ch&uacute;ng ta cũng đ&atilde; từng trải qua kh&ocirc;ng kh&iacute; tr&agrave;n ngập vui tươi, phấn khởi của ng&agrave;y tựu trường. Với mong muốn được g&oacute;p một phần sức nhỏ để c&aacute;c em học sinh ở L&agrave;ng Hy Vọng c&oacute; một h&agrave;nh trang đầy đủ hơn để bước v&agrave;o một năm học mới đầy vui vẻ v&agrave; th&uacute; vị. Nay nh&oacute;m m&igrave;nh xin được k&ecirc;u gọi những tấm l&ograve;ng nh&acirc;n &aacute;i tham gia ủng hộ, quy&ecirc;n g&oacute;p để mang lại nhiều hơn những m&oacute;n qu&agrave; &yacute; nghĩa cho c&aacute;c trẻ em tại đ&acirc;y. Nh&oacute;m m&igrave;nh rất mong sẽ nhận được sự hỗ trợ của mọi người.</p>\r\n<p>🎁 Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, truyện tranh, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).<br />🤝 H&igrave;nh thức nhận quy&ecirc;n g&oacute;p: Nh&oacute;m m&igrave;nh sẽ trực tiếp đến địa chỉ của c&aacute;c bạn để nhận những phần qu&agrave; được quy&ecirc;n g&oacute;p.<br />🤝 H&igrave;nh thức trao tặng: Những qu&agrave; tặng sẽ được nh&oacute;m m&igrave;nh trực tiếp trao tặng cho L&agrave;ng Hy Vọng.<br />🕛 Thời gian quy&ecirc;n g&oacute;p: Từ ng&agrave;y 12/7/2020 đến ng&agrave;y 31/7/2020.</p>\r\n<p>☎️ Mọi th&ocirc;ng tin v&agrave; sự đ&oacute;ng g&oacute;p xin li&ecirc;n hệ:<br />-Số điện thoại:<br />+ 0905694438 (Bạn T&agrave;i)<br />+ 0932403248 (Bạn Ph&aacute;t)<br />- Đường link điền th&ocirc;ng tin tham gia quy&ecirc;n g&oacute;p: https://forms.gle/qVsCov8DSo2vCw8R8<br />- Email: quyengopyeuthuong@gmail.com<br />- Fanpage: fb.com/Quy&ecirc;n-G&oacute;p-Y&ecirc;u-Thương-111523043958723/</p>\r\n<p>❤️ Xin ch&acirc;n th&agrave;nh cảm ơn mọi người đ&atilde; d&agrave;nh thời gian cho chương tr&igrave;nh từ thiện của nh&oacute;m m&igrave;nh. Trong thời gian quy&ecirc;n g&oacute;p, tiếp nhận qu&agrave; tặng nếu c&oacute; xảy ra sai s&oacute;t rất mong nhận được g&oacute;p &yacute; v&agrave; sự th&ocirc;ng cảm của mọi người!</p>	2020-07-29 10:18:25.147741	2020-07-29 10:24:55.598474	3	1
4	🔊 [KÊU GỌI SỰ ỦNG HỘ ĐẾN TỪ MỌI NGƯỜI]	keu-goi-su-ung-ho-den-tu-moi-nguoi	🍀Có rất nhiều đứa bé đã không may mắn từ khi sinh ra. Một số bạn thì ba mẹ mất sớm, một số bạn khác thì lại bị bỏ rơi bởi chính bố mẹ của mình. Các bạn nhỏ đó đã phải đương đầu với biết bao nhiêu khó khăn cả về vật chất lẫn tinh thần.	http://res.cloudinary.com/dgext7ewd/image/upload/v1597656059/Charity_And_Fundraising/upload/article/hifyuxuiftitpxup4eju.jpg	<p>🍀C&oacute; rất nhiều đứa b&eacute; đ&atilde; kh&ocirc;ng may mắn từ khi sinh ra. Một số bạn th&igrave; ba mẹ mất sớm, một số bạn kh&aacute;c th&igrave; lại bị bỏ rơi bởi ch&iacute;nh bố mẹ của m&igrave;nh. C&aacute;c bạn nhỏ đ&oacute; đ&atilde; phải đương đầu với biết bao nhi&ecirc;u kh&oacute; khăn cả về vật chất lẫn tinh thần.<br />🍀Ng&agrave;y nay những đứa b&eacute; đ&oacute; đều được nh&agrave; nước hỗ trợ, được đưa đến c&aacute;c Trại trẻ mồ c&ocirc;i để nu&ocirc;i dưỡng. Tuy nhi&ecirc;n, c&aacute;c em nhỏ đ&oacute; vẫn c&ograve;n những hạn chế v&agrave; vẫn thiếu đi sự y&ecirc;u thương đến từ ch&iacute;nh gia đ&igrave;nh của m&igrave;nh.<br />Ch&iacute;nh v&igrave; vậy, những đứa trẻ đ&oacute; vẫn cần sự hỗ trợ đến từ mỗi người ch&uacute;ng ta.<br />🍀Nay nh&oacute;m ch&uacute;ng m&igrave;nh đ&atilde; c&oacute; được sự ủng hộ đến từ nhiều người. Rất mong sẽ c&oacute; th&ecirc;m nhiều &ldquo;Mạnh Thường Qu&acirc;n&rdquo; kh&aacute;c nữa hỗ trợ cho những bạn nhỏ n&agrave;y.<br />🍀Những m&oacute;n đồ m&agrave; mọi người ủng hộ đều sẽ được gửi đến "L&agrave;ng Hy Vọng - nơi nu&ocirc;i dạy c&aacute;c trẻ em mồ c&ocirc;i tại 209 Dũng Sĩ Thanh Kh&ecirc;, TP. Đ&agrave; Nẵng".<br />-----------------------------------------------------------------<br />❤️ Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).</p>\r\n<p>❤️ Để tham gia quy&ecirc;n g&oacute;p, xin mọi người h&atilde;y v&agrave;o đường link n&agrave;y để điền th&ocirc;ng tin v&agrave; nh&oacute;m ch&uacute;ng m&igrave;nh sẽ li&ecirc;n hệ v&agrave; trực tiếp đến nơi để nhận đồ ủng hộ từ mọi người: 👉https://forms.gle/qVsCov8DSo2vCw8R8 👈</p>\r\n<p>❤️ Ngo&agrave;i ra, c&aacute;c bạn c&oacute; thể li&ecirc;n hệ trực tiếp th&ocirc;ng qua 2 số điện thoại<br />SĐT : 0905694438<br />hoặc 0932403248.<br />Cả nh&oacute;m xin ch&acirc;n th&agrave;nh cảm ơn mọi người đ&atilde; d&agrave;nh thời gian v&agrave; những m&oacute;n đồ ủng hộ cho trương tr&igrave;nh từ thiện của ch&uacute;ng m&igrave;nh.</p>\r\n<figure class="image align-center"><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597656106/Charity_And_Fundraising/upload/article/nbawswtzpsevxode2xwy.jpg" alt="Một số &aacute;o quần cũ được nh&oacute;m quy&ecirc;n g&oacute;p" width="960" height="720" />\r\n<figcaption>Một số &aacute;o quần cũ được mạnh thường qu&acirc;n quy&ecirc;n g&oacute;p</figcaption>\r\n</figure>\r\n<figure class="image"><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597656167/Charity_And_Fundraising/upload/article/accoqdx0mkrwgebunupc.jpg" alt="C&aacute;c vật dụng cũ được c&aacute;c mạnh thường qu&acirc;n quy&ecirc;n g&oacute;p" />\r\n<figcaption>Một số &aacute;o quần, s&aacute;ch vở cũ được mạnh thường qu&acirc;n quy&ecirc;n g&oacute;p</figcaption>\r\n</figure>	2020-08-17 09:24:04.735773	2020-08-17 09:24:04.735773	1	1
5	🍀[LỜI CẢM ƠN TỚI CÁC NHÀ HẢO TÂM]🍀	loi-cam-on-toi-cac-nha-hao-tam	👉 Sau một thời gian ngắn kêu gọi quyên góp, nhóm chúng mình đã may mắn nhận được nhiều sự quan tâm cũng như ủng hộ của các nhà hảo tâm, nhờ đó mà có thêm được nhiều món quà ý nghĩa hơn để trao đến các em nhỏ ở Làng Hy Vọng.	http://res.cloudinary.com/dgext7ewd/image/upload/v1597658054/Charity_And_Fundraising/upload/article/ww3ypi1sgloix6w7wa8z.png	<p>👉 Sau một thời gian ngắn k&ecirc;u gọi quy&ecirc;n g&oacute;p, nh&oacute;m ch&uacute;ng m&igrave;nh đ&atilde; may mắn nhận được nhiều sự quan t&acirc;m cũng như ủng hộ của c&aacute;c nh&agrave; hảo t&acirc;m, nhờ đ&oacute; m&agrave; c&oacute; th&ecirc;m được nhiều m&oacute;n qu&agrave; &yacute; nghĩa hơn để trao đến c&aacute;c em nhỏ ở L&agrave;ng Hy Vọng.</p>\r\n<p>👉Đ&acirc;y l&agrave; một t&iacute;n hiệu tốt, điều n&agrave;y kh&ocirc;ng chỉ thể hiện t&igrave;nh cảm lớn lao của những nh&agrave; hảo t&acirc;m m&agrave; c&ograve;n n&oacute;i l&ecirc;n một điều rằng xung quanh ch&uacute;ng ta vẫn c&ograve;n rất nhiều những con người tốt bụng, gi&agrave;u l&ograve;ng nh&acirc;n &aacute;i, lu&ocirc;n sẵn s&agrave;ng sẻ chia với những ho&agrave;n cảnh kh&oacute; khăn hơn m&igrave;nh.</p>\r\n<p>👉Nh&oacute;m ch&uacute;ng m&igrave;nh sẽ bắt đầu chuyển đồ ủng hộ v&agrave;o ng&agrave;y 26/07, n&ecirc;n mọi người vẫn c&oacute; thể ủng hộ th&ecirc;m cho nh&oacute;m ch&uacute;ng em.</p>\r\n<p>👉Rất mong mọi người chia sẻ b&agrave;i viết để c&oacute; nhiều hơn những nh&agrave; hảo t&acirc;m biết đến chương tr&igrave;nh quy&ecirc;n gọi của nh&oacute;m m&igrave;nh cũng như g&oacute;p phần gửi đến c&aacute;c em nhỏ ở L&agrave;ng Hy Vọng c&oacute; th&ecirc;m nhiều h&agrave;nh trang hơn để bước v&agrave;o một năm học mới!<br />--------------------------------------</p>\r\n<p>🎁 Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, truyện tranh, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).<br />🤝 H&igrave;nh thức nhận quy&ecirc;n g&oacute;p: Nh&oacute;m m&igrave;nh sẽ trực tiếp đến địa chỉ của c&aacute;c bạn để nhận những phần qu&agrave; được quy&ecirc;n g&oacute;p.<br />🤝 H&igrave;nh thức trao tặng: Những qu&agrave; tặng sẽ được nh&oacute;m m&igrave;nh trực tiếp trao tặng cho L&agrave;ng Hy Vọng.<br />🕛 Thời gian quy&ecirc;n g&oacute;p: Từ ng&agrave;y 12/7/2020 đến ng&agrave;y 31/7/2020.</p>\r\n<p><br />- Đường link điền th&ocirc;ng tin tham gia quy&ecirc;n g&oacute;p: https://forms.gle/qVsCov8DSo2vCw8R8</p>\r\n<p>❤️ Xin ch&acirc;n th&agrave;nh cảm ơn mọi người đ&atilde; d&agrave;nh thời gian cho chương tr&igrave;nh từ thiện của nh&oacute;m m&igrave;nh. Trong thời gian quy&ecirc;n g&oacute;p, tiếp nhận qu&agrave; tặng nếu c&oacute; xảy ra sai s&oacute;t rất mong nhận được g&oacute;p &yacute; v&agrave; sự th&ocirc;ng cảm của mọi người!</p>\r\n<p>&nbsp;</p>	2020-08-17 09:55:10.260971	2020-08-17 09:55:10.260971	1	1
6	Tất bật chuẩn bị cho hành trình yêu thương đầu tiên của nhóm	tat-bat-chuan-bi-cho-hanh-trinh-yeu-thuong-dau-tien-cua-nhom	🍀 Hình ảnh một số thành viên trong nhóm đang phân loại đồ ủng hộ để chuẩn bị cho chuyến đi đến Làng Hy Vọng 🏠 🏠 - nơi nuôi dưỡng các trẻ em mồ côi 💕 💞	http://res.cloudinary.com/dgext7ewd/image/upload/v1597658311/Charity_And_Fundraising/upload/article/kkzmmme7jazod6njqyig.jpg	<p>🍀 H&igrave;nh ảnh một số th&agrave;nh vi&ecirc;n trong nh&oacute;m đang ph&acirc;n loại đồ ủng hộ để chuẩn bị cho chuyến đi đến L&agrave;ng Hy Vọng 🏠 🏠 - nơi nu&ocirc;i dưỡng c&aacute;c trẻ em mồ c&ocirc;i 💕 💞</p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658321/Charity_And_Fundraising/upload/article/punzcfophdqlybbu9ie6.jpg" /></p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658328/Charity_And_Fundraising/upload/article/jwng3how8dpkmxdrrqei.jpg" /></p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658335/Charity_And_Fundraising/upload/article/fqmh3trl8zuukmfmaahz.jpg" /></p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658342/Charity_And_Fundraising/upload/article/uvb26l9n4b3oy03zvewn.jpg" /></p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658348/Charity_And_Fundraising/upload/article/kvwia6hxxylolkfvsvu0.jpg" /></p>\r\n<p><img src="http://res.cloudinary.com/dgext7ewd/image/upload/v1597658356/Charity_And_Fundraising/upload/article/qxrgjqfvy62y5cdebyyy.jpg" /></p>\r\n<p>🍀 Nh&oacute;m rất mong sẽ c&oacute; th&ecirc;m nhiều đồ quy&ecirc;n g&oacute;p từ c&aacute;c nh&agrave; hảo t&acirc;m để hỗ trợ cho c&aacute;c em nhỏ 😘😘<br />-----------------------------------------</p>\r\n<p>🎁 Danh mục qu&agrave; tặng c&oacute; thể hỗ trợ: Quần &aacute;o, chăn m&agrave;n, gi&agrave;y d&eacute;p, tất ch&acirc;n, găng tay, s&aacute;ch vở, truyện tranh, đồ d&ugrave;ng học tập, đồ d&ugrave;ng sinh hoạt,&hellip;(mới hoặc cũ c&ograve;n sử dụng được).</p>\r\n<p>🤝 H&igrave;nh thức nhận quy&ecirc;n g&oacute;p: Nh&oacute;m m&igrave;nh sẽ trực tiếp đến địa chỉ của c&aacute;c bạn để nhận những phần qu&agrave; được quy&ecirc;n g&oacute;p.</p>\r\n<p>- Đường link điền th&ocirc;ng tin tham gia quy&ecirc;n g&oacute;p: https://forms.gle/qVsCov8DSo2vCw8R8</p>\r\n<p>- Fanpage: fb.com/Quy&ecirc;n-G&oacute;p-Y&ecirc;u-Thương-111523043958723/</p>	2020-08-17 09:59:44.198626	2020-08-17 09:59:44.198626	1	1
\.


--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 226
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yjcrmgct
--

SELECT pg_catalog.setval('public.article_id_seq', 7, true);


--
-- TOC entry 3898 (class 2606 OID 361571)
-- Name: article PK_40808690eb7b915046558c0f81b; Type: CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id);


--
-- TOC entry 3900 (class 2606 OID 361636)
-- Name: article FK_12824e4598ee46a0992d99ba553; Type: FK CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 3899 (class 2606 OID 361631)
-- Name: article FK_a9c5f4ec6cceb1604b4a3c84c87; Type: FK CONSTRAINT; Schema: public; Owner: yjcrmgct
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


-- Completed on 2021-05-23 09:56:03

--
-- PostgreSQL database dump complete
--

