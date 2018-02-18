package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "tcashflow")
public class Cashflow {
    @Id
    @GeneratedValue(generator="cashflow_seq")
    @SequenceGenerator(name="cashflow_seq",sequenceName="cashflow_seq", allocationSize=1)
    @Column(name = "cashflow_id")
	private Integer cashflowId;
    
    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "cash_operations")
    private Double cashOperations;

    @Column(name = "depreciation")
    private Double depreciation;

    @Column(name = "capex")
    private Double capex;

    @Column(name = "cash_investing")
    private Double cashInvesting;

    @Column(name = "issuance_of_stock")
    private Double issuanceOfStock;

    @Column(name = "issuance_of_debt")
    private Double issuanceOfDdebt;

    @Column(name = "cash_financing")
    private Double cashFinancing;
    
    @Transient
    private Double cashFree;

    @Column(name = "start_cash")
    private Double startCash;

    @Column(name = "end_cash")
    private Double endCash;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getCashOperations() {
		return cashOperations;
	}

	public void setCashOperations(Double cashOperations) {
		this.cashOperations = cashOperations;
	}

	public Double getDepreciation() {
		return depreciation;
	}

	public void setDepreciation(Double depreciation) {
		this.depreciation = depreciation;
	}

	public Double getCapex() {
		return Math.abs(capex);
	}

	public void setCapex(Double capex) {
		this.capex = capex;
	}

	public Double getCashInvesting() {
		return cashInvesting;
	}

	public void setCashInvesting(Double cashInvesting) {
		this.cashInvesting = cashInvesting;
	}

	public Double getIssuanceOfStock() {
		return issuanceOfStock;
	}

	public void setIssuanceOfStock(Double issuanceOfStock) {
		this.issuanceOfStock = issuanceOfStock;
	}

	public Double getIssuanceOfDdebt() {
		return issuanceOfDdebt;
	}

	public void setIssuanceOfDdebt(Double issuanceOfDdebt) {
		this.issuanceOfDdebt = issuanceOfDdebt;
	}

	public Double getCashFinancing() {
		return cashFinancing;
	}

	public void setCashFinancing(Double cashFinancing) {
		this.cashFinancing = cashFinancing;
	}

	public Double getCashFree() {
		if (getCashOperations() != null && getCapex() != null)
		  return getCashOperations() - Math.abs(getCapex());
		return null;
	}

	public void setCashFree(Double cashFree) {
		this.cashFree = cashFree;
	}

	public Double getStartCash() {
		return startCash;
	}

	public void setStartCash(Double startCash) {
		this.startCash = startCash;
	}

	public Double getEndCash() {
		return endCash;
	}

	public void setEndCash(Double endCash) {
		this.endCash = endCash;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getCashflowId() {
		return cashflowId;
	}
}
