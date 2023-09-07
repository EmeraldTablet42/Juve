package com.juve.order;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends CrudRepository<Order, Integer> {

	public abstract List<Order> findAll();

	public abstract List<Order> findByOrderId(String orderId);

	public abstract Order findByOrderCodeAndSenderAndSenderPhone(String orderCode, String sender, String senderPhone);

	// 관리자용
	public abstract Order findByOrderCode(String orderCode);

	public abstract Page<Order> findAllBySender(String sender, Pageable p);

	public abstract Page<Order> findAllByOrderIdAndOrderDateBetween(String id, Date startDate, Date endDate,
			Pageable p);

	// 관리자용
	public abstract Page<Order> findAllByOrderDateBetween(Date startDate, Date endDate, Pageable p);

	public abstract Page<Order> findAllByOrderIdAndOrderDateBetweenAndOrderStatus(String id, Date startDate,
			Date endDate, Integer orderStatus, Pageable p);

	// 관리자용
	public abstract Page<Order> findAllByOrderDateBetweenAndOrderStatus(Date startDate, Date endDate,
			Integer orderStatus, Pageable p);

	public abstract Order findByOrderCodeAndOrderId(String orderCode, String OrderId);

}
