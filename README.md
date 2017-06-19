# Installation

## Development
git clone https://github.com/steve84/StockAnalyzer.git
cd StockAnalyzer
docker run -it --rm --name my-maven-project -v "$PWD"/backend:/usr/src/mymaven -w /usr/src/mymaven maven:3.5-jdk-8-alpine mvn clean package
docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app -p 4200:4200 node:6-alpine sh -c 'npm install; npm start'
docker-compose up -f docker-compose.dev.yml
docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/db_schema.sql
docker-compose run scripts python3 loadStocks.py -n 50 --host db -u postgres -d stock_db
docker-compose run scripts python3 loadFundamentals.py -n 50 --host db -u postgres -d stock_db
docker-compose run scripts python3 loadTechnicalData.py -n 50 --host db -u postgres -d stock_db
Go to http://localhost:4200

## Production
git clone https://github.com/steve84/StockAnalyzer.git
cd StockAnalyzer
docker run -it --rm --name my-maven-project -v "$PWD"/backend:/usr/src/mymaven -w /usr/src/mymaven maven:3.5-jdk-8-alpine mvn clean package
docker run -it --rm --name my-running-script -v "$PWD"/frontend:/usr/src/app -w /usr/src/app node:6-alpine sh -c 'npm install; npm run build; chmod +r -R dist'
docker-compose up
docker-compose exec db psql -h localhost -p 5432 -U postgres -d postgres -f /usr/src/scripts/db_schema.sql
docker-compose run scripts python3 loadStocks.py -n 50 --host db -u postgres -d stock_db
docker-compose run scripts python3 loadFundamentals.py -n 50 --host db -u postgres -d stock_db
docker-compose run scripts python3 loadTechnicalData.py -n 50 --host db -u postgres -d stock_db
Go to http://localhost:80
