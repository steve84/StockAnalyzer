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
parser.add_argument('-k', dest='quandl_key', help='quandl api key')
parser.add_argument('--host', dest='db_host', help='database host')
parser.add_argument('--stocks', dest='doStocks', action='store_true', help='calculate values for stocks')
parser.add_argument('--indices', dest='doIndices', action='store_true', help='calculate values for indices')
parser.add_argument('--levermann', dest='doLevermann', action='store_true', help='calculate levermann values')
parser.add_argument('--magic', dest='doMagicFormula', action='store_true', help='calculate magic formula values')
parser.add_argument('--piotroski', dest='doPiotroski', action='store_true', help='calculate piotroski f-score values')

maxItems = parser.parse_args().maxItems
maxAge = parser.parse_args().maxAge
db_user = parser.parse_args().db_user
db_pwd = parser.parse_args().db_pwd
db_name = parser.parse_args().db_name
db_host = parser.parse_args().db_host
quandl_key = parser.parse_args().quandl_key
doStocks = parser.parse_args().doStocks
doIndices = parser.parse_args().doIndices
doLevermann = parser.parse_args().doLevermann
doMagicFormula = parser.parse_args().doMagicFormula
doPiotroski = parser.parse_args().doPiotroski

LEVERMANN_SCORE_TYPE_ID = 1
MAGIC_FORMULA_SCORE_TYPE_ID = 2
PIOTROSKI_F_SCORE = 3

conn = psycopg2.connect("dbname=%s user=%s host=%s password=%s" % (db_name, db_user, db_host, db_pwd))

