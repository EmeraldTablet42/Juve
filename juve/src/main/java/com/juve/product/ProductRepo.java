package com.juve.product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends CrudRepository<Product, String> {

	public abstract List<Product> findAll();
	
	@Query("SELECT DISTINCT p.category FROM JUVE_PRODUCT p")
    List<String> findDistinctCategories();

//	public abstract List<Product> findByProductNameContaining(String n, Pageable p);
	public abstract Page<Product> findByProductNameContaining(String n, Pageable p);

	public abstract Page<Product> findByProductNameContainingAndCategoryIn(String n, List<String> categories,
			Pageable p);

	public abstract List<Product> findByCategory(String n);
	
}
