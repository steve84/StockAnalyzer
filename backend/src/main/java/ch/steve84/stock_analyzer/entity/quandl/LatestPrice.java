package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

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
    
    @Column(name = "created_at")
    private Calendar createdAt;

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getStockId() {
		return stockId;
	}
}
