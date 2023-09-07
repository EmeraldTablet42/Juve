package com.juve.order;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.juve.member.Member;
import com.juve.member.MemberDAO;
import com.juve.recommend.RecommendationDAO;

@Service
public class OrderDAO {

	@Autowired
	private OrderRepo or;
	@Autowired
	private MemberDAO mDAO;
	@Autowired
	private RecommendationDAO rDAO;
	@Autowired
	private CartDAO cDAO;

	private SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");

	public Order regOrder(String loginToken, Order order) {
		try {
			Member m = new Member();
			if (loginToken != null) {
				m = mDAO.getMemberByLoginToken(loginToken);
			} else {
				m.setId("unsigned");
				m.setGender("0");
			}
			order.setOrderId(m.getId());
			for (Cart cart : order.getCarts()) {
				rDAO.setRcommByCart(m, cart.getProductCode(), cart.getCount(), 5);
				rDAO.setRcommByCart(m, cart.getSdrValue(), cart.getCount(), 5);
				if (cart.getSmtValue() != null) {
					for (String smt : cart.getSmtValue()) {
						rDAO.setRcommByCart(m, smt, cart.getCount(), 5);
					}
				}
				if (cart.getSstValue() != null) {
					for (String sst : cart.getSstValue()) {
						rDAO.setRcommByCart(m, sst, cart.getCount(), 5);
					}
				}
				if (cart.getSsmValue() != null) {
					for (String ssm : cart.getSsmValue()) {
						rDAO.setRcommByCart(m, ssm, cart.getCount(), 5);
					}
				}
				if (cart.getWmtValue() != null) {
					for (String wmt : cart.getWmtValue()) {
						rDAO.setRcommByCart(m, wmt, cart.getCount(), 5);
					}
				}
				if (cart.getWstValue() != null) {
					for (String wst : cart.getWstValue()) {
						rDAO.setRcommByCart(m, wst, cart.getCount(), 5);
					}
				}
			}
			if (!m.getId().equals("unsigned")) {
				cDAO.delAllcarts(order.getCarts());
			}
			char productInitial = order.getCarts().get(0).getProductCode().charAt(0);
			String date = sdf.format(order.getOrderDate());
			String uuid = UUID.randomUUID().toString().substring(0, 4);
			String orderCode = productInitial + date + uuid;
			System.out.println(orderCode);
			order.setOrderCode(orderCode);
			System.out.println(order.getOrderCode());
			return or.save(order);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String delOrder(String loginToken, Integer no) {
		try {
			Member m = new Member();
			if (loginToken != null) {
				m = mDAO.getMemberByLoginToken(loginToken);
			} else {
				m.setId("unsigned");
			}
			Order order = or.findById(no).get();
			for (Cart cart : order.getCarts()) {
				rDAO.setRcommByCart(m, cart.getProductCode(), cart.getCount(), -5);
				rDAO.setRcommByCart(m, cart.getSdrValue(), cart.getCount(), -5);
				if (cart.getSmtValue() != null) {
					for (String smt : cart.getSmtValue()) {
						rDAO.setRcommByCart(m, smt, cart.getCount(), -5);
					}
				}
				if (cart.getSstValue() != null) {
					for (String sst : cart.getSstValue()) {
						rDAO.setRcommByCart(m, sst, cart.getCount(), -5);
					}
				}
				if (cart.getSsmValue() != null) {
					for (String ssm : cart.getSsmValue()) {
						rDAO.setRcommByCart(m, ssm, cart.getCount(), -5);
					}
				}
				if (cart.getWmtValue() != null) {
					for (String wmt : cart.getWmtValue()) {
						rDAO.setRcommByCart(m, wmt, cart.getCount(), -5);
					}
				}
				if (cart.getWstValue() != null) {
					for (String wst : cart.getWstValue()) {
						rDAO.setRcommByCart(m, wst, cart.getCount(), -5);
					}
				}
			}
			or.deleteById(no);
			return "complete";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신에러";
		}
	}

	public Order getOrderFromUnsigned(String orderCode, String sender, String phone) {
		try {
			return or.findByOrderCodeAndSenderAndSenderPhone(orderCode, sender, phone);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Orders getOrdersFromLoginTokenAndDateBeetween(String loginToken, Date startDate, Date endDate, Integer page,
			Integer orderStatus) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			Sort s = null;
			s = Sort.by(Sort.Order.desc("orderDate"));
			Pageable p = PageRequest.of(page - 1, 10, s);
			Page<Order> pagee = null;
			if (orderStatus != 0) {
				pagee = or.findAllByOrderIdAndOrderDateBetweenAndOrderStatus(id, startDate, endDate, orderStatus, p);
			} else {
				pagee = or.findAllByOrderIdAndOrderDateBetween(id, startDate, endDate, p);
			}
			int totalPage = pagee.getTotalPages();
			List<Order> orders = pagee.getContent();
			System.out.println(id);
			System.out.println(startDate);
			System.out.println(endDate);
			System.out.println(orderStatus);
			return new Orders(orders, totalPage);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Orders getOrdersFromLoginTokenAndDateBeetweenAdmin(String loginToken, Date startDate, Date endDate,
			Integer page, Integer orderStatus) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			if (!id.equals("adminjuve")) {
				return null;
			}
			Sort s = null;
			s = Sort.by(Sort.Order.asc("orderStatus"), Sort.Order.asc("orderDate"));
			Pageable p = PageRequest.of(page - 1, 10, s);
			Page<Order> pagee = null;
			if (orderStatus != 0) {
				pagee = or.findAllByOrderDateBetweenAndOrderStatus(startDate, endDate, orderStatus, p);
			} else {
				pagee = or.findAllByOrderDateBetween(startDate, endDate, p);
			}
			int totalPage = pagee.getTotalPages();
			List<Order> orders = pagee.getContent();
			System.out.println(id);
			System.out.println(startDate);
			System.out.println(endDate);
			System.out.println(orderStatus);
			return new Orders(orders, totalPage);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<Order> getAllOrder() {
		try {
			return or.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<Order> getAllOrderMember(String loginToken) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			return or.findByOrderId(id);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Order getOrderFromLoginedMemberByToken(String orderCode, String LoginToken) {
		try {
			String id = mDAO.getLoginedMember(LoginToken).getId();
			return or.findByOrderCodeAndOrderId(orderCode, id);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Order getOrderFromAdminByToken(String orderCode, String LoginToken) {
		try {
			String id = mDAO.getLoginedMember(LoginToken).getId();
			if (id.equals("adminjuve"))
				;
			return or.findByOrderCode(orderCode);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void setOrderStatus(String orderCode, Integer status) {
		try {
			Order order = or.findByOrderCode(orderCode);
			order.setOrderStatus(status);
			or.save(order);
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}
	}
}
