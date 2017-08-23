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


CREATE SEQUENCE technical_data_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE technical_data_seq OWNER TO postgres;


CREATE SEQUENCE index_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE index_seq OWNER TO postgres;


CREATE SEQUENCE score_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE score_seq OWNER TO postgres;


CREATE SEQUENCE income_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE income_seq OWNER TO postgres;


CREATE SEQUENCE cashflow_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cashflow_seq OWNER TO postgres;


CREATE SEQUENCE balance_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE balance_seq OWNER TO postgres;


CREATE SEQUENCE signals_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE signals_seq OWNER TO postgres;


CREATE SEQUENCE values_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE values_seq OWNER TO postgres;


CREATE SEQUENCE forecast_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE forecast_seq OWNER TO postgres;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 16481)
-- Name: tbranch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tbranch (
    branch_id integer DEFAULT nextval('branch_seq'::regclass) NOT NULL,
    name character varying,
    branch_group character varying
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
	name character varying,
    nsin character varying,
    isin character varying NOT NULL,
    wkn character varying,
    symbol character varying,
    url character varying,
	business_year_end character varying,
    country_id integer,
    branch_id integer,
    currency character varying,
    quandl_rb1_id integer NOT NULL
);


ALTER TABLE tstock OWNER TO postgres;


CREATE TABLE tdailyfundamental (
	daily_fundamental_id integer DEFAULT nextval('daily_fundamental_seq'::regclass) NOT NULL,
	earnings_per_share numeric,
    earnings_per_share_growth_expected numeric,
	price_earnings_ratio numeric,
    price_earnings_ratio_5y_avg numeric,
	profit_growth_1year numeric,
	profit_peg numeric,
	dividend_amount numeric,
	dividend_yield numeric,
	cashflow_per_share numeric,
	cashflow_kcv numeric,
    analyst_sell_ratio numeric,
	modified_at date,
	stock_id integer
);


ALTER TABLE tdailyfundamental OWNER TO postgres;


CREATE TABLE tannualfundamental (
	annual_fundamental_id integer DEFAULT nextval('annual_fundamental_seq'::regclass) NOT NULL,
	turnover numeric,
	turnover_growth_1year numeric,
	turnover_employee numeric,
	bookvalue_per_share numeric,
	bookvalue_price_ratio numeric,
	balance_sheet_total numeric,
	balance_sheet_equity_ratio numeric,
	balance_sheet_equity_dept numeric,
	balance_sheet_equity_dynamic_dept numeric,
	accounting_method numeric,
	market_capitalization numeric,
	market_capitalization_turnover numeric,
	market_capitalization_employee numeric,
	market_capitalization_ebitda numeric,
	roi_cashflow_marge numeric,
	roi_ebit_marge numeric,
	roi_ebitda_marge numeric,
	roi_equity numeric,
	roi_total_capital numeric,
	roi_cashflow numeric,
	roi_tax_quote numeric,
	year_value integer,
	stock_id integer
);


ALTER TABLE tannualfundamental OWNER TO postgres;


CREATE TABLE ttechnicaldata (
	technical_data_id integer DEFAULT nextval('technical_data_seq'::regclass) NOT NULL,
	vola_30d numeric,
	vola_250d numeric,
	vola_3y numeric,
	sd_30d numeric,
	sd_100d numeric,
	sd_250d numeric,
	moving_average_30d numeric,
	moving_average_100d numeric,
	moving_average_250d numeric,
	rsi_5d numeric,
	rsi_20d numeric,
	rsi_250d numeric,
	rsl_5d numeric,
	rsl_20d numeric,
	rsl_250d numeric,
	momentum_30d numeric,
	momentum_50d numeric,
	momentum_250d numeric,
	performance_7d numeric,
	performance_30d numeric,
	performance_6m numeric,
	performance_1y numeric,
	performance_3y numeric,
	performance_5y numeric,
	modified_at date,
	stock_id integer
);


ALTER TABLE ttechnicaldata OWNER TO postgres;


CREATE TABLE tindex (
    index_id integer DEFAULT nextval('index_seq'::regclass) NOT NULL,
    name character varying,
    description character varying,
    country_id integer
);

ALTER TABLE tindex OWNER TO postgres;


CREATE TABLE tstockindex (
    stock_id integer,
    index_id integer,
    percentage numeric,
    modified_at date
);

ALTER TABLE tstockindex OWNER TO postgres;


