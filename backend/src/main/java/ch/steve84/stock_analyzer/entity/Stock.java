package ch.steve84.stock_analyzer.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tstock")
public class Stock {
    @Id
    @GeneratedValue(generator="stock_seq")
    @SequenceGenerator(name="stock_seq",sequenceName="stock_seq", allocationSize=1)
    @Column(name = "stock_id")
    private Integer stockId;
    private String nsin;
    private String isin;
    private String wkn;
    private String symbol;
    private String url;
    @Column(name = "business_year_end")
    private String businessYearEnd;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;
    private String name;
    @ManyToMany
    @JoinTable(name="tstockindex",
    	      joinColumns=@JoinColumn(name="stock_id", referencedColumnName="stock_id"),
    	      inverseJoinColumns=@JoinColumn(name="index_id", referencedColumnName="index_id"))
    private List<Index> indices;
    @OneToOne
    @JoinColumn(name = "stock_id")
    private Levermann levermann;
    @OneToOne
    @JoinColumn(name = "stock_id")
    private DailyFundamental dailyFundamental;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<AnnualFundamental> annualFundamentals;
    @OneToOne
    @JoinColumn(name = "stock_id")
    private TechnicalData technicalData;
    
    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public String getNsin() {
        return nsin;
    }

    public void setNsin(String nsin) {
        this.nsin = nsin;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getWkn() {
        return wkn;
    }

    public void setWkn(String wkn) {
        this.wkn = wkn;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getBusinessYearEnd() {
        return businessYearEnd;
    }

    public void setBusinessYearEnd(String businessYearEnd) {
        this.businessYearEnd = businessYearEnd;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public List<Index> getIndices() {
		return indices;
	}

	public void setIndices(List<Index> indices) {
		this.indices = indices;
	}

	public Levermann getLevermann() {
		return levermann;
	}

	public void setLevermann(Levermann levermann) {
		this.levermann = levermann;
	}

	public DailyFundamental getDailyFundamental() {
		return dailyFundamental;
	}

	public void setDailyFundamental(DailyFundamental dailyFundamental) {
		this.dailyFundamental = dailyFundamental;
	}

	public TechnicalData getTechnicalData() {
		return technicalData;
	}

	public void setTechnicalData(TechnicalData technicalData) {
		this.technicalData = technicalData;
	}

	public List<AnnualFundamental> getAnnualFundamentals() {
		return annualFundamentals;
	}

	public void setAnnualFundamentals(List<AnnualFundamental> annualFundamentals) {
		this.annualFundamentals = annualFundamentals;
	}
}
