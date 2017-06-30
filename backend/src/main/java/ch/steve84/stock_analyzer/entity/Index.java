package ch.steve84.stock_analyzer.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tindex")
public class Index {
    @Id
    @GeneratedValue(generator="index_seq")
    @SequenceGenerator(name="index_seq",sequenceName="index_seq", allocationSize=1)
    @Column(name = "index_id")
	private Integer indexId;
	private String name;
	private String description;
	@ManyToOne
	@JoinColumn(name = "country_id")
	private Country country;
	@OneToMany(mappedBy = "stock")
	private List<StockIndex> stockIndices;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public Integer getIndexId() {
		return indexId;
	}

	public List<StockIndex> getStockIndices() {
		return stockIndices;
	}

	public void setStockIndices(List<StockIndex> stockIndices) {
		this.stockIndices = stockIndices;
	}
}
