package com.juve.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MemberController {

	@Autowired
	private MemberDAO mDAO;

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member/reg", produces = "application/json;charset=utf-8")
	public @ResponseBody Member memberReg(Member m, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
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

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member/getIds", produces = "application/json;charset=utf-8")
	public @ResponseBody List<String> getMemberIds(HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return mDAO.getIds();
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member/getEmails", produces = "application/json;charset=utf-8")
	public @ResponseBody List<String> getMemberEmails(HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return mDAO.getEmails();
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member.getById")
	public @ResponseBody Member memberGetByID(Member m, HttpServletResponse response) {
		System.out.println(m.getId());
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return mDAO.getById(m);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member.get.loginToken")
	public @ResponseBody MemberToken getLoginToken(Member m, HttpServletResponse response) {
		System.out.println(m.getId());
		System.out.println(m.getPassword());
		return mDAO.makeToken(m);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member.get.loginedMember")
	public @ResponseBody Member getLoginedMember(@RequestParam(value = "token") String token,
			HttpServletResponse response) {
		return mDAO.getLoginedMember(token);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80" })
	@RequestMapping(value = "/member.get.refreshToken", produces = "application/json;charset=utf-8")
	public @ResponseBody MemberToken refreshMemberToken(@RequestParam(value = "token") String token,
			HttpServletResponse response) {
		System.out.println("갱신요청");
		return mDAO.refreshMemberToken(token);
	}

}