CREATE TABLE tscore (
    score_id integer DEFAULT nextval('score_seq'::regclass) NOT NULL,
    score_type_id integer,
    stock_id integer,
    index_id integer,
    score_value numeric,
    modified_at date
);

ALTER TABLE tscore OWNER TO postgres;


CREATE TABLE tscoretype (
    score_type_id integer NOT NULL,
    name character varying
);

ALTER TABLE tscoretype OWNER TO postgres;


CREATE TABLE tincome (
    income_id integer DEFAULT nextval('income_seq'::regclass) NOT NULL,
    stock_id integer,
    revenue numeric,
    operating_revenue numeric,
    net_income_exc numeric,
    net_income_inc numeric,
    eps_exc numeric,
    eps_inc numeric,
    dividend numeric,
    diluted_shares_os numeric,
    historic_yield numeric,
    share_price_eop numeric,
    last_share_price numeric,
    modified_at date
);

ALTER TABLE tincome OWNER TO postgres;


CREATE TABLE tcashflow (
    cashflow_id integer DEFAULT nextval('cashflow_seq'::regclass) NOT NULL,
    stock_id integer,
    cash_operations numeric,
    depreciation numeric,
    capex numeric,
    cash_investing numeric,
    issuance_of_stock numeric,
    issuance_of_debt numeric,
    cash_financing numeric,
    start_cash numeric,
    end_cash numeric,
    modified_at date
);

ALTER TABLE tcashflow OWNER TO postgres;


CREATE TABLE tbalance (
    balance_id integer DEFAULT nextval('balance_seq'::regclass) NOT NULL,
    stock_id integer,
    current_assets numeric,
    goodwill numeric,
    intangibles numeric,
    total_assets numeric,
    current_liabilities numeric,
    long_term_debt numeric,
    total_liabilities numeric,
    shareholder_equity numeric,
    modified_at date
);

ALTER TABLE tbalance OWNER TO postgres;


CREATE TABLE tsignals (
    signals_id integer DEFAULT nextval('signals_seq'::regclass) NOT NULL,
    stock_id integer,
    current_ratio numeric,
    buybacks numeric,
    solvency numeric,
    dividend_payout numeric,
    operating_margin numeric,
    net_inc_margin numeric,
    roe numeric,
    roae numeric,
    rotc numeric,
    lt_debt_op_income numeric,
    modified_at date
);

ALTER TABLE tsignals OWNER TO postgres;



CREATE TABLE tvalues (
    values_id integer DEFAULT nextval('values_seq'::regclass) NOT NULL,
    stock_id integer,
    price_earnings_ratio numeric,
    price_cashflow_ratio numeric,
    price_book_ratio numeric,
    peg_ratio numeric,
    enterprice_ratio numeric,
    price_52_wk numeric,
    graham_multiplier numeric,
    robur_score numeric,
    current_yield numeric,
    market_capitalization numeric,
    modified_at date
);

ALTER TABLE tvalues OWNER TO postgres;


CREATE TABLE tforecast (
    forecast_id integer DEFAULT nextval('forecast_seq'::regclass) NOT NULL,
    stock_id integer,
    revenue numeric,
    operating_income numeric,
    net_income_exc numeric,
    cash_operations numeric,
    depreciation numeric,
    capex numeric,
    start_cash numeric,
    end_cash numeric,
    eps_exc numeric,
    dividend numeric,
    modified_at date
);

ALTER TABLE tforecast OWNER TO postgres;


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

ALTER TABLE ONLY ttechnicaldata
	ADD CONSTRAINT ptechnicaldata PRIMARY KEY (technical_data_id);

ALTER TABLE ONLY tindex
	ADD CONSTRAINT pindex PRIMARY KEY (index_id);

ALTER TABLE ONLY tscore
	ADD CONSTRAINT pscore PRIMARY KEY (score_id);    

ALTER TABLE ONLY tscoretype
	ADD CONSTRAINT pscoretype PRIMARY KEY (score_type_id);


ALTER TABLE ONLY tincome
	ADD CONSTRAINT pincome PRIMARY KEY (income_id);

ALTER TABLE ONLY tcashflow
	ADD CONSTRAINT pcashflow PRIMARY KEY (cashflow_id);

ALTER TABLE ONLY tbalance
	ADD CONSTRAINT pbalance PRIMARY KEY (balance_id);

