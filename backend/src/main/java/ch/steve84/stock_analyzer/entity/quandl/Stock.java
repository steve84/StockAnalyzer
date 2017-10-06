package ch.steve84.stock_analyzer.entity.quandl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private String currency;
	@OneToMany(mappedBy = "stock")
    private List<StockIndex> indices;
    @OneToOne
    @JoinColumn(name = "stock_id")
    private Levermann levermann;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Income> income;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Forecast> forecast;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Balance> balance;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Values> values;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Signals> signals;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Cashflow> cashflow;
    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Performance performance;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<Score> scores;
    @OneToMany
    @JoinColumn(name = "stock_id")
    private List<NormalizedScore> normalizedScores;
    @Transient
    private Integer levermannScore;
    @Transient
    private String stockCategory;
    @Transient
    private Map<String, Double> indexParticipation = new HashMap<>();
    
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

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public List<StockIndex> getIndices() {
		for (StockIndex si : indices)
			indexParticipation.put(si.getIndex().getName(), si.getPercentage());
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

	public List<Income> getIncome() {
		return income;
	}

	public void setIncome(List<Income> income) {
		this.income = income;
	}

	public List<Forecast> getForecast() {
		return forecast;
	}

	public void setForecast(List<Forecast> forecast) {
		this.forecast = forecast;
	}

	public List<Balance> getBalance() {
		return balance;
	}

	public void setBalance(List<Balance> balance) {
		this.balance = balance;
	}

	public List<Values> getValues() {
		return values;
	}

	public void setValues(List<Values> values) {
		this.values = values;
	}

	public List<Signals> getSignals() {
		return signals;
	}

	public void setSignals(List<Signals> signals) {
		this.signals = signals;
	}

	public List<Cashflow> getCashflow() {
		return cashflow;
	}

	public void setCashflow(List<Cashflow> cashflow) {
		this.cashflow = cashflow;
	}

	public Performance getPerformance() {
        return performance;
    }

    public void setPerformance(Performance performance) {
        this.performance = performance;
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

	public Map<String, Double> getIndexParticipation() {
		return indexParticipation;
	}

	public void setIndexParticipation(Map<String, Double> indexParticipation) {
		this.indexParticipation = indexParticipation;
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
		        	if (levermann.getPriceEarningsRatio5YearAverage() > 0 && levermann.getPriceEarningsRatio5YearAverage() < 12)
		        		levermannScore++;
		        	else if (levermann.getPriceEarningsRatio5YearAverage() > 16)
		        		levermannScore--;
	    	}
	
		    if (levermann.getPriceEarningsRatio() != null) {
		    	if (levermann.getPriceEarningsRatio() > 0 && levermann.getPriceEarningsRatio() < 12)
		    		levermannScore++;
		    	else if (levermann.getPriceEarningsRatio() > 16)
		    		levermannScore--;
		    }
	
		    if (levermann.getAnalystSellRatio() != null && levermann.getMarketCapitalization() != null) {
		    	if (levermann.getMarketCapitalization() >= StockCategory.LARGE.minMarketCap()) {
		    		if (levermann.getAnalystSellRatio() >= 60)
		    			levermannScore--;
		    		else
		    			levermannScore++;
		    	} else {
		    		if (levermann.getAnalystBuyRatio() >= 60)
		    			levermannScore++;
		    		else
		    			levermannScore--;		    		
		    	}
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
		    	if (levermann.getEarningsPerShareGrowthExpected() > 5)
		    		levermannScore++;
		    	else if (levermann.getEarningsPerShareGrowthExpected() < -5)
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