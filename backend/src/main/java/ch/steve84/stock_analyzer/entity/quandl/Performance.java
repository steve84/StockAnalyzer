package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vperformance")
public class Performance {
    @Id
    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "performance_6m")
    private Double performance6m;

    @Column(name = "performance_1y")
    private Double performance1y;

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

    public Integer getStockId() {
        return stockId;
    }
}
