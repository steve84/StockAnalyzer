package ch.steve84.stock_analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {
		"ch.steve84.stock_analyzer.entity.quandl"
})
@EnableJpaRepositories(basePackages = {
		"ch.steve84.stock_analyzer.repository.quandl"
})
public class StockAnalyzerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockAnalyzerApplication.class, args);
	}
}
