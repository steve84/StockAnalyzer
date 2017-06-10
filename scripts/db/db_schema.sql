--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.7
-- Dumped by pg_dump version 9.5.7

-- Started on 2017-06-03 18:35:23 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2128 (class 1262 OID 16477)
-- Name: stock_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE stock_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE stock_db OWNER TO postgres;

\connect stock_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12358)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2131 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 185 (class 1259 OID 16519)
-- Name: branch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE branch_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE branch_seq OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16517)
-- Name: country_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE country_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE country_seq OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16521)
-- Name: stock_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stock_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stock_seq OWNER TO postgres;


CREATE SEQUENCE daily_fundamental_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE daily_fundamental_seq OWNER TO postgres;

CREATE SEQUENCE annual_fundamental_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE annual_fundamental_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 16481)
-- Name: tbranch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tbranch (
    branch_id integer DEFAULT nextval('branch_seq'::regclass) NOT NULL,
    name character varying
);


ALTER TABLE tbranch OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 16487)
-- Name: tcountry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tcountry (
    country_id integer DEFAULT nextval('country_seq'::regclass) NOT NULL,
    name character varying,
    code character varying
);


ALTER TABLE tcountry OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16493)
-- Name: tstock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tstock (
    stock_id integer DEFAULT nextval('stock_seq'::regclass) NOT NULL,
    nsin character varying,
    isin character varying,
    wkn character varying,
    symbol character varying,
    url character varying,
    country_id integer,
    branch_id integer,
    name character varying
);


ALTER TABLE tstock OWNER TO postgres;


CREATE TABLE tdailyfundamental (
  daily_fundamental_id integer DEFAULT nextval('daily_fundamental_seq'::regclass) NOT NULL,
	earnings_per_share real,
	price_earnings_ratio real,
	profit_growth_1year real,
	profit_peg real,
	dividend_amount real,
	dividend_yield real,
	cashflow_per_share real,
	cashflow_kcv real,
	modified_at date,
  stock_id integer
);


ALTER TABLE tdailyfundamental OWNER TO postgres;


CREATE TABLE tannualfundamental (
  annual_fundamental_id integer DEFAULT nextval('annual_fundamental_seq'::regclass) NOT NULL,
	turnover real,
	turnover_growth_1year real,
	turnover_employee real,
	bookvalue_per_share real,
	bookvalue_price_ratio real,
	balance_sheet_total real,
	balance_sheet_equity_ratio real,
	balance_sheet_equity_dept real,
	balance_sheet_equity_dynamic_dept real,
	accounting_method real,
	market_capitalization real,
	market_capitalization_turnover real,
	market_capitalization_employee real,
	market_capitalization_ebitda real,
	roi_cashflow_marge real,
	roi_ebit_marge real,
	roi_ebitda_marge real,
	roi_equity real,
	roi_total_capital real,
	roi_cashflow real,
	roi_tax_quote real,
	year_value integer,
  stock_id integer
);


ALTER TABLE tannualfundamental OWNER TO postgres;

--
-- TOC entry 2001 (class 2606 OID 16500)
-- Name: pbranch; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tbranch
    ADD CONSTRAINT pbranch PRIMARY KEY (branch_id);


--
-- TOC entry 2003 (class 2606 OID 16502)
-- Name: pcountry; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tcountry
    ADD CONSTRAINT pcountry PRIMARY KEY (country_id);


--
-- TOC entry 2007 (class 2606 OID 16504)
-- Name: pstock; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tstock
    ADD CONSTRAINT pstock PRIMARY KEY (stock_id);
	
ALTER TABLE ONLY tdailyfundamental
	ADD CONSTRAINT pdailyfundamental PRIMARY KEY (daily_fundamental_id);

ALTER TABLE ONLY tannualfundamental
	ADD CONSTRAINT pannualfundamental PRIMARY KEY (annual_fundamental_id);


--
-- TOC entry 2004 (class 1259 OID 16505)
-- Name: fki_fbranch; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fbranch ON tstock USING btree (branch_id);


--
-- TOC entry 2005 (class 1259 OID 16506)
-- Name: fki_fcountry; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fcountry ON tstock USING btree (country_id);

CREATE INDEX fki_fdailystock ON tdailyfundamental USING btree (stock_id);

CREATE INDEX fki_fannualstock ON tannualfundamental USING btree (stock_id);


--
-- TOC entry 2008 (class 2606 OID 16507)
-- Name: fbranch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tstock
    ADD CONSTRAINT fbranch FOREIGN KEY (branch_id) REFERENCES tbranch(branch_id);


--
-- TOC entry 2009 (class 2606 OID 16512)
-- Name: fcountry; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tstock
    ADD CONSTRAINT fcountry FOREIGN KEY (country_id) REFERENCES tcountry(country_id);
	
ALTER TABLE ONLY tdailyfundamental
    ADD CONSTRAINT fdailyfundamental FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);
	
ALTER TABLE ONLY tannualfundamental
    ADD CONSTRAINT fannualfundamental FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);


CREATE OR REPLACE VIEW public.vfundamental AS 
 SELECT s.stock_id,
    s.url,
    df.daily_fundamental_id,
    max(af.year_value) AS lastfundamentalyear
   FROM tstock s
     LEFT JOIN tcountry c ON s.country_id = c.country_id
     LEFT JOIN tbranch b ON s.branch_id = b.branch_id
     LEFT JOIN tdailyfundamental df ON s.stock_id = df.stock_id
     LEFT JOIN tannualfundamental af ON s.stock_id = af.stock_id
  GROUP BY s.stock_id, s.url, df.daily_fundamental_id;

ALTER TABLE public.vfundamental
  OWNER TO postgres;	

--
-- TOC entry 2130 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-06-03 18:35:23 CEST

--
-- PostgreSQL database dump complete
--
