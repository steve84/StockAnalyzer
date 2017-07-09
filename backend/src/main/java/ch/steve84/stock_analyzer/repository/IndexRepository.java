package ch.steve84.stock_analyzer.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Index;

@RepositoryRestResource(collectionResourceRel = "index", path = "indices")
public interface IndexRepository extends PagingAndSortingRepository<Index, Integer> {

}
