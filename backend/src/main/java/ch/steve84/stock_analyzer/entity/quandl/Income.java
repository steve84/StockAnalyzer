package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tincome")
public class Income {
    @Id
    @GeneratedValue(generator="income_seq")
    @SequenceGenerator(name="income_seq",sequenceName="income_seq", allocationSize=1)
    @Column(name = "income_id")
    private Integer incomeId;
}
