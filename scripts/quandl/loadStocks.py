import requests
import urllib.parse
import json
import quandl


totalHits = -1
page = 1
totalPages = 1
pageSize = 100

baseUrl = 'https://www.quandl.com/api/v3/datasets.json'
databaseCode = 'RB1'
apiKey = 'c-7-dq_SdcLs_6me4Azt'

while page <= totalPages:
    query_params = dict()
    query_params['database_code'] = databaseCode
    query_params['per_page'] = pageSize
    query_params['sort_by'] = 'id'
    query_params['page'] = page
    query_params['api_key'] = apiKey

    link = baseUrl + '?' +  urllib.parse.urlencode(query_params)
    response = requests.get(link)
    if response.status_code == 200:
        json_response = response.json()
        if totalHits < 0:
            totalHits = json_response['meta']['total_count']
            totalPages = json_response['meta']['total_pages']
        
        page = json_response['meta']['next_page']
        
        datasets = json_response['datasets']
        
        for dataset in datasets:
            if not dataset['premium']:
                import pdb; pdb.set_trace()
    
    else:
        break
