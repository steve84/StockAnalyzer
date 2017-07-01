package ch.steve84.stock_analyzer.entity;

import java.util.List;

import javax.persistence.*;

import ch.steve84.stock_analyzer.enums.StockCategory;

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
	@OneToMany(mappedBy = "stock")
    private List<StockIndex> indices;
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
    @Transient
    private Integer levermannScore;
    @Transient
    private String stockCategory;
    
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

	public List<StockIndex> getIndices() {
		return indices;
	}

	public void setIndices(List<StockIndex> indices) {
		this.indices = indices;
	}

	public Levermann getLevermann() {
		evaluateStockCategory();
		calculateLevermannScore();
		return levermann;
	}

	public void setLevermann(Levermann levermann) {
		this.levermann = levermann;
		evaluateStockCategory();
		calculateLevermannScore();
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

	public void setLevermannScore(Integer levermannScore) {
		this.levermannScore = levermannScore;
	}

	public Integer getLevermannScore() {
		return levermannScore;
	}

	public String getStockCategory() {
		return stockCategory;
	}

	public void setStockCategory(String stockCategory) {
		this.stockCategory = stockCategory;
	}

	private void calculateLevermannScore() {
		if (levermann != null) {
			levermannScore = 0;
			if (levermann.getRoiEquity() != null) {
				if (levermann.getRoiEquity() > 20)
					levermannScore++;
				else if (levermann.getRoiEquity() < 10)
		            levermannScore--;
			}
			
			if (levermann.getRoiEbitMarge() != null) {
				if (levermann.getRoiEbitMarge() > 12)
					levermannScore++;
			}
			
			if (levermann.getBalanceSheetEquityRatio() != null) {
				if (levermann.getBalanceSheetEquityRatio() > 25)
					levermannScore++;
			}
	
			if (levermann.getPriceEarningsRatio5YearAverage() != null) {
		        	if (levermann.getPriceEarningsRatio5YearAverage() < 12)
		        		levermannScore++;
		        	else if (levermann.getPriceEarningsRatio5YearAverage() > 16)
		        		levermannScore--;
	    	}
	
		    if (levermann.getPriceEarningsRatio() != null) {
		    	if (levermann.getPriceEarningsRatio() < 12)
		    		levermannScore++;
		    	else if (levermann.getPriceEarningsRatio() > 16)
		    		levermannScore--;
		    }
	
		    if (levermann.getAnalystSellRatio() != null) {
	
		    }
	
		    if (levermann.getPerformance6m() != null) {
		    	if (levermann.getPerformance6m() > 5)
		    		levermannScore++;
		    	else if (levermann.getPerformance6m() < -5)
		    		levermannScore--;
		    }
	
		    if (levermann.getPerformance1y() != null) {
		    	if (levermann.getPerformance1y() > 5)
		    		levermannScore++;
		    	else if (levermann.getPerformance1y() < -5)
		    		levermannScore--;
		    }
	
		    if (levermann.getPerformance6m() != null && levermann.getPerformance1y() != null) {
		    	if (levermann.getPerformance1y() < 0 && levermann.getPerformance6m() > 0)
		    		levermannScore++;
		    	else if (levermann.getPerformance1y() > 0 && levermann.getPerformance6m() < 0)
		    		levermannScore--;
		    }
	
		    if (levermann.getEarningsPerShareGrowthExpected() != null) {
		    	if (levermann.getEarningsPerShareGrowthExpected() * 100 > 5)
		    		levermannScore++;
		    	else if (levermann.getEarningsPerShareGrowthExpected() * 100 < -5)
		    		levermannScore--;
		    }
		}
	}
	
	private void evaluateStockCategory() {
		if (levermann != null && levermann.getMarketCapitalization() != null) {
			for (StockCategory s : StockCategory.values()) {
				if ((s.minMarketCap() == null || levermann.getMarketCapitalization() > s.minMarketCap()) && (s.maxMarketCap() == null || levermann.getMarketCapitalization() < s.maxMarketCap()))
					setStockCategory(s.categoryName());
			}
		} else {
			setStockCategory("n.a.");
		}
	}
}