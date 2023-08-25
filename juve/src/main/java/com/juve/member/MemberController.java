package com.juve.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MemberController {

	@Autowired
	private MemberDAO mDAO;

	@RequestMapping(value = "/member/reg", produces = "application/json;charset=utf-8")
	public @ResponseBody Member memberReg(Member m, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("아이디 : " + m.getId());
		System.out.println("비번 : " + m.getPassword());
		System.out.println("이름 : " + m.getName());
		System.out.println("주소 : " + m.getAddress());
		System.out.println("휴대폰 : " + m.getPhone());
		System.out.println("전화번호 : " + m.getTel());
		System.out.println("이메일 : " + m.getEmail());
		System.out.println("성별 : " + m.getGender());
		System.out.println("생일 : " + m.getBirth());
		System.out.println("마일리지 : " + m.getMileage());
		return mDAO.reg(m);
	}

	@RequestMapping(value = "/member/getIds", produces = "application/json;charset=utf-8")
	public @ResponseBody List<String> getMemberIds(HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		return mDAO.getIds();
	}

}
