package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tvalues")
public class Values {
    @Id
    @GeneratedValue(generator="values_seq")
    @SequenceGenerator(name="values_seq",sequenceName="values_seq", allocationSize=1)
    @Column(name = "values_id")
	private Integer valuesId;
}
