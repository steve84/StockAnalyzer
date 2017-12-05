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

CREATE SEQUENCE user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_seq OWNER TO postgres;


CREATE SEQUENCE role_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE role_seq OWNER TO postgres;


CREATE SEQUENCE analysts_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE analysts_seq OWNER TO postgres;


CREATE SEQUENCE price_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE price_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 16481)
-- Name: tbranch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tbranch (
    branch_id integer DEFAULT nextval('branch_seq'::regclass) NOT NULL,
    name character varying,
    branch_group character varying,
    created_at date
);


ALTER TABLE tbranch OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 16487)
-- Name: tcountry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tcountry (
    country_id integer DEFAULT nextval('country_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    code character varying,
    created_at date NOT NULL
);


ALTER TABLE tcountry OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16493)
-- Name: tstock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tstock (
    stock_id integer DEFAULT nextval('stock_seq'::regclass) NOT NULL,
	name character varying NOT NULL,
    nsin character varying,
    isin character varying NOT NULL,
    wkn character varying,
    symbol character varying,
    url character varying,
	business_year_end character varying,
    country_id integer NOT NULL,
    branch_id integer NOT NULL,
    reference_currency character varying,
    quandl_rb1_id integer NOT NULL,
    quandl_price_dataset character varying,
    public_stock boolean default false,
    created_at date NOT NULL,
    share_currency character varying
);


ALTER TABLE tstock OWNER TO postgres;



CREATE TABLE tindex (
    index_id integer DEFAULT nextval('index_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    description character varying,
    country_id integer,
    public_index boolean default false,
    created_at date NOT NULL,
    total_stocks integer
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
    enterprise_ratio numeric,
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

CREATE TABLE tuser (
    user_id integer DEFAULT nextval('user_seq'::regclass) NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    correspondence_language character(2) default 'DE',
    stripe_customer character varying,
    password character varying NOT NULL,
    salt character varying NOT NULL,
    token character varying,
    is_activated boolean default false,
    role_id integer NOT NULL,
    created_at date NOT NULL,
    activated_at date
);


ALTER TABLE tuser OWNER TO postgres;

CREATE TABLE trole (
    role_id integer DEFAULT nextval('role_seq'::regclass) NOT NULL,
    role_name character varying
);

ALTER TABLE trole OWNER TO postgres;


CREATE TABLE tanalysts (
    analysts_id integer DEFAULT nextval('analysts_seq'::regclass) NOT NULL,
    stock_id integer,
    buy numeric,
    sell numeric,
    hold numeric,
    modified_at date
);

ALTER TABLE tanalysts OWNER TO postgres;



CREATE TABLE tprice (
    price_id integer DEFAULT nextval('price_seq'::regclass) NOT NULL,
    stock_id integer,
    index_id integer,
    price numeric,
    currency character varying,
    quandl_code character varying,
    created_at date
);

ALTER TABLE tprice OWNER TO postgres;


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

  ALTER TABLE ONLY tuser
    ADD CONSTRAINT puser PRIMARY KEY (user_id);

ALTER TABLE ONLY trole
    ADD CONSTRAINT prole PRIMARY KEY (role_id);

ALTER TABLE ONLY tanalysts
    ADD CONSTRAINT panalysts PRIMARY KEY (analysts_id);
    
ALTER TABLE ONLY tprice
    ADD CONSTRAINT pprice PRIMARY KEY (price_id);

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

CREATE INDEX fki_fanalystsstock ON tanalysts USING btree (stock_id);
CREATE INDEX fki_fpricestock ON tprice USING btree (stock_id);
CREATE INDEX fki_fpriceindex ON tprice USING btree (index_id);

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

ALTER TABLE ONLY tuser
  ADD CONSTRAINT fuser FOREIGN KEY (role_id) REFERENCES trole(role_id);

ALTER TABLE ONLY tanalysts
  ADD CONSTRAINT fanalysts FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);

ALTER TABLE ONLY tprice
  ADD CONSTRAINT fpricestock FOREIGN KEY (stock_id) REFERENCES tstock(stock_id);
  
ALTER TABLE ONLY tprice
  ADD CONSTRAINT fpriceindex FOREIGN KEY (index_id) REFERENCES tindex(index_id);

ALTER TABLE tbranch ADD CONSTRAINT ubranchname UNIQUE (name);

ALTER TABLE tcountry ADD CONSTRAINT ucountry UNIQUE (name, code);

ALTER TABLE tstock ADD CONSTRAINT ustockisin UNIQUE (isin);

ALTER TABLE tstock ADD CONSTRAINT ustockquandl UNIQUE (quandl_rb1_id);

ALTER TABLE tstockindex ADD CONSTRAINT ustockindex UNIQUE (stock_id, index_id);

ALTER TABLE tindex ADD CONSTRAINT uindex UNIQUE (name);

ALTER TABLE tscoretype ADD CONSTRAINT uscoretype UNIQUE (name);

ALTER TABLE tscore ADD CONSTRAINT uscorestock UNIQUE (score_type_id, stock_id);

ALTER TABLE tscore ADD CONSTRAINT uscoreindex UNIQUE (score_type_id, index_id);

ALTER TABLE tuser ADD CONSTRAINT uuser UNIQUE (username);

ALTER TABLE tprice ADD CONSTRAINT upricestock UNIQUE (created_at, stock_id);

ALTER TABLE tprice ADD CONSTRAINT upriceindex UNIQUE (created_at, index_id);

ALTER TABLE tuser ADD CONSTRAINT cuser CHECK (correspondence_language IN ('DE', 'EN'));

ALTER TABLE tscore ADD CONSTRAINT cscore CHECK ((stock_id is NULL) <> (index_id is NULL));

ALTER TABLE tprice ADD CONSTRAINT cprice CHECK ((stock_id is NULL) <> (index_id is NULL));


CREATE OR REPLACE VIEW public.vstock AS 
 SELECT s.stock_id,
	s.name AS stock_name,
	s.isin,
	s.business_year_end,
    s.reference_currency,
    s.quandl_rb1_id,
	c.name AS country_name,
	b.name AS branch_name,
    i.last_date_income,
    cf.last_date_cashflow,
    ba.last_date_balance,
    si.last_date_signals,
    v.last_date_values,
    f.last_date_forecast
   FROM tstock s
   LEFT JOIN tcountry c ON s.country_id = c.country_id
   LEFT JOIN tbranch b ON s.branch_id = b.branch_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_income from tincome group by stock_id) i ON s.stock_id = i.stock_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_cashflow from tcashflow group by stock_id) cf ON s.stock_id = cf.stock_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_balance from tbalance group by stock_id) ba ON s.stock_id = ba.stock_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_signals from tsignals group by stock_id) si ON s.stock_id = si.stock_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_values from tvalues group by stock_id) v ON s.stock_id = v.stock_id
   LEFT JOIN (select stock_id, max(modified_at) as last_date_forecast from tforecast group by stock_id) f ON s.stock_id = f.stock_id;

