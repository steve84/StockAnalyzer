import sys
import csv
import argparse
import requests
from datetime import datetime
from io import StringIO
import pandas

import psycopg2

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock definitions to data tables.')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('-k', dest='quandl_key', help='quandl api key')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('--host', dest='db_host', help='database name')
parser.add_argument('--debug', dest='debug', action='store_true', help='print out debug information')

db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
debug = parser.parse_args().debug
quandl_key = parser.parse_args().quandl_key
maxItems = parser.parse_args().maxItems

conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (db_name, db_user, db_host, db_pwd))

priceDatabaseCode = ['SSE', 'SIX']

stockFile = 'https://s3.amazonaws.com/static.quandl.com/robur/RoburShortMeta_meta.xlsx'

mandatoryKeys = {'name', 'country', 'branch', 'branch_group', 'isin', 'reference_currency'}
headers = ['Full Name', 'Country', 'ISIN', 'YF Ticker', 'Sector Group', 'Sector', 'Reference Currency', 'Dataset']
header_pos = dict()

# Program logic
noneStr = lambda s: '' if s is None else str(s)

totalProcessed = 0
totalInserted = {'countries': 0, 'branches': 0, 'stocks': 0}

existing_countries = dict()
existing_branches = dict()

xlsx_file = pandas.read_excel('http://s3.amazonaws.com/static.quandl.com/robur/RoburShortMeta_meta.xlsx')
f = StringIO()
xlsx_file.to_csv(f, sep=';')
f.seek(0)
reader = csv.reader(f, delimiter=';')
row_number = 0
for row in reader:
  cur = conn.cursor()
  if row_number == 0:
    for header in headers:
      try:
        header_pos[header] = row.index(header)
      except ValueError:
        sys.exit()
  else:
    stock = dict()
    stock['name'] = row[header_pos['Full Name']]
    stock['country'] = row[header_pos['Country']]
    stock['isin'] = row[header_pos['ISIN']]
    stock['symbol'] = row[header_pos['YF Ticker']]
    stock['branch'] = row[header_pos['Sector']]
    stock['branch_group'] = row[header_pos['Sector Group']]
    stock['reference_currency'] = row[header_pos['Reference Currency']]
    stock['quandl_rb1_id'] = int(row[header_pos['Dataset']].split('RB1/')[1])
    stock['country_id'] = None
    stock['branch_id'] = None
    stock['created_at'] = Utils.getActualDate()

    # select
    if not noneStr(stock['country']) in existing_countries.keys():
      cur.execute("""SELECT * FROM tcountry WHERE name = %(country)s;""", stock)
      country = cur.fetchone()
      if not country:
          # insert
          cur.execute("""INSERT INTO tcountry (name, created_at) VALUES (%(country)s, %(created_at)s) RETURNING country_id;""", stock)
          stock['country_id'] = cur.fetchone()[0]
          totalInserted['countries'] += 1
      else:
          stock['country_id'] = country[0]
      if stock['country']:
          existing_countries[noneStr(stock['country'])] = stock['country_id']
    else:
      stock['country_id'] = existing_countries[noneStr(stock['country'])]

    # select
    if not (noneStr(stock['branch']) + noneStr(stock['branch_group']))  in existing_branches.keys():
      cur.execute("""SELECT * FROM tbranch WHERE name = %(branch)s;""", stock)
      branch = cur.fetchone()
      if not branch:
          # insert
          cur.execute("""INSERT INTO tbranch (name, branch_group, created_at) VALUES (%(branch)s, %(branch_group)s, %(created_at)s) RETURNING branch_id;""", stock)
          stock['branch_id'] = cur.fetchone()[0]
          totalInserted['branches'] += 1
      else:
          stock['branch_id'] = branch[0]
      if stock['branch']:
          existing_branches[noneStr(stock['branch']) + noneStr(stock['branch_group'])] = stock['branch_id']
    else:
      stock['branch_id'] = existing_branches[noneStr(stock['branch']) + noneStr(stock['branch_group'])]

    # select
    cur.execute("""SELECT * FROM tstock WHERE isin = %(isin)s;""", stock)
    if cur.rowcount == 0:
      stock['quandl_price_dataset'] = None
      stock['share_currency'] = None
      priceDataset = Utils.getQuandlStockPriceDataset(priceDatabaseCode, stock['name'], stock['isin'], quandl_key)
      if priceDataset is not None and len(priceDataset) == 2:
          stock['quandl_price_dataset'] = priceDataset[0]
          stock['share_currency'] = priceDataset[1]
      # insert
      cur.execute("""INSERT INTO tstock (name, isin, branch_id, country_id, reference_currency, share_currency, quandl_rb1_id, quandl_price_dataset, created_at) VALUES (%(name)s, %(isin)s, %(branch_id)s, %(country_id)s, %(reference_currency)s, %(share_currency)s, %(quandl_rb1_id)s, %(quandl_price_dataset)s, %(created_at)s);""", stock)
      totalInserted['stocks'] += 1
      totalProcessed += 1
  if row_number % 25 == 0:
    conn.commit()
  if maxItems is not None and totalProcessed == maxItems:
    conn.commit()
    break
  row_number = row_number + 1

conn.commit()
conn.close()

print('Totally processed: %s' % str(totalProcessed))
print('Inserts to country table: %s' % str(totalInserted['countries']))
print('Inserts to branch table: %s' % str(totalInserted['branches']))
print('Inserts to stock table: %s' % str(totalInserted['stocks']))
