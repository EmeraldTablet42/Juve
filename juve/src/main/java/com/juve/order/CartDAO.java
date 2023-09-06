package com.juve.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.juve.member.Member;
import com.juve.member.MemberDAO;
import com.juve.member.MemberRepo;
import com.juve.recommend.RecommendationDAO;

@Service
public class CartDAO {

	@Autowired
	private CartRepo cr;

	@Autowired
	private MemberDAO mDAO;

	@Autowired
	private RecommendationDAO rDAO;

	@Autowired
	private MemberRepo mr;

	@Transactional
	public String regCarts(String loginToken, List<Cart> carts) {
		try {
			String id = null;
			if (loginToken != null) {
				id = mDAO.getLoginedMember(loginToken).getId();
			} else {
				id = "unsigned";
			}
			Member m = new Member();
			if (!mr.findById(id).isEmpty()) {
				m = mr.findById(id).get();
			}
			for (Cart cart : carts) {
				rDAO.setRcommByCart(m, cart.getProductCode(), cart.getCount(), 3);
				rDAO.setRcommByCart(m, cart.getSdrValue(), cart.getCount(), 3);
				if (cart.getSmtValue() != null) {
					for (String smt : cart.getSmtValue()) {
						rDAO.setRcommByCart(m, smt, cart.getCount(), 3);
					}
				}
				if (cart.getSstValue() != null) {
					for (String sst : cart.getSstValue()) {
						rDAO.setRcommByCart(m, sst, cart.getCount(), 3);
					}
				}
				if (cart.getSsmValue() != null) {
					for (String ssm : cart.getSsmValue()) {
						rDAO.setRcommByCart(m, ssm, cart.getCount(), 3);
					}
				}
				if (cart.getWmtValue() != null) {
					for (String wmt : cart.getWmtValue()) {
						rDAO.setRcommByCart(m, wmt, cart.getCount(), 3);
					}
				}
				if (cart.getWstValue() != null) {
					for (String wst : cart.getWstValue()) {
						rDAO.setRcommByCart(m, wst, cart.getCount(), 3);
					}
				}
			}
			for (Cart cart : carts) {
				cart.setCartId(id);
				cr.save(cart);
			}
			return "complete";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신에러";
		}
	}

	@Transactional
	public String delCart(String loginToken, Cart cart) {
		try {
			String id = null;
			if (loginToken != null) {
				id = mDAO.getLoginedMember(loginToken).getId();
			} else {
				id = "unsigned";
			}
			Member m = new Member();
			if (!mr.findById(id).isEmpty()) {
				m = mr.findById(id).get();
			}
			rDAO.setRcommByCart(m, cart.getProductCode(), cart.getCount(), -3);
			rDAO.setRcommByCart(m, cart.getSdrValue(), cart.getCount(), -3);
			if (cart.getSmtValue() != null) {
				for (String smt : cart.getSmtValue()) {
					rDAO.setRcommByCart(m, smt, cart.getCount(), -3);
				}
			}
			if (cart.getSstValue() != null) {
				for (String sst : cart.getSstValue()) {
					rDAO.setRcommByCart(m, sst, cart.getCount(), -3);
				}
			}
			if (cart.getSsmValue() != null) {
				for (String ssm : cart.getSsmValue()) {
					rDAO.setRcommByCart(m, ssm, cart.getCount(), -3);
				}
			}
			if (cart.getWmtValue() != null) {
				for (String wmt : cart.getWmtValue()) {
					rDAO.setRcommByCart(m, wmt, cart.getCount(), -3);
				}
			}
			if (cart.getWstValue() != null) {
				for (String wst : cart.getWstValue()) {
					rDAO.setRcommByCart(m, wst, cart.getCount(), -3);
				}
			}
			if (!id.equals("unsigned")) {
				cr.deleteById(cart.getNo());
			}
			return "complete";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신에러";
		}
	}

	public void delAllcarts(List<Cart> carts) {
		try {
			for (Cart cart : carts) {
				cr.deleteById(cart.getNo());
			}
			return;
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}
	}
//	@Transactional
//	public String delCart(String loginToken, List<Cart> carts) {
//		try {
//			String id = null;
//			if (loginToken != null) {
//				id = mDAO.getLoginedMember(loginToken).getId();
//			} else {
//				id = "unsigned";
//			}
//			Member m = new Member();
//			if (!mr.findById(id).isEmpty()) {
//				m = mr.findById(id).get();
//			}
//			for (Cart cart : carts) {
//				rDAO.setRcommByCart(m, cart.getProductCode(), cart.getCount(), -3);
//				rDAO.setRcommByCart(m, cart.getSdrValue(), cart.getCount(), -3);
//				if (cart.getSmtValue() != null) {
//					for (String smt : cart.getSmtValue()) {
//						rDAO.setRcommByCart(m, smt, cart.getCount(), -3);
//					}
//				}
//				if (cart.getSstValue() != null) {
//					for (String sst : cart.getSstValue()) {
//						rDAO.setRcommByCart(m, sst, cart.getCount(), -3);
//					}
//				}
//				if (cart.getSsmValue() != null) {
//					for (String ssm : cart.getSsmValue()) {
//						rDAO.setRcommByCart(m, ssm, cart.getCount(), -3);
//					}
//				}
//				if (cart.getWmtValue() != null) {
//					for (String wmt : cart.getWmtValue()) {
//						rDAO.setRcommByCart(m, wmt, cart.getCount(), -3);
//					}
//				}
//				if (cart.getWstValue() != null) {
//					for (String wst : cart.getWstValue()) {
//						rDAO.setRcommByCart(m, wst, cart.getCount(), -3);
//					}
//				}
//			}
//			for (Cart cart : carts) {
//				cr.deleteById(cart.getNo());
//			}
//			return "complete";
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "DB통신에러";
//		}
//	}

	public Carts getCartByIdToken(String loginToken) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			Carts carts = new Carts(cr.findAllByCartId(id));
			return carts;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Carts getAllCarts() {
		try {
			Carts carts = new Carts(cr.findAll());
			return carts;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
