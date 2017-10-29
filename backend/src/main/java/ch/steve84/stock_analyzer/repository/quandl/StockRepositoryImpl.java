package ch.steve84.stock_analyzer.repository.quandl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import ch.steve84.stock_analyzer.entity.quandl.Stock;
import ch.steve84.stock_analyzer.enums.Roles;

public class StockRepositoryImpl implements ReadOnlyRepository<Stock, Integer> {

    @PersistenceContext
    private EntityManager em;
	
	@Override
	public Stock findOne(Integer id) {
        if (hasAccess()) {
        	Query q = em.createNamedQuery("Stock.findById");
        	q.setParameter("id", id);
        	try {
        		return (Stock)q.getSingleResult();
        	} catch (NoResultException e) {
        		return null;
        	}
        } else {
        	Query q = em.createNamedQuery("Stock.findByIdPublic");
        	q.setParameter("id", id);
        	try {
        		return (Stock)q.getSingleResult();
        	} catch (NoResultException e) {
        		return null;
        	}
        }
	}

	@Override
	public Iterable<Stock> findAll() {
		return null;
	}

	@Override
	public Iterable<Stock> findAll(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<Stock> findAll(Sort sort) {
		return null;
	}

	@Override
	public Page<Stock> findAll(Pageable pageable) {
        if (hasAccess()) {
        	Query q = em.createNamedQuery("Stock.countAllStocks");
        	Long totalRecords = (Long)q.getSingleResult();
        	
        	q = em.createNamedQuery("Stock.findAllStocks");
        	q.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        	q.setMaxResults(pageable.getPageSize());
        	try {
        		List<Stock> res = q.getResultList();
        		Page<Stock> p = new PageImpl<Stock>(res, pageable, totalRecords);
        		return p;
        	} catch (NoResultException e) {
        		return null;
        	}
        } else {
        	Query q = em.createNamedQuery("Stock.countAllPublicStocks");
        	Long totalRecords = (Long)q.getSingleResult();
        	
        	q = em.createNamedQuery("Stock.findAllPublicStocks");
        	q.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        	q.setMaxResults(pageable.getPageSize());
        	try {
        		List<Stock> res = q.getResultList();
        		Page<Stock> p = new PageImpl<Stock>(res, pageable, totalRecords);
        		return p;
        	} catch (NoResultException e) {
        		return null;
        	}
        }
	}

    private boolean hasAccess() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	if (auth != null) {
    		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(auth.getAuthorities());
    		return authorities.size() > 0 && (authorities.get(0).getAuthority().equals(Roles.ADMIN.getRole().getRoleName()) || authorities.get(0).getAuthority().equals(Roles.ABO.getRole().getRoleName()));
    	}
    	return false;
    }
}
