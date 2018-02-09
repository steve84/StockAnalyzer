package ch.steve84.stock_analyzer;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import ch.steve84.stock_analyzer.entity.quandl.Branch;
import ch.steve84.stock_analyzer.entity.quandl.Country;
import ch.steve84.stock_analyzer.entity.quandl.Index;
import ch.steve84.stock_analyzer.entity.quandl.Levermann;
import ch.steve84.stock_analyzer.entity.quandl.MarketCapitalization;
import ch.steve84.stock_analyzer.entity.quandl.NormalizedScore;
import ch.steve84.stock_analyzer.entity.quandl.Technical;
import ch.steve84.stock_analyzer.entity.quandl.Price;
import ch.steve84.stock_analyzer.entity.quandl.Stock;
import ch.steve84.stock_analyzer.entity.quandl.StockIndex;
import ch.steve84.stock_analyzer.entity.quandl.Analysts;
import ch.steve84.stock_analyzer.entity.quandl.Balance;
import ch.steve84.stock_analyzer.entity.quandl.Cashflow;
import ch.steve84.stock_analyzer.entity.quandl.Forecast;
import ch.steve84.stock_analyzer.entity.quandl.Income;
import ch.steve84.stock_analyzer.entity.quandl.Signals;
import ch.steve84.stock_analyzer.entity.quandl.Values;

@Configuration
@EnableEncryptableProperties
public class StockAnalyzerConfiguration extends RepositoryRestConfigurerAdapter {
 
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Stock.class);
        config.exposeIdsFor(Branch.class);
        config.exposeIdsFor(Country.class);
        config.exposeIdsFor(Balance.class);
        config.exposeIdsFor(Cashflow.class);
        config.exposeIdsFor(Forecast.class);
        config.exposeIdsFor(Income.class);
        config.exposeIdsFor(Signals.class);
        config.exposeIdsFor(Values.class);
        config.exposeIdsFor(Technical.class);
        config.exposeIdsFor(Analysts.class);
        config.exposeIdsFor(Levermann.class);
        config.exposeIdsFor(Index.class);
        config.exposeIdsFor(NormalizedScore.class);
        config.exposeIdsFor(MarketCapitalization.class);
        config.exposeIdsFor(Price.class);
        config.exposeIdsFor(StockIndex.class);
    }
}
