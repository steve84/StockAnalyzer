package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.Values;

@RepositoryRestResource(collectionResourceRel = "value", path = "values")
public interface ValuesRepository extends PagingAndSortingRepository<Values, Integer> {
	List<Values> findFirst1ByStockIdOrderByModifiedAtDesc(@Param("stockId") Integer stockId);
}
