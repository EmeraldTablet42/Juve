package com.juve.product;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends CrudRepository<Product, String> {

	public abstract List<Product> findAll();

	public abstract List<Product> findByProductNameContaining(String n, Pageable p);
	
	public abstract List<Product> findByCategory(String n);
}
