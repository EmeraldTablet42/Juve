package com.juve.recommend;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepo extends CrudRepository<Recommendation, Integer> {

	public abstract List<Recommendation> findAll();

	public abstract Recommendation findByRecomIdAndProductCode(String id, String ProductCode);
}
