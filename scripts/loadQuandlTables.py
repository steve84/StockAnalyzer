import quandl
from quandl.errors.quandl_error import QuandlError
import psycopg2
import argparse

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock fundamentals to data tables.')
parser.add_argument('-t', dest='maxAge', type=int, help='update stocks older than maxAge (unit: days)')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('-k', dest='quandl_key', help='quandl api key')
parser.add_argument('--host', dest='db_host', help='database name')

maxItems = parser.parse_args().maxItems
maxAge = parser.parse_args().maxAge
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
quandl_key = parser.parse_args().quandl_key

databaseCode = 'RB1'

quandlTables = ['INCOME', 'CASHFLOW', 'BALANCE', 'SIGNALS', 'VALUES', 'FORECAST']
tableMapping = {'INCOME': 'mappingIncome', 'CASHFLOW': 'mappingCashflow', 'BALANCE': 'mappingBalance', 'SIGNALS': 'mappingSignals', 'VALUES': 'mappingValues', 'FORECAST': 'mappingForecast'}
maxDateMapping = {'INCOME': 8, 'CASHFLOW': 9, 'BALANCE': 10, 'SIGNALS': 11, 'VALUES': 12, 'FORECAST': 13}

conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (db_name, db_user, db_host, db_pwd))
cur = conn.cursor()

stockUpdated = 0

cur.execute("""SELECT * FROM vstock ORDER BY last_date_values NULLS FIRST""")

for stock in cur:
    stockUpdate = False
    quandlId = str(stock[5]).zfill(4)
    try:
        for tableName in quandlTables:
            curStock = conn.cursor()
            try:
              data = Utils.getKeyFiguresQuandl(databaseCode + '/' + quandlId + '_' + tableName, 'quandl/' + tableMapping[tableName] + '.json', quandl_key)
              for rowDate in data.keys():
                  if stock[maxDateMapping[tableName]] is None or rowDate > stock[maxDateMapping[tableName]]:
                      data[rowDate]['stock_id'] = stock[0]
                      data[rowDate]['modified_at'] = rowDate
                      curStock.execute(Utils.createSqlString(data[rowDate], 't' + tableName.lower()), data[rowDate])
                      stockUpdate = True
            except QuandlError as qe:
              print("Quandl error during dataset %s_%s" % (quandlId, tableName))
              print("Exception: %s" % qe)
              continue
        conn.commit()
    except Exception as e:
        conn.rollback()
        stockUpdate = False
        print("An error occured: %s" % stock[1])
        print("Error message: %s" % e)
    
    if stockUpdate:
        stockUpdated += 1
        if maxItems is not None and stockUpdated >= maxItems:
            break

conn.commit()
conn.close()
