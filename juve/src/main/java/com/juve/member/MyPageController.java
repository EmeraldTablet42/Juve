package com.juve.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MyPageController {

	@Autowired
	private ShipmentDAO sDAO;

	@Autowired
	private FavoriteDAO fDAO;

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member/mypage/reg.shipment", produces = "application/json;charset=utf-8")
	public @ResponseBody Shipment regShipment(Shipment s, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("아이디 : " + s.getOrderId());
		System.out.println("배송지 : " + s.getDestination());
		System.out.println("이름 : " + s.getName());
		System.out.println("주소 : " + s.getAddress());
		System.out.println("휴대폰 : " + s.getPhone());
		System.out.println("전화번호 : " + s.getTel());
		System.out.println("기본배송지 : " + s.getIsDefault());
		System.out.println("등록날짜 :" + s.getRegDate());
		return sDAO.reg(s);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member/mypage/get.shipment.all", produces = "application/json;charset=utf-8")
	public @ResponseBody Shipments getShipments(@RequestParam(value = "token") String loginToken,
			HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println(loginToken);
		return sDAO.getShipmentsByLoginToken(loginToken);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member/mypage/delete.shipment")
	public @ResponseBody String deleteShipmentByNoAndId(@RequestParam(value = "no") Integer no,
			@RequestParam(value = "token") String loginToken, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("통신");
//		return no + loginToken;
		return sDAO.deleteShipmentByLoginToken(no, loginToken);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member/mypage/update.shipment", produces = "application/json;charset=utf-8")
	public @ResponseBody Shipment updateShipment(@RequestParam(value = "token") String loginToken, Shipment s,
			HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("번호 : " + s.getNo());
		System.out.println("아이디 : " + s.getOrderId());
		System.out.println("배송지 : " + s.getDestination());
		System.out.println("이름 : " + s.getName());
		System.out.println("주소 : " + s.getAddress());
		System.out.println("휴대폰 : " + s.getPhone());
		System.out.println("전화번호 : " + s.getTel());
		System.out.println("기본배송지 : " + s.getIsDefault());
		System.out.println("등록날짜 :" + s.getRegDate());
		return sDAO.update(loginToken, s);
//		return sDAO.reg(s);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member/mypage/get.shipment")
	public @ResponseBody Shipment getShipmentByNoAndId(@RequestParam(value = "no") Integer no,
			@RequestParam(value = "token") String loginToken, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("통신");
//		return no + loginToken;
		return sDAO.getShipmentByNoAndLoginToken(no, loginToken);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member.add.favorites")
	public @ResponseBody String addFavorite(@RequestParam(name = "token") String loginToken,
			@RequestParam(name = "productCode") String productCode) {
		return fDAO.addFavoriteByIdAndProductCode(loginToken, productCode);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member.get.favorites")
	public @ResponseBody Favorites getFavorites(@RequestParam(name = "token") String loginToken) {
		return fDAO.getFavoritesById(loginToken);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/member.remove.favorite")
	public @ResponseBody String delFavoritByLoginTokenAndProductCode(@RequestParam(name = "token") String loginToken,
			@RequestParam(name = "productCode") String productCode) {
		return fDAO.removeFavoriteByIdAndProductCode(loginToken, productCode);
	}
}
