insert into tcountry (name, created_at) values ('Germany', CURRENT_DATE);
insert into tcountry (name, created_at) values ('New Zealand', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Japan', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Austria', CURRENT_DATE);
insert into tcountry (name, created_at) values ('UK', CURRENT_DATE);
insert into tcountry (name, created_at) values ('China inc HK', CURRENT_DATE);
insert into tcountry (name, created_at) values ('Singapore', CURRENT_DATE);

insert into tbranch (name, branch_group, created_at) values ('Lighting equipment', 'Industrial', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Office commercial and industrial real estate', 'Real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Financial services', 'Services', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Research and specialist materials', 'Technology', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Residential real estate', 'Real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Food manufacturers', 'Consumer', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Diversified real estate', 'Real estate', CURRENT_DATE);
insert into tbranch (name, branch_group, created_at) values ('Search cloud and integrated IT services', 'IT', CURRENT_DATE);

insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Osram Licht AG', 'DE000LED4000', 1, 1, 'EUR', 'CHF', 2538, 'SIX/DE000LED4000CHF', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Goodman Property Trust', 'NZCPTE0001S9', 2, 2, 'NZD', null, 2291, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Orix Corp', 'JP3200450009', 3, 3, 'JPY', 'EUR', 2063, 'SSE/OIX', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('RHI AG', 'AT0000676903', 4, 4, 'EUR', 'EUR', 3050, 'SSE/RAD', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Big Yellow Group Plc', 'GB0002869419', 5, 2, 'GBR', null, 3646, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Berkeley Group Holdings PLC', 'GB00B02L3W35', 5, 5, 'GBR', null, 31, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Toyo Suisan Kaisha Ltd', 'JP3613000003', 3, 6, 'JPY', null, 2421, null, CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Hang Lung Group Ltd.', 'HK0010000088', 6, 7, 'HKD', 'EUR', 1712, 'SSE/HLU', CURRENT_DATE);
insert into tstock (name, isin, country_id, branch_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) values ('Silverlake Axis Ltd', 'BMG8226U1071', 7, 8, 'SGD', null, 2030, null, CURRENT_DATE);






