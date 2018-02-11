package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "vindexcountrystat")
@IdClass(IndexCountryId.class)
public class IndexCountryStat {
    @Id
	@Column(name = "index_id")
	private Integer indexId;
	
    @Id
    @Column(name = "country_id")
    private Integer countryId;
    
	@ManyToOne
	@JoinColumn(name = "country_id", updatable = false, insertable = false, referencedColumnName = "country_id")
	private Country country;
	
	private Integer nbr;
	private Double marketcap;
	
	public Country getCountry() {
		return country;
	}
	public void setCountry(Country country) {
		this.country = country;
	}
	public Integer getNbr() {
		return nbr;
	}
	public void setNbr(Integer nbr) {
		this.nbr = nbr;
	}
	public Double getMarketcap() {
		return marketcap;
	}
	public void setMarketcap(Double marketcap) {
		this.marketcap = marketcap;
	}
	public Integer getIndexId() {
		return indexId;
	}
	public Integer getCountryId() {
		return countryId;
	}
}