ALTER TABLE ONLY tsignals
	ADD CONSTRAINT psignals PRIMARY KEY (signals_id);

ALTER TABLE ONLY tvalues
	ADD CONSTRAINT pvalues PRIMARY KEY (values_id);

ALTER TABLE ONLY tforecast
	ADD CONSTRAINT pforecast PRIMARY KEY (forecast_id);

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

CREATE INDEX fki_ftechnicaldata ON ttechnicaldata USING btree (stock_id);

CREATE INDEX fki_findexcountry ON tindex USING btree (country_id);

CREATE INDEX fki_fstockindexstock ON tstockindex USING btree (stock_id);

CREATE INDEX fki_fstockindexindex ON tstockindex USING btree (index_id);

CREATE INDEX fki_fscoretype ON tscore USING btree (score_type_id);
CREATE INDEX fki_fscorestock ON tscore USING btree (stock_id);
CREATE INDEX fki_fscoreindex ON tscore USING btree (index_id);

CREATE INDEX fki_fincomestock ON tincome USING btree (stock_id);
CREATE INDEX fki_fcashflowstock ON tcashflow USING btree (stock_id);
CREATE INDEX fki_fbalancestock ON tbalance USING btree (stock_id);
CREATE INDEX fki_fsignalsstock ON tsignals USING btree (stock_id);
CREATE INDEX fki_fvaluesstock ON tvalues USING btree (stock_id);
CREATE INDEX fki_fforecaststock ON tforecast USING btree (stock_id);

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

ALTER TABLE ONLY ttechnicaldata
    ADD CONSTRAINT ftechnicaldata FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tindex
    ADD CONSTRAINT findexcountry FOREIGN KEY (country_id) REFERENCES tcountry(country_id);
    
ALTER TABLE ONLY tstockindex
    ADD CONSTRAINT fstockindexstock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tstockindex
    ADD CONSTRAINT fstockindexindex FOREIGN KEY (index_id) REFERENCES tindex(index_id);

ALTER TABLE ONLY tscore
    ADD CONSTRAINT fscoretype FOREIGN KEY (score_type_id) REFERENCES tscoretype(score_type_id);
    
ALTER TABLE ONLY tscore
    ADD CONSTRAINT fscorestock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tscore
    ADD CONSTRAINT fscoreindex FOREIGN KEY (index_id) REFERENCES tindex(index_id);

ALTER TABLE ONLY tincome
	ADD CONSTRAINT fincomestock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tcashflow
	ADD CONSTRAINT fcashflowstock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tbalance
	ADD CONSTRAINT fbalancestock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tsignals
	ADD CONSTRAINT fsignalsstock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tvalues
	ADD CONSTRAINT fvaluesstock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tforecast
	ADD CONSTRAINT forecaststock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);


ALTER TABLE tbranch ADD CONSTRAINT ubranchname UNIQUE (name);

ALTER TABLE tcountry ADD CONSTRAINT ucountry UNIQUE (name, code);

ALTER TABLE tstock ADD CONSTRAINT ustockisin UNIQUE (isin);

ALTER TABLE tstock ADD CONSTRAINT ustockquandl UNIQUE (quandl_rb1_id);
    
ALTER TABLE tstockindex ADD CONSTRAINT ustockindex UNIQUE (stock_id, index_id);

ALTER TABLE tindex ADD CONSTRAINT uindex UNIQUE (name);

ALTER TABLE tscoretype ADD CONSTRAINT uscoretype UNIQUE (name);

ALTER TABLE tscore ADD CONSTRAINT uscorestock UNIQUE (score_type_id, stock_id);



ALTER TABLE tscore ADD CONSTRAINT cscore CHECK ((stock_id is NULL) <> (index_id is NULL));


    
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
 

CREATE OR REPLACE VIEW public.vtechicaldata AS 
 SELECT s.stock_id,
    s.url,
    td.technical_data_id,
    td.modified_at
   FROM tstock s
     LEFT JOIN ttechnicaldata td ON s.stock_id = td.stock_id;

