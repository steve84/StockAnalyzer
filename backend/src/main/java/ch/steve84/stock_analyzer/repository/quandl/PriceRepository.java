package ch.steve84.stock_analyzer.repository.quandl;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.Price;

@RepositoryRestResource(collectionResourceRel = "price", path = "price")
public interface PriceRepository extends ReadOnlyRepository<Price, Integer> {

}
