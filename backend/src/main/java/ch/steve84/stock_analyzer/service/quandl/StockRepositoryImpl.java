package ch.steve84.stock_analyzer.service.quandl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import ch.steve84.stock_analyzer.entity.quandl.Stock;
import ch.steve84.stock_analyzer.enums.Roles;
import ch.steve84.stock_analyzer.repository.quandl.ReadOnlyRepository;

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
		if (pageable.getSort() != null) {
        	Query q = em.createNamedQuery("Stock.countAllStocks");
        	Long totalRecords = (Long)q.getSingleResult();
    		CriteriaBuilder cb = em.getCriteriaBuilder();
    		CriteriaQuery<Stock> cq = cb.createQuery(Stock.class);
    		Root<Stock> s = cq.from(Stock.class);
    		cq.select(s);
    		Iterator<Sort.Order> iter = pageable.getSort().iterator();
    		List<Order> orders = new ArrayList<Order>();
    		while (iter.hasNext()) {
    			Sort.Order o = iter.next();
    			String[] parts = o.getProperty().split("\\.");
    			if (parts.length >= 2) {
    				if (o.isAscending())
    					orders.add(cb.asc(s.join(parts[0], JoinType.LEFT).get(parts[1])));
    				else
    					orders.add(cb.desc(s.join(parts[0], JoinType.LEFT).get(parts[1])));
    			} else {
	    			if (o.isAscending())
	    				orders.add(cb.asc(s.get(parts[0])));
	    			else
	    				orders.add(cb.desc(s.get(parts[0])));
    			}
    		}
    		cq.orderBy(orders);
    		if (!hasAccess())
    			cq.where(cb.isTrue(s.get("publicStock")));
    		q = em.createQuery(cq);
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
