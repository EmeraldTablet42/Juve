package com.juve.member;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ShipmentRepo extends CrudRepository<Shipment, Integer> {
	public abstract List<Shipment> findAll();

	public abstract List<Shipment> findByOrderId(String id);
	public abstract List<Shipment> findByOrderId(String id, Pageable p);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update JUVE_MEMBER_SHIPMENT s set s.isDefault = 'N' where s.orderId = :orderId")
	int setIsDafaultToNByOrderId(@Param("orderId") String orderId);
	
	public abstract Shipment findByNoAndOrderId(Integer no, String orderId);
	
	@Transactional
	public abstract void deleteByNoAndOrderId(Integer no, String orderId);
	
}