ALTER TABLE public.vtechicaldata
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vstock AS 
 SELECT s.stock_id,
	s.name AS stock_name,
    s.nsin,
	s.isin,
	s.wkn,
	s.symbol,
	s.url,
	s.business_year_end,
	c.name AS country_name,
	c.code,
	b.name AS branch_name,
	df.daily_fundamental_id,
	df.modified_at AS daily_modified_at,
	af2.annual_fundamental_id,
	af2.year_value AS max_annual_year,
	td.technical_data_id,
	td.modified_at AS technical_modified_at
   FROM tstock s
   LEFT JOIN tcountry c ON s.country_id = c.country_id
 LEFT JOIN tbranch b ON s.branch_id = b.branch_id
	 LEFT JOIN tdailyfundamental df on s.stock_id = df.stock_id
	 LEFT JOIN (select stock_id, max(year_value) as max_year from tannualfundamental group by stock_id) af1 on s.stock_id = af1.stock_id
	 LEFT JOIN tannualfundamental af2 on af1.stock_id = af2.stock_id and af1.max_year = af2.year_value
	 LEFT JOIN ttechnicaldata td on s.stock_id = td.stock_id;

ALTER TABLE public.vstock
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vlevermann AS 
 SELECT s.stock_id,
   af2.roi_equity,
   af2.roi_ebit_marge,
   af2.balance_sheet_equity_ratio,
   af2.market_capitalization,
   df.price_earnings_ratio,
   df.price_earnings_ratio_5y_avg,
   df.earnings_per_share_growth_expected,
   df.analyst_sell_ratio,
   100 - df.analyst_sell_ratio AS analyst_buy_ratio,
   td.performance_6m,
   td.performance_1y
   FROM tstock s
   LEFT JOIN tcountry c ON s.country_id = c.country_id
 LEFT JOIN tbranch b ON s.branch_id = b.branch_id
	 LEFT JOIN tdailyfundamental df on s.stock_id = df.stock_id
	 LEFT JOIN (select stock_id, max(year_value) as max_year from tannualfundamental group by stock_id) af1 on s.stock_id = af1.stock_id
	 LEFT JOIN tannualfundamental af2 on af1.stock_id = af2.stock_id and af1.max_year = af2.year_value
	 LEFT JOIN ttechnicaldata td on s.stock_id = td.stock_id;

ALTER TABLE public.vlevermann
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vmagicformula AS 
 SELECT s.stock_id,
   af2.roi_equity as return_on_capital,
   case when df.price_earnings_ratio > 0 then 1::numeric / df.price_earnings_ratio else null end AS earnings_yield,
   af2.market_capitalization
   FROM tstock s
	 LEFT JOIN tdailyfundamental df on s.stock_id = df.stock_id
	 LEFT JOIN (select stock_id, max(year_value) as max_year from tannualfundamental group by stock_id) af1 on s.stock_id = af1.stock_id
	 LEFT JOIN tannualfundamental af2 on af1.stock_id = af2.stock_id and af1.max_year = af2.year_value;

ALTER TABLE public.vmagicformula
  OWNER TO postgres;


-- View: public.vagg_market_cap

-- DROP VIEW public.vagg_market_cap;

CREATE OR REPLACE VIEW public.vagg_market_cap AS 
 SELECT tmc1.stock_id,
    tmc1.country_id,
    sum(tmc2.cap_ratio) * 100::numeric AS agg_cap_ratio
   FROM ( SELECT s.stock_id,
            tmc.country_id,
            l.market_capitalization / tmc.total_market_cap AS cap_ratio
           FROM tstock s
             LEFT JOIN ( SELECT c.country_id,
                    sum(l_1.market_capitalization) AS total_market_cap
                   FROM tstock s_1
                     LEFT JOIN tcountry c ON c.country_id = s_1.country_id
                     LEFT JOIN vlevermann l_1 ON l_1.stock_id = s_1.stock_id
                  GROUP BY c.country_id) tmc ON tmc.country_id = s.country_id
             LEFT JOIN vlevermann l ON l.stock_id = s.stock_id) tmc1
     LEFT JOIN ( SELECT s.stock_id,
            tmc.country_id,
            l.market_capitalization / tmc.total_market_cap AS cap_ratio
           FROM tstock s
             LEFT JOIN ( SELECT c.country_id,
                    sum(l_1.market_capitalization) AS total_market_cap
                   FROM tstock s_1
                     LEFT JOIN tcountry c ON c.country_id = s_1.country_id
                     LEFT JOIN vlevermann l_1 ON l_1.stock_id = s_1.stock_id
                  GROUP BY c.country_id) tmc ON tmc.country_id = s.country_id
             LEFT JOIN vlevermann l ON l.stock_id = s.stock_id) tmc2 ON tmc1.country_id = tmc2.country_id AND tmc1.cap_ratio <= tmc2.cap_ratio
  GROUP BY tmc1.stock_id, tmc1.country_id
  ORDER BY tmc1.country_id, (sum(tmc2.cap_ratio) * 100::numeric);

