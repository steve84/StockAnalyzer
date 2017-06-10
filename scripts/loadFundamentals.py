import requests
import json
from bs4 import BeautifulSoup
import argparse
import re
import csv
import os


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
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host

base_url = "http://www.onvista.de/aktien/"
fundamental_url = base_url + "fundamental/"
actual_year = Utils.getActualYear()

daily_figures = {
	'price_earnings_ratio',
	'earnings_per_share',
	'profit_growth_1year',
	'profit_peg',
	'dividend_amount',
	'dividend_yield',
	'cashflow_per_share',
	'cashflow_kcv'
}

conn = psycopg2.connect("dbname=%s user=%s host=%s" % (db_name, db_user, db_host))
cur = conn.cursor()

with open('mapping.json') as json_file:
	mapping = json.load(json_file)

if maxItems:
	cur.execute("""SELECT * FROM vfundamental where daily_fundamental_id is null or lastfundamentalyear is null or lastfundamentalyear < %d LIMIT %d;""" % (actual_year - 1, maxItems))
else:
	cur.execute("""SELECT * FROM vfundamental where daily_fundamental_id is null or lastfundamentalyear is null or lastfundamentalyear < %d;""" % (actual_year - 1))
stocks = cur.fetchall()

for stock in stocks:
	link = fundamental_url + str(stock[1].split('/')[-1])
	response = requests.get(link)
	data = dict()
	years = list()
	print('%s\n' % link)
	if (response.status_code == 200):
		soup = BeautifulSoup(response.content, 'html.parser')
		data = Utils.getKeyFigures(soup, 'mapping.json')
		#import pdb;pdb.set_trace()
		# Fälle für Synchronisation auf DB
		# 1. Fall: Aktie hat noch keine Fundamentaldaten
		if not stock[2]:
			data[str(actual_year)]['stock_id'] = stock[0]
			data[str(actual_year)]['modified_at'] = Utils.getActualDate()
			cur.execute(Utils.createSqlString(daily_figures.union({'modified_at', 'stock_id'}) , 'tdailyfundamental'), data[str(actual_year)])
		if not stock[3]:
			for year in data.keys():
				if int(year) < actual_year:
					data[year]['year_value'] = int(year)
					data[year]['stock_id'] = stock[0]
					cur.execute(Utils.createSqlString(set(data[year].keys()) - daily_figures, 'tannualfundamental'), data[year])
		# 2. Fall: Aktie fehlen tägliche oder jährliche Fundamentaldaten
		# 3. Fall: Aktie hat täglich und jährliche Fundamentaldaten, welche jedoch nicht vollständig sind oder aktualisiert werden wollen
conn.commit();
conn.close();
