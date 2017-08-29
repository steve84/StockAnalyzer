import quandl
import psycopg2

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

conn = psycopg2.connect("dbname=%s user=%s host=%s" % (db_name, db_user, db_host))
cur = conn.cursor()

cur.execute("""SELECT * FROM tstock""")

for stock in cur:
    try:
        quandlId = stock[11]
        curStock = conn.cursor()
        for tableName in quandlTables:
            data = Utils.getKeyFiguresQuandl(databaseCode + '/' + str(quandlId) + '_' + tableName, 'quandl/' + tableMapping[tableName] + '.json', quandl_key)
            for rowDate in data.keys():
                data[rowDate]['stock_id'] = stock[0]
                data[rowDate]['modified_at'] = rowDate
                curStock.execute(Utils.createSqlString(data[rowDate], 't' + tableName.lower()), data[rowDate])
        conn.commit()
    except Exception as e:
        conn.rollback()
        print("An error occured: %s" % stock[1])
        print("Error message: %s" % e)

conn.commit()
conn.close()