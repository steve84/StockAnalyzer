import re
import json
import requests
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
				data[rating] = float(data[rating] / totalRatings)
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
			return (valueTo / valueFrom) - 1
		else:
			return 0
				
		
