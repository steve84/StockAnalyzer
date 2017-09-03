package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tcashflow")
public class Cashflow {
    @Id
    @GeneratedValue(generator="cashflow_seq")
    @SequenceGenerator(name="cashflow_seq",sequenceName="cashflow_seq", allocationSize=1)
    @Column(name = "cashflow_id")
	private Integer cashflowId;
}
