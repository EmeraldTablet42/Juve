package com.juve.member;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepo extends CrudRepository<Member, String> {
	public abstract List<Member> findAll();
	
	@Query("SELECT jm.id FROM JUVE_MEMBER jm")
	public abstract List<String> findAllIds(); 

	@Query("SELECT jm.email FROM JUVE_MEMBER jm")
	public abstract List<String> findAllEmails(); 
}