if doStocks:
    if doLevermann:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc ON sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (LEVERMANN_SCORE_TYPE_ID, maxAge))
        else:
            cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc ON sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL""" % LEVERMANN_SCORE_TYPE_ID)
        for stock in cur:
            prices = Utils.getQuandlStockPrice(stock[12], quandl_key)
            if len(prices) == 3:
                pricesDict = dict()
                pricesDict['stock_id'] = stock[0]
                pricesDict['performance_6m'] = Utils.calcGrowth(prices[1], prices[0])
                pricesDict['performance_1y'] = Utils.calcGrowth(prices[2], prices[0])
                pricesDict['modified_at'] = Utils.getActualDate()
                curPrices = conn.cursor()
                curPrices.execute("""SELECT * FROM tperformance p WHERE stock_id = %d """ % stock[0])
                pricesDb = curPrices.fetchone()
                if pricesDb is not None:
                    curPrices.execute(Utils.createSqlString({'performance_6m', 'performance_1y', 'modified_at'}, 'tperformance', 'stock_id = %d' % stock[0], False), pricesDict)
                else:
                    curPrices.execute(Utils.createSqlString(pricesDict.keys(), 'tperformance'), pricesDict)

            curLevermann = conn.cursor()
            curLevermann.execute("""SELECT * FROM vlevermann WHERE stock_id = %d""" % stock[0])
            levermannScore = Utils.calculateLevermann(curLevermann.fetchone())
            if levermannScore:
                levermannDict = dict()
                levermannDict['score_value'] = levermannScore[0]
                levermannDict['modified_at'] = Utils.getActualDate()
                curLevermann.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.stock_id = %d""" % (LEVERMANN_SCORE_TYPE_ID, stock[0]))
                levermannScoreDb = curLevermann.fetchone()
                if levermannScoreDb is not None:
                    curLevermann.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'stock_id = %d and score_type_id = %d' % (stock[0], LEVERMANN_SCORE_TYPE_ID), False), levermannDict)
                    totalUpdated += 1
                else:
                    levermannDict['stock_id'] = stock[0]
                    levermannDict['score_type_id'] = LEVERMANN_SCORE_TYPE_ID
                    curLevermann.execute(Utils.createSqlString({'score_type_id', 'stock_id', 'score_value', 'modified_at'}, 'tscore'), levermannDict)
                    totalUpdated += 1

                if 'sell' in levermannScore[1].keys() and 'buy' in levermannScore[1].keys() and 'hold' in levermannScore[1].keys():
                    # Analyst table
                    analystsDict = dict()
                    analystsDict['modified_at'] = Utils.getActualDate()
                    analystsDict['buy'] = levermannScore[1]['buy']
                    analystsDict['sell'] = levermannScore[1]['sell']
                    analystsDict['hold'] = levermannScore[1]['hold']
                    curLevermann.execute("""SELECT * FROM tanalysts anal WHERE anal.stock_id = %d""" % stock[0])
                    analystsDb = curLevermann.fetchone()
                    if analystsDb is not None:
                        curLevermann.execute(Utils.createSqlString({'buy', 'sell', 'hold', 'modified_at'}, 'tanalysts', 'stock_id = %d' % stock[0], False), analystsDict)
                    else:
                        analystsDict['stock_id'] = stock[0]
                        curLevermann.execute(Utils.createSqlString({'stock_id', 'buy', 'sell', 'hold', 'modified_at'}, 'tanalysts'), analystsDict)

            if totalUpdated == maxItems:
                break

    if doMagicFormula:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc on sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (MAGIC_FORMULA_SCORE_TYPE_ID, maxAge))
        else:
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
                if magicFormulaScoreDb is not None:
                    curMagic.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'stock_id = %d and score_type_id = %d' % (stock[0], MAGIC_FORMULA_SCORE_TYPE_ID), False), magicFormulaDict)
                    totalUpdated += 1
                else:
                    magicFormulaDict['stock_id'] = stock[0]
                    magicFormulaDict['score_type_id'] = MAGIC_FORMULA_SCORE_TYPE_ID
                    curMagic.execute(Utils.createSqlString({'score_type_id', 'stock_id', 'score_value', 'modified_at'}, 'tscore'), magicFormulaDict)
                    totalUpdated += 1
            if totalUpdated == maxItems:
                break

    if doPiotroski:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc on sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (PIOTROSKI_F_SCORE, maxAge))
        else:
            cur.execute("""SELECT * FROM tstock s LEFT JOIN tscore sc on sc.stock_id = s.stock_id AND sc.score_type_id = %d WHERE sc.stock_id IS NULL""" % PIOTROSKI_F_SCORE)
        for stock in cur:
            curPiotroski = conn.cursor()
            curPiotroski.execute("""SELECT * FROM vpiotroski WHERE stock_id = %d""" % stock[0])
            piotroskiScore = Utils.calculatePiotroski(curPiotroski.fetchone())
            if piotroskiScore:
                piotroskiDict = dict()
                piotroskiDict['score_value'] = piotroskiScore
                piotroskiDict['modified_at'] = Utils.getActualDate()
                curPiotroski.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.stock_id = %d""" % (PIOTROSKI_F_SCORE, stock[0]))
                piotroskiScoreDb = curPiotroski.fetchone()
                if piotroskiScoreDb is not None:
                    curPiotroski.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'stock_id = %d and score_type_id = %d' % (stock[0], PIOTROSKI_F_SCORE), False), piotroskiDict)
                    totalUpdated += 1
                else:
                    piotroskiDict['stock_id'] = stock[0]
                    piotroskiDict['score_type_id'] = PIOTROSKI_F_SCORE
                    curPiotroski.execute(Utils.createSqlString({'score_type_id', 'stock_id', 'score_value', 'modified_at'}, 'tscore'), piotroskiDict)
                    totalUpdated += 1
            if totalUpdated == maxItems:
                break
if doIndices:
    if doLevermann:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (LEVERMANN_SCORE_TYPE_ID, maxAge))
        else:
            cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL""" % LEVERMANN_SCORE_TYPE_ID)
        for index in cur:
            curStocks = conn.cursor()
            curStocks.execute("""SELECT s.stock_id, s.quandl_price_dataset FROM tstockindex si LEFT JOIN tstock s ON s.stock_id = si.stock_id WHERE si.index_id = %d""" % index[0])
            totalMarketCap = 0
            totalLevermannScore = 0
            for stock in curStocks:
                prices = Utils.getQuandlStockPrice(stock[1], quandl_key)
                if len(prices) == 3:
                    pricesDict = dict()
                    pricesDict['stock_id'] = stock[0]
                    pricesDict['performance_6m'] = Utils.calcGrowth(prices[1], prices[0])
                    pricesDict['performance_1y'] = Utils.calcGrowth(prices[2], prices[0])
                    pricesDict['modified_at'] = Utils.getActualDate()
                    curPrices = conn.cursor()
                    curPrices.execute("""SELECT * FROM tperformance p WHERE stock_id = %d """ % stock[0])
                    pricesDb = curPrices.fetchone()
                    if pricesDb is not None:
                        curPrices.execute(Utils.createSqlString({'performance_6m', 'performance_1y', 'modified_at'}, 'tperformance', 'stock_id = %d' % stock[0], False), pricesDict)
                    else:
                        curPrices.execute(Utils.createSqlString(pricesDict.keys(), 'tperformance'), pricesDict)

                        curLevermann = conn.cursor()
                curLevermann.execute("""SELECT * FROM vlevermann WHERE stock_id = %d""" % stock[0])
                levermannRow = curLevermann.fetchone()
                marketCap = levermannRow[4]
                levermannStockVal = Utils.calculateLevermann(levermannRow)
                if levermannStockVal is not None and marketCap is not None:
                    totalLevermannScore += levermannStockVal[0] * marketCap
                    totalMarketCap += marketCap
            if totalLevermannScore != 0 and totalMarketCap != 0:
                levermannDict = dict()
                levermannDict['score_value'] = float(totalLevermannScore / totalMarketCap)
                levermannDict['modified_at'] = Utils.getActualDate()
                curLevermann.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.index_id = %d""" % (LEVERMANN_SCORE_TYPE_ID, index[0]))
                levermannScoreDb = curLevermann.fetchone()
                if levermannScoreDb is not None:
                    curLevermann.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'index_id = %d and score_type_id = %d' % (index[0], LEVERMANN_SCORE_TYPE_ID), False), levermannDict)
                    totalUpdated += 1
                else:
                    levermannDict['index_id'] = index[0]
                    levermannDict['score_type_id'] = LEVERMANN_SCORE_TYPE_ID
                    curLevermann.execute(Utils.createSqlString({'score_type_id', 'index_id', 'score_value', 'modified_at'}, 'tscore'), levermannDict)
                    totalUpdated += 1
            if totalUpdated == maxItems:
                break

    if doMagicFormula:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (MAGIC_FORMULA_SCORE_TYPE_ID, maxAge))
        else:
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
                if magicFormulaScoreDb is not None:
                    curMagic.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'index_id = %d and score_type_id = %d' % (index[0], MAGIC_FORMULA_SCORE_TYPE_ID), False), magicFormulaDict)
                    totalUpdated += 1
                else:
                    magicFormulaDict['index_id'] = index[0]
                    magicFormulaDict['score_type_id'] = MAGIC_FORMULA_SCORE_TYPE_ID
                    curMagic.execute(Utils.createSqlString({'score_type_id', 'index_id', 'score_value', 'modified_at'}, 'tscore'), magicFormulaDict)
                    totalUpdated += 1
            if totalUpdated == maxItems:
                break

    if doPiotroski:
        totalUpdated = 0
        cur = conn.cursor()
        if maxAge is not None:
            cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL OR current_date - sc.modified_at >= %d ORDER BY sc.modified_at NULLS FIRST""" % (PIOTROSKI_F_SCORE, maxAge))
        else:
            cur.execute("""SELECT * FROM tindex i LEFT JOIN tscore sc on sc.index_id = i.index_id AND sc.score_type_id = %d WHERE sc.index_id IS NULL""" % PIOTROSKI_F_SCORE)
        for index in cur:
            curStocks = conn.cursor()
            curStocks.execute("""SELECT stock_id FROM tstockindex WHERE index_id = %d""" % index[0])
            totalPiotroskiScore = 0
            totalMarketCap = 0
            for stock in curStocks:
                curPiotroski = conn.cursor()
                curPiotroski.execute("""SELECT * FROM vpiotroski WHERE stock_id = %d""" % stock[0])
                piotroskiRow = curPiotroski.fetchone()
                marketCap = piotroskiRow[13]
                piotroskiStockVal = Utils.calculatePiotroski(piotroskiRow)
                if piotroskiStockVal is not None and marketCap is not None:
                    totalPiotroskiScore += piotroskiStockVal * float(marketCap)
                    totalMarketCap += marketCap
            if totalPiotroskiScore != 0 and totalMarketCap != 0:
                piotroskiDict = dict()
                piotroskiDict['score_value'] = float(totalPiotroskiScore / float(totalMarketCap))
                piotroskiDict['modified_at'] = Utils.getActualDate()
                curPiotroski.execute("""SELECT * FROM tscore s WHERE s.score_type_id = %d and s.index_id = %d""" % (PIOTROSKI_F_SCORE, index[0]))
                piotroskiScoreDb = curPiotroski.fetchone()
                if piotroskiScoreDb is not None:
                    curPiotroski.execute(Utils.createSqlString({'score_value', 'modified_at'}, 'tscore', 'index_id = %d and score_type_id = %d' % (index[0], PIOTROSKI_F_SCORE), False), piotroskiDict)
                    totalUpdated += 1
                else:
                    piotroskiDict['index_id'] = index[0]
                    piotroskiDict['score_type_id'] = PIOTROSKI_F_SCORE
                    curPiotroski.execute(Utils.createSqlString({'score_type_id', 'index_id', 'score_value', 'modified_at'}, 'tscore'), piotroskiDict)
                    totalUpdated += 1
            if totalUpdated == maxItems:
                break

conn.commit()
conn.close()