ALTER TABLE public.vagg_market_cap
  OWNER TO postgres; 

-- View: public.vpiotroski

-- DROP VIEW public.vpiotroski;

CREATE OR REPLACE VIEW public.vpiotroski AS 
 SELECT s.stock_id,
    df.earnings_per_share,
    df.cashflow_per_share,
    af2.roi_total_capital AS actual_roi_total_capital,
    af3.roi_total_capital AS last_roi_total_capital,
    af2.balance_sheet_equity_dept AS actual_balance_sheet_equity_dept,
    af3.balance_sheet_equity_dept AS last_balance_sheet_equity_dept,
    CASE WHEN af2.bookvalue_price_ratio * af2.bookvalue_per_share = 0 THEN NULL ELSE af2.market_capitalization / af2.bookvalue_price_ratio * af2.bookvalue_per_share END AS actual_stock_amount,
    CASE WHEN af3.bookvalue_price_ratio * af3.bookvalue_per_share = 0 THEN NULL ELSE af3.market_capitalization / af3.bookvalue_price_ratio * af3.bookvalue_per_share END AS last_stock_amount,
    af2.roi_ebit_marge AS actual_roi_ebit_marge,
    af3.roi_ebit_marge AS last_roi_ebit_marge,
    CASE WHEN af2.balance_sheet_total = 0 THEN NULL ELSE af2.turnover / af2.balance_sheet_total END AS actual_asset_turnover,
    CASE WHEN af3.balance_sheet_total = 0 THEN NULL ELSE af3.turnover / af3.balance_sheet_total END AS last_asset_turnover,
    af2.market_capitalization
   FROM tstock s
     LEFT JOIN tdailyfundamental df ON s.stock_id = df.stock_id
     LEFT JOIN ( SELECT tannualfundamental.stock_id,
            max(tannualfundamental.year_value) AS max_year
           FROM tannualfundamental
          GROUP BY tannualfundamental.stock_id) af1 ON s.stock_id = af1.stock_id
     LEFT JOIN tannualfundamental af2 ON af1.stock_id = af2.stock_id AND af1.max_year = af2.year_value
     LEFT JOIN tannualfundamental af3 ON af1.stock_id = af3.stock_id AND (af1.max_year - 1) = af3.year_value;

ALTER TABLE public.vpiotroski
  OWNER TO postgres; 

-- View: public.vscore_normalized

-- DROP VIEW public.vscore_normalized;

CREATE OR REPLACE VIEW public.vscore_normalized AS 
 SELECT s.score_id,
    s.score_type_id,
    s.stock_id,
    s.index_id,
        CASE
            WHEN s.stock_id IS NOT NULL THEN (s.score_value - nss.min_value) / (nss.max_value - nss.min_value)
            ELSE (s.score_value - nsi.min_value) / (nsi.max_value - nsi.min_value)
        END AS score_value,
    s.modified_at
   FROM tscore s
     LEFT JOIN ( SELECT t.score_type_id,
            min(t.score_value) AS min_value,
            max(t.score_value) AS max_value
           FROM ( SELECT tscore.score_id,
                    tscore.score_type_id,
                    tscore.stock_id,
                    tscore.index_id,
                    tscore.score_value,
                    tscore.modified_at
                   FROM tscore
                  WHERE tscore.stock_id IS NOT NULL) t
          GROUP BY t.score_type_id) nss ON nss.score_type_id = s.score_type_id AND s.stock_id IS NOT NULL
     LEFT JOIN ( SELECT t.score_type_id,
            min(t.score_value) AS min_value,
            max(t.score_value) AS max_value
           FROM ( SELECT tscore.score_id,
                    tscore.score_type_id,
                    tscore.stock_id,
                    tscore.index_id,
                    tscore.score_value,
                    tscore.modified_at
                   FROM tscore
                  WHERE tscore.index_id IS NOT NULL) t
          GROUP BY t.score_type_id) nsi ON nsi.score_type_id = s.score_type_id AND s.index_id IS NOT NULL;

ALTER TABLE public.vscore_normalized
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
