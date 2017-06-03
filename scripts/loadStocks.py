# -*- coding: latin-1 -*-

import urllib.request
import urllib.parse
import json
import argparse

import psycopg2


# Argument parser
parser = argparse.ArgumentParser(description='Load stock definitions to data tables.')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')

maxItems = parser.parse_args().maxItems
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name

# Program logic
noneStr = lambda s: '' if s is None else str(s)

base_link = 'http://www.onvista.de'
path_link = 'aktien/boxes/finder-json'
query_params = dict()
continents = ['Europa', 'Nordamerika', 'Asien - Pazifik', 'Mittel- und Südamerika', 'Afrika und Naher Osten']

conn = psycopg2.connect("dbname=%s user=%s host=172.17.0.1" % (db_name, db_user))
cur = conn.cursor()

totalHits = -1
page = 1
totalPages = 1
pageSize = 50

totalProcessed = 0
totalInserted = {'countries': 0, 'branches': 0, 'stocks': 0}

existing_countries = dict()
existing_branches = dict()
i = 0
for continent in continents:
	key = 'continent[' + str(i) + ']'
	query_params[key] = urllib.parse.quote(continent)
	i += 1

while page <= totalPages:
	query_params['offset'] = page * pageSize
	link = '/'.join([base_link, path_link]) + '?' + urllib.parse.urlencode(query_params)

	json_data = urllib.request.urlopen(link).read()
	data = json.loads(json_data.decode('utf-8'))

	if totalHits == -1:
		totalHits = int(data['metaData']['totalHits'])
		if totalHits % pageSize == 0:
			totalPages = int(totalHits / pageSize)
		else:
			totalPages = int(totalHits / pageSize) + 1
	

	for stock in data['stocks']:

		stock['country_id'] = None
		stock['branch_id'] = None
		isin = stock['url'].split('-Aktie-')
		if len(isin) >= 2:
			stock['isin'] = isin[1]
			
		# select
		if not (noneStr(stock['country']) + noneStr(stock['countryCode'])) in existing_countries.keys():
			cur.execute("""SELECT * FROM tcountry WHERE name = %(country)s AND code = %(countryCode)s;""", stock)
			country = cur.fetchone()
			if not country:
				# insert
				cur.execute("""INSERT INTO tcountry (name, code) VALUES (%(country)s, %(countryCode)s) RETURNING country_id;""", stock)
				stock['country_id'] = cur.fetchone()[0]
				totalInserted['countries'] += 1
			else:
				stock['country_id'] = country[0]
			if stock['country'] and stock['countryCode']:
				existing_countries[(noneStr(stock['country']) + noneStr(stock['countryCode']))] = stock['country_id']
		else:
			stock['country_id'] = existing_countries[(noneStr(stock['country']) + noneStr(stock['countryCode']))]

		# select
		if not noneStr(stock['branch']) in existing_branches.keys():
			cur.execute("""SELECT * FROM tbranch WHERE name = %(branch)s;""", stock)
			branch = cur.fetchone()
			if not branch:
				# insert
				cur.execute("""INSERT INTO tbranch (name) VALUES (%(branch)s) RETURNING branch_id;""", stock)
				stock['branch_id'] = cur.fetchone()[0]
				totalInserted['branches'] += 1
			else:
				stock['branch_id'] = branch[0]
			if stock['branch']:
				existing_branches[noneStr(stock['branch'])] = stock['branch_id']
		else:
			stock['branch_id'] = existing_branches[noneStr(stock['branch'])]

		# select
		cur.execute("""SELECT * FROM tstock WHERE isin = %(isin)s;""", stock)
		if cur.rowcount == 0:
			# insert
			cur.execute("""INSERT INTO tstock (name, nsin, isin, url, branch_id, country_id) VALUES (%(name)s, %(nsin)s, %(isin)s, %(url)s, %(branch_id)s, %(country_id)s);""", stock)
			totalInserted['stocks'] += 1
			
		totalProcessed += 1

		if totalProcessed % 250 == 0:
			print('Total processed: %s' % totalProcessed)

		if maxItems and totalProcessed >= maxItems:
			break
	if maxItems and totalProcessed >= maxItems:
		break
	page += 1
		
		
conn.commit();
conn.close();

print('Totally processed: %s' % str(totalHits))
print('Inserts to country table: %s' % str(totalInserted['countries']))
print('Inserts to branch table: %s' % str(totalInserted['branches']))
print('Inserts to stock table: %s' % str(totalInserted['stocks']))