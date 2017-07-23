import argparse
import psycopg2

from utils import Utils

# Argument parser
parser = argparse.ArgumentParser(description='Load stock fundamentals to data tables.')
parser.add_argument('-t', dest='maxAge', type=int, help='update stocks older than maxAge (unit: days)')
parser.add_argument('-n', dest='maxItems', type=int, help='number of stocks to load')
parser.add_argument('-u', dest='db_user', help='user name of the database')
parser.add_argument('-p', dest='db_pwd', help='database password')
parser.add_argument('-d', dest='db_name', help='database name')
parser.add_argument('--host', dest='db_host', help='database host')
parser.add_argument('--stocks', dest='doStocks', action='store_true', help='calculate values for stocks')
parser.add_argument('--indices', dest='doIndices', action='store_true', help='calculate values for indices')
parser.add_argument('--levermann', dest='doLevermann', action='store_true', help='calculate levermann values')
parser.add_argument('--magic', dest='doMagicFormula', action='store_true', help='calculate magic formula values')

maxItems = parser.parse_args().maxItems
maxAge = parser.parse_args().maxAge
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
doStocks = parser.parse_args().doStocks
doIndices = parser.parse_args().doIndices
doLevermann = parser.parse_args().doLevermann
doMagicFormula = parser.parse_args().doMagicFormula

LEVERMANN_SCORE_TYPE_ID = 1
MAGIC_FORMULA_SCORE_TYPE_ID = 2

conn = psycopg2.connect("dbname=%s user=%s host=%s" % (db_name, db_user, db_host))

if doStocks:
    if doLevermann:
        cur = conn.cursor()
        cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc ON sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL""" % LEVERMANN_SCORE_TYPE_ID)
        for stock in cur:
            curLevermann = conn.cursor()
            curLevermann.execute("""SELECT * FROM vlevermann WHERE stock_id = %d""" % stock[0])
            levermannScore = Utils.calculateLevermann(curLevermann.fetchone())
            if levermannScore:
                levermannDict = dict()
                levermannDict['score_value'] = levermannScore
                levermannDict['modified_at'] = Utils.getActualDate()
                curLevermann.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.stock_id = %d""" % (LEVERMANN_SCORE_TYPE_ID, stock[0]))
                levermannScoreDb = curLevermann.fetchone()
                if levermannScoreDb:
                    curLevermann.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'stock_id = %d' % stock[0], False), levermannDict)
                else:
                    levermannDict['stock_id'] = stock[0]
                    levermannDict['score_type_id'] = LEVERMANN_SCORE_TYPE_ID
                    curLevermann.execute(Utils.createSqlString({'score_type_id', 'stock_id', 'score_value', 'modified_at'}, 'tscore'), levermannDict)

    if doMagicFormula:
        cur = conn.cursor()
        cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc on sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL""" % MAGIC_FORMULA_SCORE_TYPE_ID)
        for stock in cur:
            curMagic = conn.cursor()
            curMagic.execute("""SELECT * FROM vmagicformula WHERE stock_id = %d""" % stock[0])
            magicFormulaScore = Utils.calculateMagicFormula(curMagic.fetchone())
            if magicFormulaScore:
                magicFormulaDict = dict()
                magicFormulaDict['score_value'] = magicFormulaScore
                magicFormulaDict['modified_at'] = Utils.getActualDate()
                curMagic.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.stock_id = %d""" % (MAGIC_FORMULA_SCORE_TYPE_ID, stock[0]))
                magicFormulaScoreDb = curMagic.fetchone()
                if magicFormulaScoreDb:
                    curMagic.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'stock_id = %d' % stock[0], False), magicFormulaDict)
                else:
                    magicFormulaDict['stock_id'] = stock[0]
                    magicFormulaDict['score_type_id'] = MAGIC_FORMULA_SCORE_TYPE_ID
                    curMagic.execute(Utils.createSqlString({'score_type_id', 'stock_id', 'score_value', 'modified_at'}, 'tscore'), magicFormulaDict)

if doIndices:
    if doLevermann:
        cur = conn.cursor()
        cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL""" % LEVERMANN_SCORE_TYPE_ID)
        for index in cur:
            curStocks = conn.cursor()
            curStocks.execute("""SELECT stock_id FROM tstockindex WHERE index_id = %d""" % index[0])
            totalMarketCap = 0
            totalLevermannScore = 0
            for stock in curStocks:
                curLevermann = conn.cursor()
                curLevermann.execute("""SELECT * FROM vlevermann WHERE stock_id = %d""" % stock[0])
                levermannRow = curLevermann.fetchone()
                marketCap = levermannRow[4]
                levermannStockVal = Utils.calculateLevermann(levermannRow)
                if levermannStockVal is not None and marketCap is not None:
                    totalLevermannScore += Utils.calculateLevermann(levermannRow) * marketCap
                    totalMarketCap += marketCap
            if totalLevermannScore != 0 and totalMarketCap != 0:
                levermannDict = dict()
                levermannDict['score_value'] = float(totalLevermannScore / totalMarketCap)
                levermannDict['modified_at'] = Utils.getActualDate()
                curLevermann.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.index_id = %d""" % (LEVERMANN_SCORE_TYPE_ID, index[0]))
                levermannScoreDb = curLevermann.fetchone()
                if levermannScoreDb:
                    curLevermann.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'index_id = %d' % index[0], False), levermannDict)
                else:
                    levermannDict['index_id'] = index[0]
                    levermannDict['score_type_id'] = LEVERMANN_SCORE_TYPE_ID
                    curLevermann.execute(Utils.createSqlString({'score_type_id', 'index_id', 'score_value', 'modified_at'}, 'tscore'), levermannDict)

    if doMagicFormula:
        cur = conn.cursor()
        cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL""" % MAGIC_FORMULA_SCORE_TYPE_ID)
        for index in cur:
            curStocks = conn.cursor()
            curStocks.execute("""SELECT stock_id FROM tstockindex WHERE index_id = %d""" % index[0])
            totalMagicFormulaScore = 0
            totalMarketCap = 0
            for stock in curStocks:
                curMagic = conn.cursor()
                curMagic.execute("""SELECT * FROM vmagicformula WHERE stock_id = %d""" % stock[0])
                magicFormulaRow = curMagic.fetchone()
                marketCap = magicFormulaRow[3]
                magicStockVal = Utils.calculateMagicFormula(magicFormulaRow)
                if magicStockVal is not None and marketCap is not None:
                    totalMagicFormulaScore += magicStockVal * float(marketCap)
                    totalMarketCap += marketCap
            if totalMagicFormulaScore != 0 and totalMarketCap != 0:
                magicFormulaDict = dict()
                magicFormulaDict['score_value'] = float(totalMagicFormulaScore / float(totalMarketCap))
                magicFormulaDict['modified_at'] = Utils.getActualDate()
                curMagic.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.index_id = %d""" % (MAGIC_FORMULA_SCORE_TYPE_ID, index[0]))
                magicFormulaScoreDb = curMagic.fetchone()
                if magicFormulaScoreDb:
                    curMagic.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'index_id = %d' % index[0], False), magicFormulaDict)
                else:
                    magicFormulaDict['index_id'] = index[0]
                    magicFormulaDict['score_type_id'] = MAGIC_FORMULA_SCORE_TYPE_ID
                    curMagic.execute(Utils.createSqlString({'score_type_id', 'index_id', 'score_value', 'modified_at'}, 'tscore'), magicFormulaDict)

conn.commit()
conn.close()