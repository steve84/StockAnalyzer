package ch.steve84.stock_analyzer.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "ttechnicaldata")
public class TechnicalData {
	@Id
	@GeneratedValue(generator="technical_data_seq")
	@SequenceGenerator(name="technical_data_seq",sequenceName="technical_data_seq", allocationSize=1)
	@Column(name = "technical_data_id")
	private Integer technicalDataId;
	
	@Column(name = "vola_30d")
	private Double vola30d;
	
	@Column(name = "vola_250d")
	private Double vola250d;
	
	@Column(name = "vola_3y")
	private Double vola3y;
	
	@Column(name = "sd_30d")
	private Double sd30d;
	
	@Column(name = "sd_100d")
	private Double sd100d;
	
	@Column(name = "sd_250d")
	private Double sd250d;
	
	@Column(name = "moving_average_30d")
	private Double movingAverage30d;
	
	@Column(name = "moving_average_100d")
	private Double movingAverage100d;
	
	@Column(name = "moving_average_250d")
	private Double movingAverage250d;
	
	@Column(name = "rsi_5d")
	private Double rsi5d;
	
	@Column(name = "rsi_20d")
	private Double rsi20d;
	
	@Column(name = "rsi_250d")
	private Double rsi250d;
	
	@Column(name = "rsl_5d")
	private Double rsl5d;
	
	@Column(name = "rsl_20d")
	private Double rsl20d;
	
	@Column(name = "rsl_250d")
	private Double rsl250d;
	
	@Column(name = "momentum_30d")
	private Double momentum30d;
	
	@Column(name = "momentum_50d")
	private Double momentum50d;
	
	@Column(name = "momentum_250d")
	private Double momentum250d;
	
	@Column(name = "performance_7d")
	private Double performance7d;
	
	@Column(name = "performance_30d")
	private Double performance30d;
	
	@Column(name = "performance_6m")
	private Double performance6m;
	
	@Column(name = "performance_1y")
	private Double performance1y;
	
	@Column(name = "performance_3y")
	private Double performance3y;
	
	@Column(name = "performance_5y")
	private Double performance5y;
	
	@Column(name = "modified_at")
	private Calendar modifiedAt;
	
	@Column(name = "stock_id")
	private Integer stockId;

	public Double getVola30d() {
		return vola30d;
	}

	public void setVola30d(Double vola30d) {
		this.vola30d = vola30d;
	}

	public Double getVola250d() {
		return vola250d;
	}

	public void setVola250d(Double vola250d) {
		this.vola250d = vola250d;
	}

	public Double getVola3y() {
		return vola3y;
	}

	public void setVola3y(Double vola3y) {
		this.vola3y = vola3y;
	}

	public Double getSd30d() {
		return sd30d;
	}

	public void setSd30d(Double sd30d) {
		this.sd30d = sd30d;
	}

	public Double getSd100d() {
		return sd100d;
	}

	public void setSd100d(Double sd100d) {
		this.sd100d = sd100d;
	}

	public Double getSd250d() {
		return sd250d;
	}

	public void setSd250d(Double sd250d) {
		this.sd250d = sd250d;
	}

	public Double getMovingAverage30d() {
		return movingAverage30d;
	}

	public void setMovingAverage30d(Double movingAverage30d) {
		this.movingAverage30d = movingAverage30d;
	}

	public Double getMovingAverage100d() {
		return movingAverage100d;
	}

	public void setMovingAverage100d(Double movingAverage100d) {
		this.movingAverage100d = movingAverage100d;
	}

	public Double getMovingAverage250d() {
		return movingAverage250d;
	}

	public void setMovingAverage250d(Double movingAverage250d) {
		this.movingAverage250d = movingAverage250d;
	}

	public Double getRsi5d() {
		return rsi5d;
	}

	public void setRsi5d(Double rsi5d) {
		this.rsi5d = rsi5d;
	}

	public Double getRsi20d() {
		return rsi20d;
	}

	public void setRsi20d(Double rsi20d) {
		this.rsi20d = rsi20d;
	}

	public Double getRsi250d() {
		return rsi250d;
	}

	public void setRsi250d(Double rsi250d) {
		this.rsi250d = rsi250d;
	}

	public Double getRsl5d() {
		return rsl5d;
	}

	public void setRsl5d(Double rsl5d) {
		this.rsl5d = rsl5d;
	}

	public Double getRsl20d() {
		return rsl20d;
	}

	public void setRsl20d(Double rsl20d) {
		this.rsl20d = rsl20d;
	}

	public Double getRsl250d() {
		return rsl250d;
	}

	public void setRsl250d(Double rsl250d) {
		this.rsl250d = rsl250d;
	}

	public Double getMomentum30d() {
		return momentum30d;
	}

	public void setMomentum30d(Double momentum30d) {
		this.momentum30d = momentum30d;
	}

	public Double getMomentum50d() {
		return momentum50d;
	}

	public void setMomentum50d(Double momentum50d) {
		this.momentum50d = momentum50d;
	}

	public Double getMomentum250d() {
		return momentum250d;
	}

	public void setMomentum250d(Double momentum250d) {
		this.momentum250d = momentum250d;
	}

	public Double getPerformance7d() {
		return performance7d;
	}

	public void setPerformance7d(Double performance7d) {
		this.performance7d = performance7d;
	}

	public Double getPerformance30d() {
		return performance30d;
	}

	public void setPerformance30d(Double performance30d) {
		this.performance30d = performance30d;
	}

	public Double getPerformance6m() {
		return performance6m;
	}

	public void setPerformance6m(Double performance6m) {
		this.performance6m = performance6m;
	}

	public Double getPerformance1y() {
		return performance1y;
	}

	public void setPerformance1y(Double performance1y) {
		this.performance1y = performance1y;
	}

	public Double getPerformance3y() {
		return performance3y;
	}

	public void setPerformance3y(Double performance3y) {
		this.performance3y = performance3y;
	}

	public Double getPerformance5y() {
		return performance5y;
	}

	public void setPerformance5y(Double performance5y) {
		this.performance5y = performance5y;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Integer getTechnicalDataId() {
		return technicalDataId;
	}
	
	
}
