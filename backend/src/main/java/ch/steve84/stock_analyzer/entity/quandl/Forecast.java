package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tforecast")
public class Forecast {
    @Id
    @GeneratedValue(generator="forecast_seq")
    @SequenceGenerator(name="forecast_seq",sequenceName="forecast_seq", allocationSize=1)
    @Column(name = "forecast_id")	
	private Integer forecastId;

}
