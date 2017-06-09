import requests
import json
from bs4 import BeautifulSoup
import argparse
import re
import csv
import os

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

with open('mapping.json') as json_file:
	mapping = json.load(json_file)


# Loop über View
# select * from
# tstock s
# left join tcountry c on s.country_id = c.country_id
# left join tbranch b on s.branch_id = b.branch_id
# left join tdailyfundamental df on s.stock_id = df.stock_id
# left join tannualfundamental af on s.stock_id = af.stock_id


link = "http://www.onvista.de/aktien/fundamental/Volkswagen-VZ-Aktie-DE0007664039"
#link = fundamental_url + str(stock['url'].split('/')[-1])
response = requests.get(link)
data = dict()
years = list()
print('%s\n' % link)
if (response.status_code == 200):
	soup = BeautifulSoup(response.content, 'html.parser')
	data = Utils.getKeyFigures(soup, 'mapping.json')
	# Fälle für Synchronisation auf DB
	# 1. Fall: Aktie hat noch keine Fundamentaldaten
	# 2. Fall: Aktie fehlen tägliche oder jährliche Fundamentaldaten
	# 3. Fall: Aktie hat täglich und jährliche Fundamentaldaten, welche jedoch nicht vollständig sind oder aktualisiert werden wollen
import pdb; pdb.set_trace()
	