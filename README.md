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
3. sudo docker run -it --rm --name my-maven-project -v "$PWD"/backend:/usr/src/mymaven -w /usr/src/mymaven maven:3.5-jdk-8-alpine mvn clean package
4. sudo docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app node:6-alpine sh -c 'npm install; npm run build; chmod +r -R dist'
5. (sudo docker-compose rm)
6. sudo docker-compose up --build
7. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/db_schema.sql
8. sudo docker-compose run scripts python3 loadStocks.py -n 10 --host db -u postgres -d stock_db
9. sudo docker-compose run scripts python3 loadStockData.py -n 10 --host db -u postgres -d stock_db
10. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_stockindex.sql
11. sudo docker-compose exec db psql -h localhost -p 5432 -U postgres -d stock_db -f /usr/src/scripts/insert_scoretype.sql
12. sudo docker-compose run scripts python3 calculateScores.py --host db -u postgres -d stock_db
13. Go to http://localhost