ALTER TABLE public.vstock
  OWNER TO postgres;

  
CREATE OR REPLACE VIEW public.vmarketcap AS 
 SELECT v.stock_id,
	v.market_capitalization
   FROM tvalues v
   WHERE v.modified_at = (select max(v2.modified_at) from tvalues v2 where v.stock_id = v2.stock_id);

ALTER TABLE public.vmarketcap
  OWNER TO postgres;

  
CREATE OR REPLACE VIEW public.vavgtotalassets AS 
 SELECT b.stock_id,
	AVG(b.total_assets) as avg_total_assets
   FROM tbalance b
   GROUP BY b.stock_id;

ALTER TABLE public.vavgtotalassets
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vperformance AS 
  select stock_dates.stock_id,
    case when six_month_price.price > 0 then ((actual_price.price / six_month_price.price) - 1) * 100 else null end AS performance_6m,
    case when one_year_price.price > 0 then ((actual_price.price / one_year_price.price) - 1) * 100 else null end AS performance_1y
  from (select actual_price.stock_id, actual_price.target_date as actual_price_date, six_month_price.target_date as six_month_price_date, one_year_price.target_date as one_year_price_date from (select stock_id, max(created_at) as target_date from (select stock_id, created_at from tprice where created_at::timestamp in (select * from generate_series(current_date - interval '3 days', current_date, '1 day'))) dates group by stock_id) actual_price
        left join (select stock_id, max(created_at) as target_date from (select stock_id, created_at from tprice where created_at::timestamp in (select * from generate_series(current_date - interval '6 months' - interval '3 days', current_date - interval '6 months' + interval '3 days', '1 day'))) dates group by stock_id) six_month_price on six_month_price.stock_id = actual_price.stock_id
        left join (select stock_id, max(created_at) as target_date from (select stock_id, created_at from tprice where created_at::timestamp in (select * from generate_series(current_date - interval '1 year' - interval '3 days', current_date - interval '1 year' + interval '3 days', '1 day'))) dates group by stock_id) one_year_price on one_year_price.stock_id = actual_price.stock_id
        where six_month_price.target_date is not null and one_year_price.target_date is not null and actual_price.target_date is not null) stock_dates
  left join tprice actual_price on stock_dates.stock_id = actual_price.stock_id and stock_dates.actual_price_date = actual_price.created_at
  left join tprice six_month_price on stock_dates.stock_id = six_month_price.stock_id and stock_dates.six_month_price_date = six_month_price.created_at
  left join tprice one_year_price on stock_dates.stock_id = one_year_price.stock_id and stock_dates.one_year_price_date = one_year_price.created_at;

