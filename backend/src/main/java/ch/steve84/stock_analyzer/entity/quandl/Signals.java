package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tsignals")
public class Signals {
    @Id
    @GeneratedValue(generator="signals_seq")
    @SequenceGenerator(name="signals_seq",sequenceName="signals_seq", allocationSize=1)
    @Column(name = "signals_id")
	private Integer signalsId;

    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "current_ratio")
    private Double currentRatio;

    @Column(name = "buybacks")
    private Double buybacks;

    @Column(name = "solvency")
    private Double solvency;

    @Column(name = "dividend_payout")
    private Double dividendPayout;

    @Column(name = "operating_margin")
    private Double operatingMargin;

	@Column(name = "net_inc_margin")
    private Double netIncMargin;

    @Column(name = "roe")
    private Double roe;

    @Column(name = "roae")
    private Double roae;

    @Column(name = "rotc")
    private Double rotc;

    @Column(name = "lt_debt_op_income")
    private Double ltDebtOpIncome;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getCurrentRatio() {
		return currentRatio;
	}

	public void setCurrentRatio(Double currentRatio) {
		this.currentRatio = currentRatio;
	}

	public Double getBuybacks() {
		return buybacks;
	}

	public void setBuybacks(Double buybacks) {
		this.buybacks = buybacks;
	}

	public Double getSolvency() {
		return solvency;
	}

	public void setSolvency(Double solvency) {
		this.solvency = solvency;
	}

	public Double getDividendPayout() {
		return dividendPayout;
	}

	public void setDividendPayout(Double dividendPayout) {
		this.dividendPayout = dividendPayout;
	}

	public Double getOperatingMargin() {
		return operatingMargin;
	}

	public void setOperatingMargin(Double operatingMargin) {
		this.operatingMargin = operatingMargin;
	}

	public Double getNetIncMargin() {
		return netIncMargin;
	}

	public void setNetIncMargin(Double netIncMargin) {
		this.netIncMargin = netIncMargin;
	}

	public Double getRoe() {
		return roe;
	}

	public void setRoe(Double roe) {
		this.roe = roe;
	}

	public Double getRoae() {
		return roae;
	}

	public void setRoae(Double roae) {
		this.roae = roae;
	}

	public Double getRotc() {
		return rotc;
	}

	public void setRotc(Double rotc) {
		this.rotc = rotc;
	}

	public Double getLtDebtOpIncome() {
		return ltDebtOpIncome;
	}

	public void setLtDebtOpIncome(Double ltDebtOpIncome) {
		this.ltDebtOpIncome = ltDebtOpIncome;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getSignalsId() {
		return signalsId;
	}
}
