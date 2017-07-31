-- MSCI Japan
insert into tindex (name, country_id)
    select 'MSCI Japan', country_id from tcountry where code = 'jp' and 'MSCI Japan' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan');  
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'jp' and va.agg_cap_ratio <= 85;

-- MSCI Japan Investable Market (IMI)
insert into tindex (name, country_id)
    select 'MSCI Japan Investable Market (IMI)', country_id from tcountry where code = 'jp' and 'MSCI Japan Investable Market (IMI)' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan Investable Market (IMI)');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan Investable Market (IMI)') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'jp' and va.agg_cap_ratio <= 99;

-- MSCI Japan Small Cap
insert into tindex (name, country_id)
    select 'MSCI Japan Small Cap', country_id from tcountry where code = 'jp' and 'MSCI Japan Small Cap' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan Small Cap');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan Small Cap') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'jp' and va.agg_cap_ratio >= 85 and va.agg_cap_ratio <= 99;
    
-- MSCI USA
insert into tindex (name, country_id)
    select 'MSCI USA', country_id from tcountry where code = 'us' and 'MSCI USA' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI USA');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI USA') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'us' and va.agg_cap_ratio <= 85;

-- MSCI USA Small Cap
insert into tindex (name, country_id)
    select 'MSCI USA Small Cap', country_id from tcountry where code = 'us' and 'MSCI USA Small Cap' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI USA Small Cap');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI USA Small Cap') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'us' and va.agg_cap_ratio >= 85 and va.agg_cap_ratio <= 99;

-- MSCI Australia
insert into tindex (name, country_id)
    select 'MSCI Australia', country_id from tcountry where code = 'au' and 'MSCI Australia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Australia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Australia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'au' and va.agg_cap_ratio <= 85;

-- MSCI Brazil
insert into tindex (name, country_id)
    select 'MSCI Brazil', country_id from tcountry where code = 'br' and 'MSCI Brazil' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Brazil');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Brazil') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'br' and va.agg_cap_ratio <= 85;

-- MSCI Canada
insert into tindex (name, country_id)
    select 'MSCI Canada', country_id from tcountry where code = 'ca' and 'MSCI Canada' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Canada');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Canada') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'ca' and va.agg_cap_ratio <= 85;

-- MSCI China
insert into tindex (name, country_id)
    select 'MSCI China', country_id from tcountry where code = 'cn' and 'MSCI China' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI China');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI China') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'cn' and va.agg_cap_ratio <= 85;

-- MSCI France
insert into tindex (name, country_id)
    select 'MSCI France', country_id from tcountry where code = 'fr' and 'MSCI France' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI France');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI France') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'fr' and va.agg_cap_ratio <= 85;

-- MSCI Hong Kong
insert into tindex (name, country_id)
    select 'MSCI Hong Kong', country_id from tcountry where code = 'hk' and 'MSCI Hong Kong' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Hong Kong');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Hong Kong') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'hk' and va.agg_cap_ratio <= 85;

-- MSCI India
insert into tindex (name, country_id)
    select 'MSCI India', country_id from tcountry where code = 'in' and 'MSCI India' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI India');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI India') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'in' and va.agg_cap_ratio <= 85;

-- MSCI Indonesia
insert into tindex (name, country_id)
    select 'MSCI Indonesia', country_id from tcountry where code = 'id' and 'MSCI Indonesia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Indonesia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Indonesia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'id' and va.agg_cap_ratio <= 85;

-- MSCI Italy
insert into tindex (name, country_id)
    select 'MSCI Italy', country_id from tcountry where code = 'it' and 'MSCI Italy' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Italy');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Italy') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'it' and va.agg_cap_ratio <= 85;

-- MSCI Korea
insert into tindex (name, country_id)
    select 'MSCI Korea', country_id from tcountry where code = 'kr' and 'MSCI Korea' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Korea');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Korea') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'kr' and va.agg_cap_ratio <= 85;

-- MSCI Malaysia
insert into tindex (name, country_id)
    select 'MSCI Malaysia', country_id from tcountry where code = 'my' and 'MSCI Malaysia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Malaysia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Malaysia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'my' and va.agg_cap_ratio <= 85;

-- MSCI Mexico
insert into tindex (name, country_id)
    select 'MSCI Mexico', country_id from tcountry where code = 'mx' and 'MSCI Mexico' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Mexico');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Mexico') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'mx' and va.agg_cap_ratio <= 85;

-- MSCI Poland
insert into tindex (name, country_id)
    select 'MSCI Poland', country_id from tcountry where code = 'pl' and 'MSCI Poland' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Poland');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Poland') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'pl' and va.agg_cap_ratio <= 85;

-- MSCI Russia
insert into tindex (name, country_id)
    select 'MSCI Russia', country_id from tcountry where code = 'ru' and 'MSCI Russia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Russia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Russia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'ru' and va.agg_cap_ratio <= 85;

-- MSCI Singapore
insert into tindex (name, country_id)
    select 'MSCI Singapore', country_id from tcountry where code = 'sg' and 'MSCI Singapore' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Singapore');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Singapore') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'sg' and va.agg_cap_ratio <= 85;

-- MSCI South Africa
insert into tindex (name, country_id)
    select 'MSCI South Africa', country_id from tcountry where code = 'za' and 'MSCI South Africa' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI South Africa');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI South Africa') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'za' and va.agg_cap_ratio <= 85;

-- MSCI Spain
insert into tindex (name, country_id)
    select 'MSCI Spain', country_id from tcountry where code = 'es' and 'MSCI Spain' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Spain');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Spain') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'es' and va.agg_cap_ratio <= 85;

-- MSCI Switzerland
insert into tindex (name, country_id)
    select 'MSCI Switzerland', country_id from tcountry where code = 'ch' and 'MSCI Switzerland' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Switzerland');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Switzerland') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'ch' and va.agg_cap_ratio <= 85;

-- MSCI Taiwan
insert into tindex (name, country_id)
    select 'MSCI Taiwan', country_id from tcountry where code = 'tw' and 'MSCI Taiwan' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Taiwan');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Taiwan') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'tw' and va.agg_cap_ratio <= 85;

-- MSCI Turkey
insert into tindex (name, country_id)
    select 'MSCI Turkey', country_id from tcountry where code = 'tr' and 'MSCI Turkey' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Turkey');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Turkey') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.code = 'tr' and va.agg_cap_ratio <= 85;
