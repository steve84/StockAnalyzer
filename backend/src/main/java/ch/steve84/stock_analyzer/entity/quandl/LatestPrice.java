package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vlatestprice")
public class LatestPrice {
    @Id
    @Column(name = "stock_id")
    private Integer stockId;
    
    private Double price;

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStockId() {
		return stockId;
	}
}
