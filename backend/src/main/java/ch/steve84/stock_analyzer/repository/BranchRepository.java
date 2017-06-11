package ch.steve84.stock_analyzer.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Branch;

@RepositoryRestResource(collectionResourceRel = "branch", path = "branches")
public interface BranchRepository extends PagingAndSortingRepository<Branch, Integer> {

}
