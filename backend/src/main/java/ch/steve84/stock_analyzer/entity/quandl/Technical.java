package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vtechnical")
public class Technical {
    @Id
    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "performance_6m")
    private Double performance6m;

    @Column(name = "performance_1y")
    private Double performance1y;

    @Column(name = "momentum_1m")
    private Double momentum1m;

    @Column(name = "momentum_3m")
    private Double momentum3m;
    
    @Column(name = "momentum_6m")
    private Double momentum6m;

    @Column(name = "momentum_1y")
    private Double momentum1y;

    @Column(name = "volatility_1m")
    private Double volatility1m;

    @Column(name = "volatility_3m")
    private Double volatility3m;
    
    @Column(name = "volatility_6m")
    private Double volatility6m;

    @Column(name = "volatility_1y")
    private Double volatility1y;

    @Column(name = "rsl_1m")
    private Double rsl1m;

    @Column(name = "rsl_3m")
    private Double rsl3m;
    
    @Column(name = "rsl_6m")
    private Double rsl6m;

    @Column(name = "rsl_1y")
    private Double rsl1y;

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

    public Double getMomentum1m() {
		return momentum1m;
	}

	public void setMomentum1m(Double momentum1m) {
		this.momentum1m = momentum1m;
	}

	public Double getMomentum3m() {
		return momentum3m;
	}

	public void setMomentum3m(Double momentum3m) {
		this.momentum3m = momentum3m;
	}

	public Double getMomentum6m() {
		return momentum6m;
	}

	public void setMomentum6m(Double momentum6m) {
		this.momentum6m = momentum6m;
	}

	public Double getMomentum1y() {
		return momentum1y;
	}

	public void setMomentum1y(Double momentum1y) {
		this.momentum1y = momentum1y;
	}

	public Double getVolatility1m() {
        return volatility1m;
    }

    public void setVolatility1m(Double volatility1m) {
        this.volatility1m = volatility1m;
    }

    public Double getVolatility3m() {
        return volatility3m;
    }

    public void setVolatility3m(Double volatility3m) {
        this.volatility3m = volatility3m;
    }

    public Double getVolatility6m() {
        return volatility6m;
    }

    public void setVolatility6m(Double volatility6m) {
        this.volatility6m = volatility6m;
    }

    public Double getVolatility1y() {
        return volatility1y;
    }

    public void setVolatility1y(Double volatility1y) {
        this.volatility1y = volatility1y;
    }

    public Double getRsl1m() {
        return rsl1m;
    }

    public void setRsl1m(Double rsl1m) {
        this.rsl1m = rsl1m;
    }

    public Double getRsl3m() {
        return rsl3m;
    }

    public void setRsl3m(Double rsl3m) {
        this.rsl3m = rsl3m;
    }

    public Double getRsl6m() {
        return rsl6m;
    }

    public void setRsl6m(Double rsl6m) {
        this.rsl6m = rsl6m;
    }

    public Double getRsl1y() {
        return rsl1y;
    }

    public void setRsl1y(Double rsl1y) {
        this.rsl1y = rsl1y;
    }

    public Integer getStockId() {
        return stockId;
    }
}
