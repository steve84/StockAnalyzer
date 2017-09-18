package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.Signals;

@RepositoryRestResource(collectionResourceRel = "signal", path = "signals")
public interface SignalsRepository extends PagingAndSortingRepository<Signals, Integer> {
	List<Signals> findByStockId(@Param("stockId") Integer stockId);
}
