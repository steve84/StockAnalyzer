package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tbalance")
public class Balance {
    @Id
    @GeneratedValue(generator="balance_seq")
    @SequenceGenerator(name="balance_seq",sequenceName="balance_seq", allocationSize=1)
    @Column(name = "balance_id")
	private Integer balanceId;
}
