package ch.steve84.stock_analyzer;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import ch.steve84.stock_analyzer.entity.Branch;
import ch.steve84.stock_analyzer.entity.Country;
import ch.steve84.stock_analyzer.entity.Index;
import ch.steve84.stock_analyzer.entity.Levermann;
import ch.steve84.stock_analyzer.entity.NormalizedScore;
import ch.steve84.stock_analyzer.entity.Stock;
import ch.steve84.stock_analyzer.entity.quandl.Balance;
import ch.steve84.stock_analyzer.entity.quandl.Cashflow;
import ch.steve84.stock_analyzer.entity.quandl.Forecast;
import ch.steve84.stock_analyzer.entity.quandl.Income;
import ch.steve84.stock_analyzer.entity.quandl.Signals;
import ch.steve84.stock_analyzer.entity.quandl.Values;

@Configuration
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
        config.exposeIdsFor(Levermann.class);
        config.exposeIdsFor(Index.class);
        config.exposeIdsFor(NormalizedScore.class);
    }
}
