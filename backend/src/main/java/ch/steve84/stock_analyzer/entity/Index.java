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
@Table(name = "tindex")
public class Index {
    @Id
    @GeneratedValue(generator="index_seq")
    @SequenceGenerator(name="index_seq",sequenceName="index_seq", allocationSize=1)
    @Column(name = "index_id")
	private Integer indexId;
	private String name;
	private String description;
	private Double percentage;
	@ManyToOne
	@JoinColumn(name = "country_id")
	private Country country;

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

	public Double getPercentage() {
		return percentage;
	}

	public void setPercentage(Double percentage) {
		this.percentage = percentage;
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
}
