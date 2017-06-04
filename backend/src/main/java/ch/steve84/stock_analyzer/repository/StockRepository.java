package ch.steve84.stock_analyzer.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import ch.steve84.stock_analyzer.entity.Stock;

public interface StockRepository extends PagingAndSortingRepository<Stock, Integer> {

}
