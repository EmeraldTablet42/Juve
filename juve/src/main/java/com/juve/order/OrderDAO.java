package com.juve.order;

import org.springframework.beans.factory.annotation.Autowired;
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
}
