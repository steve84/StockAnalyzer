import requests
import json
from bs4 import BeautifulSoup
import argparse
import re
import csv
import os

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
actual_year = 2017
fnames = None

link = "http://www.onvista.de/aktien/fundamental/Volkswagen-VZ-Aktie-DE0007664039"
#link = fundamental_url + str(stock['url'].split('/')[-1])
response = requests.get(link)
data = dict()
years = list()
print('%s\n' % link)
if (response.status_code == 200):
	soup = BeautifulSoup(response.content, 'html.parser')
	kennzahlen = soup.find("article", {"class": "KENNZAHLEN"})
	if (kennzahlen):
		tables = kennzahlen.findAll("table")
		for table in tables:
			rows = table.findAll("tr")
			i = 0
			for row in rows:
				if i == 0:
					if len(years) == 0:
						cols = row.findAll("th", {"class": "ZAHL"})
						for col in cols:
							year = re.findall('\d+', col.text)
							if len(year) > 0:
								if len(year[0]) == 2:
									year[0] = '20' + year[0]
								years.append(year[0])
				else:
					fact = row.find("td", {"class": "INFOTEXT"})
					if fact:
						fact = fact.text
					cols = row.findAll("td", {"class": "ZAHL"})
					counter = 0
					for col in cols:
						if counter < len(years):
							tmp_year = years[counter]
							if tmp_year not in data.keys():
								data[tmp_year] = dict()
	
							tmp_value = re.findall('[-]?\d+[,]?\d+', col.text.replace('.', ''))
							if len(tmp_value) == 1:
								data[tmp_year][fact] = tmp_value[0]
							else:
								data[tmp_year][fact] = ''
							counter += 1
				i += 1
	
	
	
	
	
	