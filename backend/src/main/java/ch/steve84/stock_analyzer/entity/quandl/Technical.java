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

	public Integer getStockId() {
        return stockId;
    }
}
