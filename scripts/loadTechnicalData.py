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
technical_url = base_url + "technische-kennzahlen/"

conn = psycopg2.connect("dbname=%s user=%s host=%s" % (db_name, db_user, db_host))
cur = conn.cursor()

if maxItems:
	cur.execute("""SELECT * FROM vtechicaldata where technical_data_id is null LIMIT %d;""" % (maxItems))
else:
	cur.execute("""SELECT * FROM vtechicaldata where technical_data_id is null;""")
stocks = cur.fetchall()

for stock in stocks:
	link = technical_url + str(stock[1].split('/')[-1])
	response = requests.get(link)
	print('%s\n' % link)
	if (response.status_code == 200):
		soup = BeautifulSoup(response.content, 'html.parser')
		data = Utils.getTechnicalFigures(soup, 'mappingTechnicalFigures.json')
		if not stock[2]:
			data['stock_id'] = stock[0]
			data['modified_at'] = Utils.getActualDate()
			cur.execute(Utils.createSqlString(data.keys(), 'ttechnicaldata'), data)

conn.commit();
conn.close();
