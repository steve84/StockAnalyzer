insert into tcountry (name) values ('Germany');
insert into tcountry (name) values ('New Zealand');
insert into tcountry (name) values ('Japan');
insert into tcountry (name) values ('Austria');
insert into tcountry (name) values ('UK');
insert into tcountry (name) values ('China inc HK');
insert into tcountry (name) values ('Singapore');

insert into tbranch (name, branch_group) values ('lighting equipment', 'industrial');
insert into tbranch (name, branch_group) values ('office commercial and industrial real estate', 'real estate');
insert into tbranch (name, branch_group) values ('financial services', 'services');
insert into tbranch (name, branch_group) values ('research and specialist materials', 'technology');
insert into tbranch (name, branch_group) values ('residential real estate', 'real estate');
insert into tbranch (name, branch_group) values ('food manufacturers', 'consumer');
insert into tbranch (name, branch_group) values ('diversified real estate', 'real estate');
insert into tbranch (name, branch_group) values ('search cloud and integrated IT services', 'IT');

insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Osram Licht AG', 'DE000LED4000', 1, 1, 'EUR', 2538);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Goodman Property Trust', 'NZCPTE0001S9', 2, 2, 'NZD', 2291);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Orix Corp', 'JP3200450009', 3, 3, 'JPY', 2063);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('RHI AG', 'AT0000676903', 4, 4, 'EUR', 3050);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Big Yellow Group Plc', 'GB0002869419', 5, 2, 'GBR', 3646);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Berkeley Group Holdings PLC', 'GB00B02L3W35', 5, 5, 'GBR', 31);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Toyo Suisan Kaisha Ltd', 'JP3613000003', 3, 6, 'JPY', 2421);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Hang Lung Group Ltd.', 'HK0010000088', 6, 7, 'HKD', 1712);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id) values ('Silverlake Axis Ltd', 'BMG8226U1071', 7, 8, 'SGD', 2030);






