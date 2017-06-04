package ch.steve84.stock_analyzer.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import ch.steve84.stock_analyzer.entity.Branch;

public interface BranchRepository extends PagingAndSortingRepository<Branch, Integer> {

}
