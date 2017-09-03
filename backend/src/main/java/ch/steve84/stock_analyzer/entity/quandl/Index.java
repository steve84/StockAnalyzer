package ch.steve84.stock_analyzer.entity.quandl;

import java.util.ArrayList;
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
import javax.persistence.Transient;

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
	@OneToMany(mappedBy = "index")
	private List<StockIndex> stocks;
    @OneToMany
    @JoinColumn(name = "index_id")
    private List<Score> scores;
    @OneToMany
    @JoinColumn(name = "index_id")
    private List<NormalizedScore> normalizedScores; 
	@Transient
	private List<Stock> realStocks = new ArrayList<>();

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

	public List<StockIndex> getStocks() {
		for (StockIndex si : stocks)
			realStocks.add(si.getStock());
		return stocks;
	}

	public void setStocks(List<StockIndex> stocks) {
		this.stocks = stocks;
	}

	public List<Score> getScores() {
		return scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public List<NormalizedScore> getNormalizedScores() {
		return normalizedScores;
	}

	public void setNormalizedScores(List<NormalizedScore> normalizedScores) {
		this.normalizedScores = normalizedScores;
	}

	public List<Stock> getRealStocks() {
		return realStocks;
	}

	public void setRealStocks(List<Stock> realStocks) {
		this.realStocks = realStocks;
	}
}
