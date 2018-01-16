from os import environ
import subprocess

from apscheduler.schedulers.blocking import BlockingScheduler

scheduler = BlockingScheduler()

host = environ.get('DB_HOST')
user = environ.get('DB_USER')
pwd = environ.get('DB_PWD')
database = environ.get('DB_NAME')
port = environ.get('DB_PORT')
quandl_key = environ.get('QUANDL_KEY')
daily_max_items = environ.get('DAILY_MAX_ITEMS')
daily_max_age = environ.get('DAILY_MAX_AGE')
monthly_max_items = environ.get('MONTHLY_MAX_ITEMS')
monthly_max_age = environ.get('MONTHLY_MAX_AGE')

def load_daily():
  print('Start daily')
  print('Delete old records')
  subprocess.call('psql postgres://%s:%s@%s:%s/%s -f db/delete_old_records.sql' % (user, pwd, host, port, database), shell=True)
  print('Load prices')
  subprocess.call('python3 loadQuandlPrices.py --host %s -u %s -p %s -d %s -k %s' % (host, user, pwd, database, quandl_key), shell=True)
  print('Load tables')
  subprocess.call('python3 loadQuandlTables.py --daily --host %s -u %s -p %s -d %s -k %s' % (host, user, pwd, database, quandl_key), shell=True)
  print('Calculate scores')
  subprocess.call('python3 calculateQuandlScores.py --host %s -u %s -p %s -d %s -k %s -t %s -n %s --stocks --indices --levermann --piotroski --magic' % (host, user, pwd, database, quandl_key, daily_max_age, daily_max_items), shell=True)
  print('Update indices')
  subprocess.call('psql postgres://%s:%s@%s:%s/%s -f db/insert_stockindex_quandl.sql' % (user, pwd, host, port, database), shell=True)
  subprocess.call('psql postgres://%s:%s@%s:%s/%s -f db/insert_msci_cap_quandl.sql' % (user, pwd, host, port, database), shell=True)
  

def load_monthly():
  print('Start monthly')
  print('Load stocks')
  subprocess.call('python3 loadQuandlStocksCSV.py --host %s -u %s -p %s -d %s -k %s' % (host, user, pwd, database, quandl_key), shell=True)
  print('Load tables')
  subprocess.call('python3 loadQuandlTables.py --host %s -u %s -p %s -d %s -k %s' % (host, user, pwd, database, quandl_key), shell=True)
  print('Calculate scores')
  subprocess.call('python3 calculateQuandlScores.py --host %s -u %s -p %s -d %s -k %s -t %s -n %s --stocks --indices --levermann --piotroski --magic' % (host, user, pwd, database, quandl_key, monthly_max_age, monthly_max_items), shell=True)
  print('Update indices')
  subprocess.call('psql postgres://%s:%s@%s:%s/%s -f db/insert_stockindex_quandl.sql' % (user, pwd, host, port, database), shell=True)
  subprocess.call('psql postgres://%s:%s@%s:%s/%s -f db/insert_msci_cap_quandl.sql' % (user, pwd, host, port, database), shell=True)

scheduler.add_job(load_daily, 'cron', day_of_week='tue-sat', hour='7')
scheduler.add_job(load_monthly, 'cron', month='1-12', day='2nd sun', hour='1')

scheduler.start()

# Daily:
# - loadQuandlPrices
# - loadQuandlTables --daily
# - calculateQuandlScores
# - insert_stockindex_quandl.sql
# - insert_msci_cap_quandl.sql

# Monthly:
# - loadQuandlStocksCSV
# - loadQuandlTables
# - calculateQuandlScores
