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
	private Integer vola30d;
	
	@Column(name = "vola_250d")
	private Integer vola250d;
	
	@Column(name = "vola_3y")
	private Integer vola3y;
	
	@Column(name = "sd_30d")
	private Integer sd30d;
	
	@Column(name = "sd_100d")
	private Integer sd100d;
	
	@Column(name = "sd_250d")
	private Integer sd250d;
	
	@Column(name = "moving_average_30d")
	private Integer movingAverage30d;
	
	@Column(name = "moving_average_100d")
	private Integer movingAverage100d;
	
	@Column(name = "moving_average_250d")
	private Integer movingAverage250d;
	
	@Column(name = "rsi_5d")
	private Integer rsi5d;
	
	@Column(name = "rsi_20d")
	private Integer rsi20d;
	
	@Column(name = "rsi_250d")
	private Integer rsi250d;
	
	@Column(name = "rsl_5d")
	private Integer rsl5d;
	
	@Column(name = "rsl_20d")
	private Integer rsl20d;
	
	@Column(name = "rsl_250d")
	private Integer rsl250d;
	
	@Column(name = "momentum_30d")
	private Integer momentum30d;
	
	@Column(name = "momentum_50d")
	private Integer momentum50d;
	
	@Column(name = "momentum_250d")
	private Integer momentum250d;
	
	@Column(name = "performance_7d")
	private Integer performance7d;
	
	@Column(name = "performance_30d")
	private Integer performance30d;
	
	@Column(name = "performance_6m")
	private Integer performance6m;
	
	@Column(name = "performance_1y")
	private Integer performance1y;
	
	@Column(name = "performance_3y")
	private Integer performance3y;
	
	@Column(name = "performance_5y")
	private Integer performance5y;
	
	@Column(name = "modified_at")
	private Calendar modifiedAt;
	
	@Column(name = "stock_id")
	private Integer stockId;

	public Integer getVola30d() {
		return vola30d;
	}

	public void setVola30d(Integer vola30d) {
		this.vola30d = vola30d;
	}

	public Integer getVola250d() {
		return vola250d;
	}

	public void setVola250d(Integer vola250d) {
		this.vola250d = vola250d;
	}

	public Integer getVola3y() {
		return vola3y;
	}

	public void setVola3y(Integer vola3y) {
		this.vola3y = vola3y;
	}

	public Integer getSd30d() {
		return sd30d;
	}

	public void setSd30d(Integer sd30d) {
		this.sd30d = sd30d;
	}

	public Integer getSd100d() {
		return sd100d;
	}

	public void setSd100d(Integer sd100d) {
		this.sd100d = sd100d;
	}

	public Integer getSd250d() {
		return sd250d;
	}

	public void setSd250d(Integer sd250d) {
		this.sd250d = sd250d;
	}

	public Integer getMovingAverage30d() {
		return movingAverage30d;
	}

	public void setMovingAverage30d(Integer movingAverage30d) {
		this.movingAverage30d = movingAverage30d;
	}

	public Integer getMovingAverage100d() {
		return movingAverage100d;
	}

	public void setMovingAverage100d(Integer movingAverage100d) {
		this.movingAverage100d = movingAverage100d;
	}

	public Integer getMovingAverage250d() {
		return movingAverage250d;
	}

	public void setMovingAverage250d(Integer movingAverage250d) {
		this.movingAverage250d = movingAverage250d;
	}

	public Integer getRsi5d() {
		return rsi5d;
	}

	public void setRsi5d(Integer rsi5d) {
		this.rsi5d = rsi5d;
	}

	public Integer getRsi20d() {
		return rsi20d;
	}

	public void setRsi20d(Integer rsi20d) {
		this.rsi20d = rsi20d;
	}

	public Integer getRsi250d() {
		return rsi250d;
	}

	public void setRsi250d(Integer rsi250d) {
		this.rsi250d = rsi250d;
	}

	public Integer getRsl5d() {
		return rsl5d;
	}

	public void setRsl5d(Integer rsl5d) {
		this.rsl5d = rsl5d;
	}

	public Integer getRsl20d() {
		return rsl20d;
	}

	public void setRsl20d(Integer rsl20d) {
		this.rsl20d = rsl20d;
	}

	public Integer getRsl250d() {
		return rsl250d;
	}

	public void setRsl250d(Integer rsl250d) {
		this.rsl250d = rsl250d;
	}

	public Integer getMomentum30d() {
		return momentum30d;
	}

	public void setMomentum30d(Integer momentum30d) {
		this.momentum30d = momentum30d;
	}

	public Integer getMomentum50d() {
		return momentum50d;
	}

	public void setMomentum50d(Integer momentum50d) {
		this.momentum50d = momentum50d;
	}

	public Integer getMomentum250d() {
		return momentum250d;
	}

	public void setMomentum250d(Integer momentum250d) {
		this.momentum250d = momentum250d;
	}

	public Integer getPerformance7d() {
		return performance7d;
	}

	public void setPerformance7d(Integer performance7d) {
		this.performance7d = performance7d;
	}

	public Integer getPerformance30d() {
		return performance30d;
	}

	public void setPerformance30d(Integer performance30d) {
		this.performance30d = performance30d;
	}

	public Integer getPerformance6m() {
		return performance6m;
	}

	public void setPerformance6m(Integer performance6m) {
		this.performance6m = performance6m;
	}

	public Integer getPerformance1y() {
		return performance1y;
	}

	public void setPerformance1y(Integer performance1y) {
		this.performance1y = performance1y;
	}

	public Integer getPerformance3y() {
		return performance3y;
	}

	public void setPerformance3y(Integer performance3y) {
		this.performance3y = performance3y;
	}

	public Integer getPerformance5y() {
		return performance5y;
	}

	public void setPerformance5y(Integer performance5y) {
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