ALTER TABLE public.vperformance
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vlatestprice AS 
  select 
    p.stock_id,
    p.price
  from (select stock_id, max(created_at) as latest_date from tprice group by stock_id) latest_price
  left join tprice p on latest_price.stock_id = p.stock_id and latest_price.latest_date = p.created_at;

ALTER TABLE public.vlatestprice
  OWNER TO postgres;

CREATE OR REPLACE VIEW public.vlevermann AS 
 SELECT s.stock_id,
   si.roe * 100 as roi_equity,
   si.operating_margin * 100 as roi_ebit_marge,
   case when b.total_assets > 0 then (b.shareholder_equity / b.total_assets) * 100 else null end as balance_sheet_equity_ratio,
   v.market_capitalization * 1000 as market_capitalization,
   v.price_earnings_ratio,
   va.price_earnings_ratio_5y_avg,
   case when i.eps_exc > 0 then (100 * f.eps_exc / i.eps_exc) - 100 else null end as earnings_per_share_growth_expected,
   case when (anal.buy + anal.hold + anal.sell) > 0 then (anal.sell / ((anal.buy + anal.hold + anal.sell))) else null end as analyst_sell_ratio,
   case when (anal.buy + anal.hold + anal.sell) > 0 then (anal.buy / ((anal.buy + anal.hold + anal.sell))) else null end as analyst_buy_ratio,
   p.performance_6m,
   p.performance_1y,
   s.isin
   FROM tstock s
   LEFT JOIN (select v.* from (select stock_id, max(modified_at) max_date from tvalues group by stock_id) a left join tvalues v on v.stock_id = a.stock_id and v.modified_at = a.max_date) v on v.stock_id = s.stock_id
   LEFT JOIN (select b.* from (select stock_id, max(modified_at) max_date from tbalance group by stock_id) a left join tbalance b on b.stock_id = a.stock_id and b.modified_at = a.max_date) b on b.stock_id = s.stock_id
   LEFT JOIN tsignals si on si.stock_id = s.stock_id and si.modified_at = b.modified_at
   LEFT JOIN (select stock_id, avg(price_earnings_ratio) as price_earnings_ratio_5y_avg from (select stock_id, price_earnings_ratio from tvalues where modified_at >= current_date - interval '5 years') v group by stock_id) va on va.stock_id = s.stock_id
   LEFT JOIN tforecast f on f.stock_id = s.stock_id and f.modified_at = (b.modified_at + interval '1 year')
   LEFT JOIN tincome i on i.stock_id = s.stock_id and i.modified_at = b.modified_at
   LEFT JOIN vperformance p ON p.stock_id = s.stock_id
   LEFT JOIN tanalysts anal ON anal.stock_id = s.stock_id;

ALTER TABLE public.vlevermann
  OWNER TO postgres;


CREATE OR REPLACE VIEW public.vmagicformula AS 
 SELECT s.stock_id,
   si.rotc * 100 as return_on_capital,
   case when v.price_earnings_ratio > 0 then 1::numeric / v.price_earnings_ratio else null end AS earnings_yield,
   v.market_capitalization * 100 as market_capitalization
   FROM tstock s
   LEFT JOIN (select si.* from (select stock_id, max(modified_at) max_date from tsignals group by stock_id) a left join tsignals si on si.stock_id = a.stock_id and si.modified_at = a.max_date) si on si.stock_id = s.stock_id
   LEFT JOIN (select v.* from (select stock_id, max(modified_at) max_date from tvalues group by stock_id) a left join tvalues v on v.stock_id = a.stock_id and v.modified_at = a.max_date) v on v.stock_id = s.stock_id;

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
            mc.market_capitalization / tmc.total_market_cap AS cap_ratio
           FROM tstock s
             LEFT JOIN ( SELECT c.country_id,
                    sum(mc.market_capitalization) AS total_market_cap
                   FROM tstock s_1
                     LEFT JOIN tcountry c ON c.country_id = s_1.country_id
                     LEFT JOIN vmarketcap mc ON mc.stock_id = s_1.stock_id
                  GROUP BY c.country_id) tmc ON tmc.country_id = s.country_id
             LEFT JOIN vmarketcap mc ON mc.stock_id = s.stock_id) tmc1
     LEFT JOIN ( SELECT s.stock_id,
            tmc.country_id,
            mc.market_capitalization / tmc.total_market_cap AS cap_ratio
           FROM tstock s
             LEFT JOIN ( SELECT c.country_id,
                    sum(mc.market_capitalization) AS total_market_cap
                   FROM tstock s_1
                     LEFT JOIN tcountry c ON c.country_id = s_1.country_id
                     LEFT JOIN vmarketcap mc ON mc.stock_id = s_1.stock_id
                  GROUP BY c.country_id) tmc ON tmc.country_id = s.country_id
             LEFT JOIN vmarketcap mc ON mc.stock_id = s.stock_id) tmc2 ON tmc1.country_id = tmc2.country_id AND tmc1.cap_ratio <= tmc2.cap_ratio
  GROUP BY tmc1.stock_id, tmc1.country_id
  ORDER BY tmc1.country_id, (sum(tmc2.cap_ratio) * 100::numeric);

