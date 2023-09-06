package com.juve.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.juve.member.ShipmentDAO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class OrderController {

	@Autowired
	private CartDAO cDAO;

	@Autowired
	private ShipmentDAO sDAO;

	@Autowired
	private OrderDAO oDAO;

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/order/reg.cart", produces = "application/json;charset=utf-8")
	public @ResponseBody String regCart(@RequestBody List<Cart> carts,
//			@RequestParam(name = "token", required = false) String loginToken,
			HttpServletResponse response, HttpServletRequest request) {
		String loginToken = request.getHeader("token");
		System.out.println(loginToken);
		System.out.println(carts);
		return cDAO.regCarts(loginToken, carts);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/order/del.cart", produces = "application/json;charset=utf-8")
	public @ResponseBody String regCart(@RequestBody Cart cart,
//			@RequestParam(name = "token", required = false) String loginToken,
			HttpServletResponse response, HttpServletRequest request) {
		String loginToken = request.getHeader("token");
		System.out.println(loginToken);
		System.out.println(cart);
		return cDAO.delCart(loginToken, cart);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/order/get.cart", produces = "application/json;charset=utf-8")
	public @ResponseBody Carts getCart(@RequestParam(name = "token") String loginToken, HttpServletResponse response) {
		System.out.println(loginToken);
		return cDAO.getCartByIdToken(loginToken);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/order/get.all.cart", produces = "application/json;charset=utf-8")
	public @ResponseBody Carts getAllCart(HttpServletResponse response) {
		return cDAO.getAllCarts();
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/order/reg.order", produces = "application/json;charset=utf-8")
	public @ResponseBody Order regOrder(@RequestBody Order order, HttpServletResponse response,
			HttpServletRequest request) {
		String loginToken = request.getHeader("token");
		System.out.println(order.getTotalCartPrice());
		System.out.println(loginToken);
		return oDAO.regOrder(loginToken, order);
//		return order;
	}

}
