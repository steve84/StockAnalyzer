from sys import exit
import argparse

import quandl
import psycopg2
from psycopg2.extras import RealDictCursor

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock/index prices to data tables.')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('-k', dest='quandl_key', help='quandl api key')
parser.add_argument('--host', dest='db_host', help='database name')
parser.add_argument('--debug', dest='debug', action='store_true', help='print out debug information')


maxItems = parser.parse_args().maxItems
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
quandl_key = parser.parse_args().quandl_key
debug = parser.parse_args().debug

conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (db_name, db_user, db_host, db_pwd))
cur = conn.cursor(cursor_factory = RealDictCursor)

cur.execute("""SELECT s.stock_id, s.quandl_price_dataset, s.share_currency, MAX(p.created_at) AS last_date FROM tstock s LEFT JOIN tprice p ON s.stock_id = p.stock_id GROUP BY s.stock_id, s.quandl_price_dataset, s.share_currency ORDER BY last_date NULLS FIRST""")

stockProcessed = 0
totalDatasets = 0
for stock in cur:
    curPrices = conn.cursor()
    prices = Utils.getQuandlStockPrice(stock['quandl_price_dataset'], quandl_key)
    i = 0
    while i < len(prices):
        if stock['last_date'] is None or prices.keys()[i].date() > stock['last_date']:
            priceDict = dict()
            priceDict['stock_id'] = stock['stock_id']
            priceDict['price'] = prices.values[i]
            priceDict['currency'] = stock['share_currency']
            priceDict['quandl_code'] = stock['quandl_price_dataset']
            priceDict['created_at'] = prices.keys()[i].date()
            curPrices.execute(Utils.createSqlString(priceDict.keys(), 'tprice'), priceDict)
            totalDatasets += 1
        else:
            break
        i += 1
    conn.commit()
    stockProcessed += 1
    if maxItems is not None and stockProcessed == maxItems:
        break

conn.close()
print('Total stock processed: %s' % str(stockProcessed))
print('Total datasets loaded: %s' % str(stockProcessed))