ALTER TABLE public.vagg_market_cap
  OWNER TO postgres; 

-- View: public.vpiotroski

-- DROP VIEW public.vpiotroski;

CREATE OR REPLACE VIEW public.vpiotroski AS 
	select
	s.stock_id,
	case when ab.total_assets > 0 then ai.net_income_exc / ab.total_assets else null end as return_on_assets,
	case when ab.total_assets > 0 then c.cash_operations / ab.total_assets else null end as cash_operations,
	case when ab.total_assets > 0 then ai.net_income_exc / ab.total_assets else null end as actual_return_on_assets,
	case when lb.total_assets > 0 then li.net_income_exc / lb.total_assets else null end as last_return_on_assets,
	case when vt.avg_total_assets > 0 then ab.long_term_debt / vt.avg_total_assets else null end as actual_long_term_ratio,
	case when vt.avg_total_assets > 0 then lb.long_term_debt / vt.avg_total_assets else null end as last_long_term_ratio,
	asi.current_ratio as actual_current_ratio,
	lsi.current_ratio as last_current_ratio,
	ai.diluted_shares_os as actual_shares_outstanding,
	li.diluted_shares_os as last_shares_outstanding,
	ai.revenue / ab.total_assets as actual_asset_turnover,
	li.revenue / lb.total_assets as last_asset_turnover,
	v.market_capitalization
	from tstock s
	left join (select i.* from (select stock_id, max(modified_at) max_date from tincome group by stock_id) a left join tincome i on i.stock_id = a.stock_id and i.modified_at = a.max_date) ai on ai.stock_id = s.stock_id
	left join (select i.* from (select stock_id, max(modified_at) max_date from tincome group by stock_id) a left join tincome i on i.stock_id = a.stock_id and i.modified_at = a.max_date - interval '1 year') li on li.stock_id = s.stock_id
	left join (select c.* from (select stock_id, max(modified_at) max_date from tcashflow group by stock_id) a left join tcashflow c on c.stock_id = a.stock_id and c.modified_at = a.max_date) c on c.stock_id = s.stock_id
	left join (select si.* from (select stock_id, max(modified_at) max_date from tsignals group by stock_id) a left join tsignals si on si.stock_id = a.stock_id and si.modified_at = a.max_date) asi on asi.stock_id = s.stock_id
	left join (select si.* from (select stock_id, max(modified_at) max_date from tsignals group by stock_id) a left join tsignals si on si.stock_id = a.stock_id and si.modified_at = a.max_date - interval '1 year') lsi on lsi.stock_id = s.stock_id
	left join (select b.* from (select stock_id, max(modified_at) max_date from tbalance group by stock_id) a left join tbalance b on b.stock_id = a.stock_id and b.modified_at = a.max_date) ab on ab.stock_id = s.stock_id
	left join (select b.* from (select stock_id, max(modified_at) max_date from tbalance group by stock_id) a left join tbalance b on b.stock_id = a.stock_id and b.modified_at = a.max_date - interval '1 year') lb on lb.stock_id = s.stock_id
	left join (select v.* from (select stock_id, max(modified_at) max_date from tvalues group by stock_id) a left join tvalues v on v.stock_id = a.stock_id and v.modified_at = a.max_date) v on v.stock_id = s.stock_id
    left join vavgtotalassets vt on vt.stock_id = s.stock_id;

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


CREATE OR REPLACE VIEW public.vfullscore AS 
select
  interm_score.score_id,
  interm_score.score_type_id,
  interm_score.stock_id,
  interm_score.index_id,
  interm_score.score_value,
  interm_score.modified_at
from 
    (select null as score_id, st.score_type_id, s.stock_id, null as index_id, null as score_value, null as modified_at from tstock s, tscoretype st) as interm_score
    left join tscore sc on sc.stock_id = interm_score.stock_id and sc.score_type_id = interm_score.score_type_id
    where sc.score_id is null
  union
    select * from tscore
    where stock_id is not null
  union
    select interm_score.* from 
    (select null as score_id, st.score_type_id, null as stock_id, i.index_id, null as score_value, null as modified_at from tindex i, tscoretype st) as interm_score
    left join tscore sc on sc.index_id = interm_score.index_id and sc.score_type_id = interm_score.score_type_id
    where sc.score_id is null
  union
    select * from tscore
    where index_id is not null;

ALTER TABLE public.vfullscore
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
