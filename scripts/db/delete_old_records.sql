DELETE FROM tprice WHERE created_at < (CURRENT_DATE - interval '3 years');
DELETE FROM tvalues WHERE created_at < (CURRENT_DATE - interval '3 years');