# Installation

## Prerequisites
Install git, docker and docker-compose

<!--## Development
1. git clone https://github.com/steve84/StockAnalyzer.git
2. cd StockAnalyzer
3. sudo docker run -it --rm --name my-maven-project -v "$PWD"/backend:/usr/src/mymaven -w /usr/src/mymaven maven:3.5-jdk-8-alpine mvn clean package
4. sudo docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app -p 4200:4200 node:6-alpine sh -c 'npm install; npm start'
5. (sudo docker-compose rm)
6. sudo docker-compose -f docker-compose.dev.yml up
7. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/db_schema.sql
8. sudo docker-compose run scripts python3 loadStocks.py -n 10 --host db -u postgres -d stock_db
9. sudo docker-compose run scripts python3 loadStockData.py -n 10 --host db -u postgres -d stock_db
10. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_stockindex.sql
11. sudo Go to http://localhost:4200

## Production-->
## Usage
1. git clone https://github.com/steve84/StockAnalyzer.git
2. cd StockAnalyzer
3. git checkout quandl
3. Edit backend/src/main/resources/application.properties:
3.1 Database properties 'spring.datasource.*' (default: jdbc:postgresql://db:5432/stock_db)
3.2 SMTP server properties 'spring.mail.*'
3.3 Spring boot property 'server.port' (default: 8080)
3.4 URL of angular frontend 'url.frontend' (default: http://localhost:4200)
4. Edit frontend/src/environments/environment.prod.ts:
4.1 'apiUrl' Url of the backend (default: http://localhost:8080)
3. sudo docker run -it --rm --name my-maven-project -v "$PWD"/backend:/usr/src/mymaven -w /usr/src/mymaven maven:3.5-jdk-8-alpine mvn clean package
4. sudo docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app node:6-alpine sh -c 'rm -rf dist; npm install; npm run build:de'
4. sudo docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app node:6-alpine sh -c 'npm install; npm run build:en; chmod +r -R dist'
5. (sudo docker-compose rm)
6. sudo docker-compose up --build
7. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/db_schema_quandl.sql
7. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/insert_default_users_and_roles.sql
8.1. Load quandl free stocks
8.1.a. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/insert_quandl_free_stocks.sql
8.2. Load all quandl stocks (requires quandl subscription to RB1 dataset)
8.2.a. sudo docker-compose run scripts python3 loadQuandlStocksCSV.py -n 10 --host db -u postgres -d stock_db -k <quandl_key>
9. sudo docker-compose run scripts python3 loadQuandlPrices.py -n 10 --host db -u postgres -d stock_db -k <quandl_key>
9. sudo docker-compose run scripts python3 loadQuandlTables.py -n 10 --host db -u postgres -d stock_db -k <quandl_key>
10. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_stockindex_quandl.sql
10. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_msci_cap_quandl.sql
11. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_scoretype.sql
12. sudo docker-compose run scripts python3 calculateQuandlScores.py --host db -u postgres -d stock_db -k <quandl_key> --stocks --indices --levermann --piotroski --magic
13. Go to http://localhost

## I18n
1. On Windows: "./node_modules/.bin/ng-xi18n" --i18nFormat=xlf
2. Copy changes to src/locale/messages*.xlf
3. Add translation to target-Tags
4. Start German version: ng serve --aot --locale=de --i18-file=src/locale/messages.de.xlf --i18n-format=xlf