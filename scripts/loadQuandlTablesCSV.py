import csv
import argparse
from datetime import datetime

import psycopg2

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock definitions to data tables.')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('--host', dest='db_host', help='database name')
parser.add_argument('-f', dest='input', help='path of full csv export')
parser.add_argument('--debug', dest='debug', action='store_true', help='print out debug information')

db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
debug = parser.parse_args().debug
maxItems = parser.parse_args().maxItems
inputFile = parser.parse_args().input

conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (db_name, db_user, db_host, db_pwd))


mapping = {
  'VALUES': ['price_earnings_ratio', 'price_cashflow_ratio', 'price_book_ratio', 'peg_ratio', 'enterprise_ratio', 'price_52_wk', 'graham_multiplier', 'robur_score', 'current_yield', 'market_capitalization'],
  'INCOME': [ 'revenue', 'operating_revenue', 'net_income_exc', 'net_income_inc', 'eps_exc', 'eps_inc', 'dividend', 'diluted_shares_os', 'historic_yield', 'share_price_eop', 'last_share_price'],
  'CASHFLOW': ['cash_operations', 'depreciation', 'capex', 'cash_investing', 'issuance_of_stock', 'issuance_of_debt', 'cash_financing', 'start_cash', 'end_cash'],
  'BALANCE': ['current_assets', 'goodwill', 'intangibles', 'total_assets', 'current_liabilities', 'long_term_debt', 'total_liabilities', 'shareholder_equity'],
  'SIGNALS': ['current_ratio', 'buybacks', 'solvency', 'dividend_payout', 'operating_margin', 'net_inc_margin', 'roe', 'roae', 'rotc', 'lt_debt_op_income'],
  'FORECAST': ['revenue', 'operating_income', 'net_income_exc', 'cash_operations', 'depreciation', 'capex', 'start_cash', 'end_cash', 'eps_exc', 'dividend']
}

# Program logic
floatStr = lambda d: None if d is '' else float(d)

totalProcessed = 0


existing_countries = dict()
existing_branches = dict()

last_quandl_id = None

with open(inputFile, 'r') as f:
  reader = csv.reader(f, delimiter=',')
  stockId = None
  for row in reader:
    data = dict()
    cur = conn.cursor()
    
    quandl_row = row[0].split('_')
    quandl_table = quandl_row[1]

    quandl_id = int(quandl_row[0])
    
    try:
      data['modified_at'] = datetime.strptime(row[1], '%Y-%m-%d').date()
    except ValueError:
      continue
    
    if last_quandl_id != quandl_id:
      cur.execute("select stock_id from tstock where quandl_rb1_id = %d" % quandl_id)
      stockId = cur.fetchone()
      if last_quandl_id is not None:
        totalProcessed += 1
        conn.commit()
        if maxItems is not None and totalProcessed == maxItems:
          break
      last_quandl_id = quandl_id

    # Skip CAGR table
    if quandl_table == 'CAGR':
      continue

    # Skip if stock is not in tstock table
    if stockId is not None:  
      data['stock_id'] = stockId
    else:
      continue

    i = 2
    while i < len(row):
      data[mapping[quandl_table][i-2]] = floatStr(row[i])
      i += 1
    
    try:
      cur.execute(Utils.createSqlString(data.keys(), 't' + quandl_table.lower()), data)
    except psycopg2.Error as e:
      print(e.pgerror)
      conn.rollback()


conn.commit()
conn.close()

print('Totally processed: %s' % str(totalProcessed))
