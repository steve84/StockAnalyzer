package ch.steve84.stock_analyzer;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import ch.steve84.stock_analyzer.entity.Stock;

@Configuration
public class StockAnalyzerConfiguration extends RepositoryRestConfigurerAdapter {
 
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Stock.class);
    }
}
