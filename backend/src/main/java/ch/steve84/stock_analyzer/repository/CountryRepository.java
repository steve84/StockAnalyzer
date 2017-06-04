package ch.steve84.stock_analyzer.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Country;

@RepositoryRestResource(collectionResourceRel = "country", path = "countries")
public interface CountryRepository extends PagingAndSortingRepository<Country, Integer> {

}
