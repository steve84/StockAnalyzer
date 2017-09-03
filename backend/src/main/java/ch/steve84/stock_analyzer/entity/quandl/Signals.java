package ch.steve84.stock_analyzer.entity.quandl;

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
    @GeneratedValue(generator="singals_seq")
    @SequenceGenerator(name="singals_seq",sequenceName="singals_seq", allocationSize=1)
    @Column(name = "singals_id")
	private Integer signalsId;
}
