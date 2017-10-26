insert into tcountry (name, created_at) values ('Germany', CURRENT_DATE);
insert into tcountry (name, created_at) values ('New Zealand', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Japan', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Austria', CURRENT_DATE);
insert into tcountry (name, created_at) values ('UK', CURRENT_DATE);
insert into tcountry (name, created_at) values ('China inc HK', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Singapore', CURRENT_DATE);

insert into tbranch (name, branch_group, created_at) values ('lighting equipment', 'industrial', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('office commercial and industrial real estate', 'real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('financial services', 'services', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('research and specialist materials', 'technology', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('residential real estate', 'real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('food manufacturers', 'consumer', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('diversified real estate', 'real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('search cloud and integrated IT services', 'IT', CURRENT_DATE);

insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Osram Licht AG', 'DE000LED4000', 1, 1, 'EUR', 2538, 'SSE/OSR', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Goodman Property Trust', 'NZCPTE0001S9', 2, 2, 'NZD', 2291, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Orix Corp', 'JP3200450009', 3, 3, 'JPY', 2063, 'SSE/OIX', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('RHI AG', 'AT0000676903', 4, 4, 'EUR', 3050, 'SSE/RAD', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Big Yellow Group Plc', 'GB0002869419', 5, 2, 'GBR', 3646, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Berkeley Group Holdings PLC', 'GB00B02L3W35', 5, 5, 'GBR', 31, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Toyo Suisan Kaisha Ltd', 'JP3613000003', 3, 6, 'JPY', 2421, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Hang Lung Group Ltd.', 'HK0010000088', 6, 7, 'HKD', 1712, 'SSE/HLU', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Silverlake Axis Ltd', 'BMG8226U1071', 7, 8, 'SGD', 2030, null, CURRENT_DATE);






