-- MSCI Japan
insert into tindex (name, country_id, created_at)
    select 'MSCI Japan', country_id, CURRENT_DATE from tcountry where name = 'Japan' and 'MSCI Japan' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan');  
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Japan' and va.agg_cap_ratio <= 85;

-- MSCI Japan Investable Market (IMI)
insert into tindex (name, country_id, created_at)
    select 'MSCI Japan Investable Market (IMI)', country_id, CURRENT_DATE from tcountry where name = 'Japan' and 'MSCI Japan Investable Market (IMI)' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan Investable Market (IMI)');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan Investable Market (IMI)') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Japan' and va.agg_cap_ratio <= 99;

-- MSCI Japan Small Cap
insert into tindex (name, country_id, created_at)
    select 'MSCI Japan Small Cap', country_id, CURRENT_DATE from tcountry where name = 'Japan' and 'MSCI Japan Small Cap' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Japan Small Cap');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Japan Small Cap') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Japan' and va.agg_cap_ratio >= 85 and va.agg_cap_ratio <= 99;
    
-- MSCI USA
insert into tindex (name, country_id, created_at)
    select 'MSCI USA', country_id, CURRENT_DATE from tcountry where name = 'USA' and 'MSCI USA' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI USA');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI USA') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'USA' and va.agg_cap_ratio <= 85;

-- MSCI USA Small Cap
insert into tindex (name, country_id, created_at)
    select 'MSCI USA Small Cap', country_id, CURRENT_DATE from tcountry where name = 'USA' and 'MSCI USA Small Cap' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI USA Small Cap');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI USA Small Cap') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'USA' and va.agg_cap_ratio >= 85 and va.agg_cap_ratio <= 99;

-- MSCI Australia
insert into tindex (name, country_id, created_at)
    select 'MSCI Australia', country_id, CURRENT_DATE from tcountry where name = 'Australia' and 'MSCI Australia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Australia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Australia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Australia' and va.agg_cap_ratio <= 85;

-- MSCI Brazil
insert into tindex (name, country_id, created_at)
    select 'MSCI Brazil', country_id, CURRENT_DATE from tcountry where name = 'Brazil' and 'MSCI Brazil' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Brazil');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Brazil') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Brazil' and va.agg_cap_ratio <= 85;

-- MSCI Canada
insert into tindex (name, country_id, created_at)
    select 'MSCI Canada', country_id, CURRENT_DATE from tcountry where name = 'Canada' and 'MSCI Canada' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Canada');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Canada') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Canada' and va.agg_cap_ratio <= 85;

-- MSCI China
insert into tindex (name, country_id, created_at)
    select 'MSCI China inc Hong Kong', country_id, CURRENT_DATE from tcountry where name = 'China inc HK' and 'MSCI China' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI China');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI China') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'China inc HK' and va.agg_cap_ratio <= 85;

-- MSCI France
insert into tindex (name, country_id, created_at)
    select 'MSCI France', country_id, CURRENT_DATE from tcountry where name = 'France' and 'MSCI France' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI France');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI France') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'France' and va.agg_cap_ratio <= 85;

-- MSCI India
insert into tindex (name, country_id, created_at)
    select 'MSCI India', country_id, CURRENT_DATE from tcountry where name = 'India' and 'MSCI India' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI India');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI India') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'India' and va.agg_cap_ratio <= 85;

-- MSCI Indonesia
insert into tindex (name, country_id, created_at)
    select 'MSCI Indonesia', country_id, CURRENT_DATE from tcountry where name = 'Indonesia' and 'MSCI Indonesia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Indonesia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Indonesia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Indonesia' and va.agg_cap_ratio <= 85;

-- MSCI Italy
insert into tindex (name, country_id, created_at)
    select 'MSCI Italy', country_id, CURRENT_DATE from tcountry where name = 'Italy' and 'MSCI Italy' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Italy');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Italy') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Italy' and va.agg_cap_ratio <= 85;

-- MSCI Korea
insert into tindex (name, country_id, created_at)
    select 'MSCI Korea', country_id, CURRENT_DATE from tcountry where name = 'Korea' and 'MSCI Korea' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Korea');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Korea') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Korea' and va.agg_cap_ratio <= 85;

-- MSCI Malaysia
insert into tindex (name, country_id, created_at)
    select 'MSCI Malaysia', country_id, CURRENT_DATE from tcountry where name = 'Malaysia' and 'MSCI Malaysia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Malaysia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Malaysia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Malaysia' and va.agg_cap_ratio <= 85;

-- MSCI Mexico
insert into tindex (name, country_id, created_at)
    select 'MSCI Mexico', country_id, CURRENT_DATE from tcountry where name = 'Mexico' and 'MSCI Mexico' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Mexico');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Mexico') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Mexico' and va.agg_cap_ratio <= 85;

-- MSCI Poland
insert into tindex (name, country_id, created_at)
    select 'MSCI Poland', country_id, CURRENT_DATE from tcountry where name = 'Poland' and 'MSCI Poland' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Poland');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Poland') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Poland' and va.agg_cap_ratio <= 85;

-- MSCI Russia
insert into tindex (name, country_id, created_at)
    select 'MSCI Russia', country_id, CURRENT_DATE from tcountry where name = 'Russia' and 'MSCI Russia' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Russia');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Russia') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Russia' and va.agg_cap_ratio <= 85;

-- MSCI Singapore
insert into tindex (name, country_id, created_at)
    select 'MSCI Singapore', country_id, CURRENT_DATE from tcountry where name = 'Singapore' and 'MSCI Singapore' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Singapore');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Singapore') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Singapore' and va.agg_cap_ratio <= 85;

-- MSCI South Africa
insert into tindex (name, country_id, created_at)
    select 'MSCI South Africa', country_id, CURRENT_DATE from tcountry where name = 'South Africa' and 'MSCI South Africa' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI South Africa');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI South Africa') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'South Africa' and va.agg_cap_ratio <= 85;

-- MSCI Spain
insert into tindex (name, country_id, created_at)
    select 'MSCI Spain', country_id, CURRENT_DATE from tcountry where name = 'Spain' and 'MSCI Spain' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Spain');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Spain') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Spain' and va.agg_cap_ratio <= 85;

-- MSCI Switzerland
insert into tindex (name, country_id, created_at)
    select 'MSCI Switzerland', country_id, CURRENT_DATE from tcountry where name = 'Switzerland' and 'MSCI Switzerland' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Switzerland');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Switzerland') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Switzerland' and va.agg_cap_ratio <= 85;

-- MSCI Taiwan
insert into tindex (name, country_id, created_at)
    select 'MSCI Taiwan', country_id, CURRENT_DATE from tcountry where name = 'Taiwan' and 'MSCI Taiwan' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Taiwan');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Taiwan') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Taiwan' and va.agg_cap_ratio <= 85;

-- MSCI Turkey
insert into tindex (name, country_id, created_at)
    select 'MSCI Turkey', country_id, CURRENT_DATE from tcountry where name = 'Turkey' and 'MSCI Turkey' not in (select name from tindex);
delete from tstockindex where index_id = (select index_id from tindex where name = 'MSCI Turkey');
insert into tstockindex (stock_id, index_id)
    select va.stock_id, (select index_id from tindex where name = 'MSCI Turkey') from vagg_market_cap va left join tcountry c on c.country_id = va.country_id where c.name = 'Turkey' and va.agg_cap_ratio <= 85;
