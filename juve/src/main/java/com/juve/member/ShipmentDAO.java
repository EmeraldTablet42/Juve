package com.juve.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class ShipmentDAO {

	@Autowired
	private ShipmentRepo sr;
	
	@Autowired

	private static final String KEY = "juve1234567890juve1234567890juve1234567890juve1234567890";

	public Shipment reg(Shipment s) {
		try {
			System.out.println(sr.findByOrderId(s.getOrderId()).size());
			if (sr.findByOrderId(s.getOrderId()).isEmpty()) {
				return sr.save(s);
			} else {
				if (s.getIsDefault().equals("Y")) {
					sr.setIsDafaultToNByOrderId(s.getOrderId());
					return sr.save(s);
				} else {
					return sr.save(s);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void changeToN(String orderId) {
		try {
			System.out.println(orderId);
			sr.setIsDafaultToNByOrderId(orderId);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Shipments getShipmentsByLoginToken(String loginToken) {
		System.out.println("로그인토큰" + loginToken);
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(loginToken);
			Claims c = cs.getBody();
			String id = (String) c.get("id");
			Sort s = Sort.by(Sort.Order.desc("isDefault"), Sort.Order.desc("regDate"));
			Pageable p = PageRequest.of(0, 5, s);
			List<Shipment> shipments = sr.findByOrderId(id, p);
			return new Shipments(shipments);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String deleteShipmentByLoginToken(Integer no, String loginToken) {
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(loginToken);
			Claims c = cs.getBody();
			String id = (String) c.get("id");
			sr.deleteByNoAndOrderId(no, id);
			return "deleteComplete";
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Shipment update(String loginToken, Shipment s) {
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(loginToken);
			Claims c = cs.getBody();
			String id = (String) c.get("id");
			s.setOrderId(id);
			if (sr.findByNoAndOrderId(s.getNo(), id) != null) {
				return reg(s);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Shipment getShipmentByNoAndLoginToken(Integer no, String loginToken) {
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(loginToken);
			Claims c = cs.getBody();
			String id = (String) c.get("id");
			return sr.findByNoAndOrderId(no, id);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
