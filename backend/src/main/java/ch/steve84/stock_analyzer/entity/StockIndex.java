package ch.steve84.stock_analyzer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tstockindex")
public class StockIndex {
    @Id
    @GeneratedValue(generator="stock_index_seq")
    @SequenceGenerator(name="stock_index_seq",sequenceName="stock_index_seq", allocationSize=1)
    @Column(name = "stock_index_id")
	private Integer stockIndexId;
    @ManyToOne
    @JoinColumn(name = "stock_id")
	private Stock stock;
    @ManyToOne
    @JoinColumn(name = "index_id")
	private Index index;
	private Double percentage;

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Index getIndex() {
		return index;
	}

	public void setIndex(Index index) {
		this.index = index;
	}

	public Double getPercentage() {
		return percentage;
	}

	public void setPercentage(Double percentage) {
		this.percentage = percentage;
	}

	public Integer getStockIndexId() {
		return stockIndexId;
	}
}
