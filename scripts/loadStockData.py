# -*- coding: latin-1 -*-

import json
import argparse
import requests

import psycopg2

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock fundamentals to data tables.')
parser.add_argument('-t', dest='maxAge', type=int, help='update stocks older than maxAge (unit: days)')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('--host', dest='db_host', help='database name')

maxItems = parser.parse_args().maxItems
maxAge = parser.parse_args().maxAge
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host

daily_figures = {
	'price_earnings_ratio',
	'price_earnings_ratio_5y_avg',
	'earnings_per_share',
	'earnings_per_share_growth_expected',
	'profit_growth_1year',
	'profit_peg',
	'dividend_amount',
	'dividend_yield',
	'cashflow_per_share',
	'cashflow_kcv',
	'analyst_sell_ratio'
}

base_url = "http://www.onvista.de/"
fundamental_url = base_url + "aktien/fundamental/"
technical_url = base_url + "aktien/technische-kennzahlen/"
analyst_rating_url = base_url + "news/boxes/aggregated-analyses?timespan=-3+months&assetType=Stock&assetId="
actual_year = Utils.getActualYear()

totalUpdated = 0

conn = psycopg2.connect("dbname=%s user=%s host=%s" % (db_name, db_user, db_host))
cur = conn.cursor()
cur.execute("""SELECT * FROM vstock""")
for stock in cur:
	try:
		curStock = conn.cursor()
		fundamental_data = dict()
		technical_data = dict()
		analyst_rating_data = dict()
		StockUpdated = False
		BusinessYearEnd = None
		
		# Business year end
		if not stock[7]:
			if len(fundamental_data) == 0:
				link = fundamental_url + str(stock[6].split('/')[-1])
				fundamental_data = Utils.getKeyFigures(link, 'mapping.json')
			# Update business year end
			if str(actual_year) in fundamental_data.keys():
				curStock.execute(Utils.createSqlString({'business_year_end'} , 'tstock', 'stock_id = %d' % stock[0], False), fundamental_data[str(actual_year)])
				BusinessYearEnd = fundamental_data[str(actual_year)]['business_year_end']
				StockUpdated = StockUpdated or True
		else:
			BusinessYearEnd = stock[7]

		actualBusinessYear = str(Utils.getLastBusinessYear(BusinessYearEnd) + 1)
		nextBusinessYear = str(Utils.getLastBusinessYear(BusinessYearEnd) + 2)

		# Daily fundamental
		if not stock[11]:
			# Insert
			if len(fundamental_data) == 0:
				link = fundamental_url + str(stock[6].split('/')[-1])
				fundamental_data = Utils.getKeyFigures(link, 'mapping.json')
			if len(analyst_rating_data) == 0:
				link = analyst_rating_url + stock[3]
				analyst_rating_data = Utils.getAnalystRatings(link, 'mappingAnalystRatings.json')
			if actualBusinessYear in fundamental_data.keys():
				fundamental_data[actualBusinessYear]['price_earnings_ratio_5y_avg'] = Utils.avgYearValue(fundamental_data, 'price_earnings_ratio', int(actualBusinessYear))
				fundamental_data[actualBusinessYear]['earnings_per_share_growth_expected'] = 0.0
				if nextBusinessYear in fundamental_data.keys() and 'earnings_per_share' in fundamental_data[actualBusinessYear].keys() and 'earnings_per_share' in fundamental_data[nextBusinessYear].keys():
					fundamental_data[actualBusinessYear]['earnings_per_share_growth_expected'] = Utils.calcGrowth(fundamental_data[actualBusinessYear]['earnings_per_share'], fundamental_data[nextBusinessYear]['earnings_per_share'])
				fundamental_data[actualBusinessYear]['analyst_sell_ratio'] = 0.0
				if 'sell' in analyst_rating_data.keys():
					fundamental_data[actualBusinessYear]['analyst_sell_ratio'] = analyst_rating_data['sell']
				fundamental_data[actualBusinessYear]['stock_id'] = stock[0]
				fundamental_data[actualBusinessYear]['modified_at'] = Utils.getActualDate()
				curStock.execute(Utils.createSqlString(daily_figures.union({'modified_at', 'stock_id'}) , 'tdailyfundamental'), fundamental_data[actualBusinessYear])
				StockUpdated = StockUpdated or True
		elif maxAge is not None and Utils.getDayDiff(stock[12]) >= maxAge:
			# Update
			if len(fundamental_data) == 0:
				link = fundamental_url + str(stock[6].split('/')[-1])
				fundamental_data = Utils.getKeyFigures(link, 'mapping.json')
			if len(analyst_rating_data) == 0:
				link = analyst_rating_url + stock[3]
				analyst_rating_data = Utils.getAnalystRatings(link, 'mappingAnalystRatings.json')
			if actualBusinessYear in fundamental_data.keys():
				fundamental_data[actualBusinessYear]['price_earnings_ratio_5y_avg'] = Utils.avgYearValue(fundamental_data, 'price_earnings_ratio', int(actualBusinessYear))
				fundamental_data[actualBusinessYear]['earnings_per_share_growth_expected'] = 0.0
				if nextBusinessYear in fundamental_data.keys() and 'earnings_per_share' in fundamental_data[actualBusinessYear].keys() and 'earnings_per_share' in fundamental_data[nextBusinessYear].keys():
					fundamental_data[actualBusinessYear]['earnings_per_share_growth_expected'] = Utils.calcGrowth(fundamental_data[actualBusinessYear]['earnings_per_share'], fundamental_data[nextBusinessYear]['earnings_per_share'])
				fundamental_data[actualBusinessYear]['analyst_sell_ratio'] = 0.0
				if 'sell' in analyst_rating_data.keys():
					fundamental_data[actualBusinessYear]['analyst_sell_ratio'] = analyst_rating_data['sell']
				fundamental_data[actualBusinessYear]['modified_at'] = Utils.getActualDate()
				curStock.execute(Utils.createSqlString(daily_figures.union({'modified_at'}) , 'tdailyfundamental', 'stock_id = %d' % stock[0], False), fundamental_data[actualBusinessYear])
				StockUpdated = StockUpdated or True

		# Annual fundamental
		if not stock[14] or Utils.getLastBusinessYear(BusinessYearEnd) > stock[14]:
			if len(fundamental_data) == 0:
				link = fundamental_url + str(stock[6].split('/')[-1])
				fundamental_data = Utils.getKeyFigures(link, 'mapping.json')
			for year in fundamental_data.keys():
				if (not stock[14] or int(year) > stock[14]) and int(year) <= Utils.getLastBusinessYear(BusinessYearEnd):
					fundamental_data[year]['year_value'] = int(year)
					fundamental_data[year]['stock_id'] = stock[0]
					del fundamental_data[year]['business_year_end']
					curStock.execute(Utils.createSqlString(set(fundamental_data[year].keys()) - daily_figures , 'tannualfundamental'), fundamental_data[year])
					StockUpdated = StockUpdated or True

		# Technical data
		if not stock[15]:
			# Insert
			if len(technical_data) == 0:
				link = technical_url + str(stock[6].split('/')[-1])
				technical_data = Utils.getTechnicalFigures(link, 'mappingTechnicalFigures.json')
			technical_data['stock_id'] = stock[0]
			technical_data['modified_at'] = Utils.getActualDate()
			curStock.execute(Utils.createSqlString(technical_data.keys(), 'ttechnicaldata'), technical_data)
			StockUpdated = StockUpdated or True
		elif maxAge is not None and Utils.getDayDiff(stock[16]) >= maxAge:
			# Update
			if len(technical_data) == 0:
				link = technical_url + str(stock[6].split('/')[-1])
				technical_data = Utils.getTechnicalFigures(link, 'mappingTechnicalFigures.json')
			technical_data['modified_at'] = Utils.getActualDate()
			curStock.execute(Utils.createSqlString(set(technical_data.keys()) - {'stock_id'}, 'ttechnicaldata', 'stock_id = %d' % stock[0], False), technical_data)
			StockUpdated = StockUpdated or True

		if StockUpdated:
			totalUpdated += 1
		if totalUpdated == maxItems:
			break
	except:
		print("An error occured: %s" % stock[1])
		print("URL: %s" % stock[6])

conn.commit();
conn.close()
