package ch.steve84.stock_analyzer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tstockindex")
@IdClass(StockIndexId.class)
public class StockIndex {
	@Id
	@Column(name = "stock_id")
	private Integer stockId;
	@Id
	@Column(name = "index_id")
	private Integer indexId;
    @ManyToOne
    @JoinColumn(name = "stock_id", updatable = false, insertable = false, referencedColumnName = "stock_id")
	private Stock stock;
    @ManyToOne
    @JoinColumn(name = "index_id", updatable = false, insertable = false, referencedColumnName = "index_id")
	private Index index;
	private Double percentage;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Integer getIndexId() {
		return indexId;
	}

	public void setIndexId(Integer indexId) {
		this.indexId = indexId;
	}

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
}
