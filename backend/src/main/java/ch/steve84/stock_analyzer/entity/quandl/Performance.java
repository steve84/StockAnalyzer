package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tperformance")
public class Performance {
    @Id
    @GeneratedValue(generator="performance_seq")
    @SequenceGenerator(name="performance_seq",sequenceName="performance_seq", allocationSize=1)
    @Column(name = "performance_id")
    private Integer performanceId;

    @OneToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @Column(name = "performance_6m")
    private Double performance6m;

    @Column(name = "performance_1y")
    private Double performance1y;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

    public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
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

    public Calendar getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Calendar modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Integer getPerformanceId() {
        return performanceId;
    }
}
