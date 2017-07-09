package ch.steve84.stock_analyzer.enums;

public enum StockCategory {
	MEGA (200_000, null, "Mega Cap"),
	LARGE (10_000, 200_000, "Large Cap"),
	MID (2_000, 10_000, "Mid Cap"),
	MICRO (50, 2_000, "Micro Cap"),
	NANO (null, 50, "Nano Cap");
	
	private final Integer minMarketCap;
	private final Integer maxMarketCap;
	private final String categoryName;
	
	StockCategory(Integer minMarketCap, Integer maxMarketCap, String categoryName) {
		this.minMarketCap = minMarketCap;
		this.maxMarketCap = maxMarketCap;
		this.categoryName = categoryName;
	}
	
	public Integer minMarketCap() {
		return minMarketCap;
	}
	
	public Integer maxMarketCap() {
		return maxMarketCap;
	}
	
	public String categoryName() {
		return categoryName;
	}

}
