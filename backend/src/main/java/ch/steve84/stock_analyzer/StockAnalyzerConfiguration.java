package ch.steve84.stock_analyzer;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import ch.steve84.stock_analyzer.entity.AnnualFundamental;
import ch.steve84.stock_analyzer.entity.Branch;
import ch.steve84.stock_analyzer.entity.Country;
import ch.steve84.stock_analyzer.entity.DailyFundamental;
import ch.steve84.stock_analyzer.entity.Index;
import ch.steve84.stock_analyzer.entity.Levermann;
import ch.steve84.stock_analyzer.entity.NormalizedScore;
import ch.steve84.stock_analyzer.entity.Stock;
import ch.steve84.stock_analyzer.entity.TechnicalData;

@Configuration
public class StockAnalyzerConfiguration extends RepositoryRestConfigurerAdapter {
 
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Stock.class);
        config.exposeIdsFor(Branch.class);
        config.exposeIdsFor(Country.class);
        config.exposeIdsFor(AnnualFundamental.class);
        config.exposeIdsFor(DailyFundamental.class);
        config.exposeIdsFor(TechnicalData.class);
        config.exposeIdsFor(Levermann.class);
        config.exposeIdsFor(Index.class);
        config.exposeIdsFor(NormalizedScore.class);
    }
}
