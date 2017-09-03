import re
import json
import requests
import quandl
from bs4 import BeautifulSoup
from datetime import datetime, date

class Utils:

    def getMappingDict(fileName):
        with open(fileName) as json_file:
            return json.load(json_file)
            
    def getYearEnd(htmlSoup):
        get_year_end = lambda x: x.find("span").text.split(" ")[1] if x.find("span") and len(x.find("span").text.split(" ")) >= 2 else ''
        return get_year_end(htmlSoup)

    def getKeyFigures(link, mappingFileName):
        data = dict()
        years = list()
        mapping = Utils.getMappingDict(mappingFileName)
        htmlSoup = Utils.getHtmlSoup(link)
        key_figures = htmlSoup.find("article", {"class": "KENNZAHLEN"})

        if (key_figures):
            year_end = Utils.getYearEnd(key_figures)
            tables = key_figures.findAll("table")
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
                            for map in mapping.keys():
                                if fact.find(map) == 0:
                                    fact = mapping[map]
                        cols = row.findAll("td", {"class": "ZAHL"})
                        counter = 0
                        for col in cols:
                            if counter < len(years):
                                tmp_year = years[counter]
                                if tmp_year not in data.keys():
                                    data[tmp_year] = dict()

                                tmp_value = re.findall('[-]?\d+[,]?\d+', col.text.replace('.', ''))
                                if len(tmp_value) == 1:
                                    data[tmp_year][fact] = float(tmp_value[0].replace(',', '.'))
                                else:
                                    data[tmp_year][fact] = None
                                    
                                data[tmp_year]['business_year_end'] = year_end
                                counter += 1
                    i += 1
        return data
    
    def getKeyFiguresQuandl(tableName, mappingFileName, quandlKey):
        quandl.ApiConfig.api_key = quandlKey
        data = dict()
        years = list()
        mappings = Utils.getMappingDict(mappingFileName)
        res = quandl.get(tableName)
        for index, row in res.iterrows():
            for key in res.keys():
                for mapping in mappings.keys():
                    if key.find(mapping) > -1:
                        if index.date() not in data.keys():
                            data[index.date()] = dict()
                        data[index.date()][mappings[mapping]] = row[key]
                        break
        return data
                
        
    def getTechnicalFigures(link, mappingFileName):
        data = dict()
        mapping = Utils.getMappingDict(mappingFileName)
        htmlSoup = Utils.getHtmlSoup(link)
        risk_trend_figures = htmlSoup.find("article", {"class": "RISIKO_TREND KENNZAHLEN"})
        performance_figures = htmlSoup.find("article", {"class": "KURSE_PERFORMANCE KENNZAHLEN"}).find("tbody").findAll("tr")
        
        if (risk_trend_figures):
            risk_trend_figures_headers = risk_trend_figures.findAll("th")
            risk_trend_figures_values = risk_trend_figures.findAll("td", {"class": "ZAHL"})
            if (len(risk_trend_figures_headers) == len(risk_trend_figures_values)):
                i = 0
                for i in range(0, len(risk_trend_figures_headers)):
                    header = risk_trend_figures_headers[i].text.strip()
                    value = risk_trend_figures_values[i].text.strip()
                    for map in mapping.keys():
                        if header.find(map) == 0:
                            tmp_value = re.findall('[-]?\d+[,]?\d+', value.replace('.', ''))
                            if len(tmp_value) == 1:
                                data[mapping[map]] = float(tmp_value[0].replace(',', '.'))
                            else:
                                data[mapping[map]] = None

        if (performance_figures):
            for row in performance_figures:
                header = row.find("th").text.strip()
                value = row.find("td").text.strip()
                for map in mapping.keys():
                    if header.find(map) == 0:
                        tmp_value = re.findall('[-]?[+]?\d+[,]?\d+', value.replace('.', ''))
                        if len(tmp_value) == 1:
                            data[mapping[map]] = float(tmp_value[0].replace('+', '').replace(',', '.'))
                        else:
                            data[mapping[map]] = None
        return data

    def getAnalystRatings(link, mappingFileName):
        data = dict()
        totalRatings = 0
        mapping = Utils.getMappingDict(mappingFileName)
        htmlSoup = Utils.getHtmlSoup(link)
        table = htmlSoup.find('tbody')
        if table is not None: 
            rows = table.findAll('tr')
            for row in rows:
                cols = row.findAll('td')
                if len(cols) == 2:
                    header = cols[0].text
                    value = cols[1].text
                    if header and value:
                        header = header.strip()
                        value = int(value.strip())
                        if header in mapping.keys():
                            data[mapping[header]] = value
                            totalRatings += value
        if len(data) == 3 and totalRatings > 0:
            for rating in data.keys():
                data[rating] = float(data[rating] / totalRatings) * 100
        return data
    
    def getHtmlSoup(link):
        response = requests.get(link)
        print('%s\n' % link)
        if (response.status_code == 200):
            return BeautifulSoup(response.content, 'html.parser')
        
    def createSqlString(dictKeys, tableName, whereCond=None, isCreation=True):
        values = '(%(' + ')s, %('.join(dictKeys) + ')s)'
        names = '(' + ', '.join(dictKeys) + ')'
        if isCreation:
            return "INSERT INTO " + tableName + " " + names + " VALUES " + values
        else:
            if not whereCond:
                return "UPDATE " + tableName + " SET " + names + " = " + values
            else:
                return "UPDATE " + tableName + " SET " + names + " = " + values + " WHERE " + whereCond

    def getActualYear():
        return datetime.now().year
    
    def getActualDate():
        return datetime.now().date()
    
    def getDayDiff(startDate):
        if startDate:
            diff = date.today() - startDate
            if hasattr(diff, 'days'):
                return diff.days
        return 0
    
    def getLastBusinessYear(endBusinessYear):
        actualYear = Utils.getActualYear()
        if endBusinessYear == 'n.a.':
            return actualYear - 1
        elif endBusinessYear == '31.12.':
            endBusinessYear += str(actualYear - 1)
        else:
            endBusinessYear += str(actualYear)
        try:

            diff = Utils.getDayDiff(datetime.strptime(endBusinessYear, '%d.%m.%Y').date())

        except ValueError:

            return actualYear - 1
        if diff > 0:
            return actualYear - 1
        else:
            return actualYear - 2

    def avgYearValue(factDict, targetKey, maxYear):
        i = 0
        value = 0
        for year in factDict.keys():
            if int(year) <= maxYear and targetKey in factDict[year].keys() and factDict[year][targetKey] is not None:
                i += 1
                value += factDict[year][targetKey]
        if i > 0:
            return value / i
        else:
            return 0

    def calcGrowth(valueFrom, valueTo):
        if valueFrom and valueTo and isinstance(valueFrom, float) and isinstance(valueTo, float):
            return ((valueTo / valueFrom) - 1) * 100
        else:
            return 0
                

    def calculateLevermann(levermannData):
        roiEquity = levermannData[1]
        roiEbitMarge = levermannData[2]
        balanceSheetEquityRatio = levermannData[3]
        marketCapitalization = levermannData[4]
        priceEarningsRatio = levermannData[5]
        priceEarningsRatio5yAvg = levermannData[6]
        earningsPerShareGrowthExpected = levermannData[7]
        analystSellRatio = levermannData[8]
        analystBuyRatio = levermannData[9]
        performance6m = levermannData[10]
        performance1y = levermannData[11]
        levermannScore = 0
        hasLevermannScore = False

        if roiEquity is not None:
            hasLevermannScore = hasLevermannScore or True
            if roiEquity > 20:
                levermannScore += 1
            elif roiEquity < 10:
                levermannScore -= 1

        if roiEbitMarge is not None:
            hasLevermannScore = hasLevermannScore or True
            if roiEbitMarge > 12:
                levermannScore += 1

        if balanceSheetEquityRatio is not None:
            hasLevermannScore = hasLevermannScore or True
            if balanceSheetEquityRatio > 25:
                levermannScore += 1

        if priceEarningsRatio is not None:
            hasLevermannScore = hasLevermannScore or True
            if priceEarningsRatio > 0 and priceEarningsRatio < 12:
                levermannScore += 1
            elif priceEarningsRatio > 16:
                levermannScore -= 1

        if priceEarningsRatio5yAvg is not None:
            hasLevermannScore = hasLevermannScore or True
            if priceEarningsRatio5yAvg > 0 and priceEarningsRatio5yAvg < 12:
                levermannScore += 1
            elif priceEarningsRatio5yAvg > 16:
                levermannScore -= 1

        if analystSellRatio is not None and marketCapitalization is not None:
            hasLevermannScore = hasLevermannScore or True
            if marketCapitalization >= 10000:
                if analystBuyRatio >= 60:
                    levermannScore -= 1
                else:
                    levermannScore += 1
            else:
                if analystBuyRatio >= 60:
                    levermannScore += 1
                else:
                    levermannScore -= 1

        if performance6m is not None:
            hasLevermannScore = hasLevermannScore or True
            if performance6m > 5:
                levermannScore += 1
            elif performance6m < -5:
                levermannScore -= 1

        if performance1y is not None:
            hasLevermannScore = hasLevermannScore or True
            if performance1y > 5:
                levermannScore += 1
            elif performance1y < -5:
                levermannScore -= 1

        if performance6m is not None and performance1y is not None:
            hasLevermannScore = hasLevermannScore or True
            if performance1y < 0 and performance6m > 0:
                levermannScore += 1
            elif performance1y > 0 and performance6m < 0:
                levermannScore -= 1

        if earningsPerShareGrowthExpected is not None:
            hasLevermannScore = hasLevermannScore or True
            if earningsPerShareGrowthExpected > 5:
                levermannScore += 1
            elif earningsPerShareGrowthExpected < -5:
                levermannScore -= 1

        if hasLevermannScore:
            return levermannScore
        else:
            return None

    def calculateMagicFormula(magicFormulaData):
        returnOnCapital = magicFormulaData[1]
        earningsYield = magicFormulaData[2]
        if returnOnCapital is not None and earningsYield is not None:
            return float((returnOnCapital + earningsYield) / 2)
    
    def calculatePiotroski(piotroskiData):
        earnings_per_share = piotroskiData[1]
        cashflow_per_share = piotroskiData[2]
        actual_roi_total_capital = piotroskiData[3]
        last_roi_total_capital = piotroskiData[4]
        actual_balance_sheet_equity_dept = piotroskiData[5]
        last_balance_sheet_equity_dept = piotroskiData[6]
        actual_stock_amount = piotroskiData[7]
        last_stock_amount = piotroskiData[8]
        actual_roi_ebit_marge = piotroskiData[9]
        last_roi_ebit_marge = piotroskiData[10]
        actual_asset_turnover = piotroskiData[11]
        last_asset_turnover = piotroskiData[12]
        
        piotroskiScore = 0
        hasPiotroskiScore = False
        
        if earnings_per_share is not None and earnings_per_share > 0:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if cashflow_per_share is not None and cashflow_per_share > 0:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if actual_roi_total_capital is not None and last_roi_total_capital is not None and actual_roi_total_capital > last_roi_total_capital:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if cashflow_per_share is not None and earnings_per_share is not None and cashflow_per_share > earnings_per_share:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if actual_balance_sheet_equity_dept is not None and last_balance_sheet_equity_dept is not None and actual_balance_sheet_equity_dept > last_balance_sheet_equity_dept:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if actual_stock_amount is not None and last_stock_amount is not None and actual_stock_amount > last_stock_amount:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if actual_roi_ebit_marge is not None and last_roi_ebit_marge is not None and actual_roi_ebit_marge > last_roi_ebit_marge:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if actual_asset_turnover is not None and last_asset_turnover is not None and actual_asset_turnover > last_asset_turnover:
            hasPiotroskiScore = hasPiotroskiScore or True
            piotroskiScore += 1

        if hasPiotroskiScore:
            return piotroskiScore
        else:
            return None