package com.juve.member;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class MemberDAO {

	@Autowired
	private MemberRepo mr;

	// 계정 비밀번호 암호화
	private BCryptPasswordEncoder bcpe;

	// 날짜 입력값 date타입으로 변환
	private SimpleDateFormat sdf;

	private static final String KEY = "juve1234567890juve1234567890juve1234567890juve1234567890";

	public MemberDAO() {
		bcpe = new BCryptPasswordEncoder();
		sdf = new SimpleDateFormat("yyyy-MM-dd");
	}

	public MemberToken makeToken(Member m) {
		try {
			Optional<Member> dbMember = mr.findById(m.getId());
			if (dbMember.isPresent()) {
				if (bcpe.matches(m.getPassword(), dbMember.get().getPassword())) {
					try {
						Date now = new Date();
						// 30분마다 갱신하지 않으면 만료됨
						Date expriation = new Date(now.getTime() + Duration.ofMinutes(30).toMillis());
						String token = Jwts.builder().signWith(Keys.hmacShaKeyFor(KEY.getBytes("utf-8")))
								.setExpiration(expriation).claim("id", m.getId()).compact();
						return new MemberToken(token);
					} catch (Exception e) {
						e.printStackTrace();
						return null;
					}
				} else {
					return null;
				}
			} else {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
	}

	public Member getLoginedMember(String token) {
		System.out.println("로그인토큰" + token);
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(token);
			Claims c = cs.getBody();
			String id = (String) c.get("id");
			Member m = new Member();
			m.setId(id);
			return m;
		} catch (Exception e) {
//			e.printStackTrace();
			System.out.println("토큰없음");
			return null;
		}
	}

	public MemberToken refreshMemberToken(String token) {
		try {
			JwtParser jp = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).build();
			Jws<Claims> cs = jp.parseClaimsJws(token);
			Claims c = cs.getBody();

			Date now = new Date();
			// 10초 뒤에 만료되는 시간을 나타내는 Date 객체
			Date expiration = new Date(now.getTime() + Duration.ofMinutes(30).toMillis());
			String token2 = Jwts.builder().signWith(Keys.hmacShaKeyFor(KEY.getBytes("utf-8"))).setExpiration(expiration)
					.claim("id", c.get("id")).compact();
			System.out.println("리프레시토큰:" + token2);
			return new MemberToken(token2);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Member reg(Member m) {
		try {
			if (m.getBirth() != null) {
				m.setBirthDate(sdf.parse(m.getBirth()));
				System.out.println(m.getBirthDate());
			}
			if (mr.findById(m.getId()).isEmpty()) {
				m.setPassword(bcpe.encode(m.getPassword()));
				return mr.save(m);
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Member update(Member m) {
		try {
			System.out.println(m.getId());
			Optional<Member> dbMember = mr.findById(m.getId());
			if (dbMember.isPresent()) {
				if (m.getBirth() != null) {
					m.setBirthDate(sdf.parse(m.getBirth()));
					System.out.println(m.getBirthDate());
				}
				m.setPassword(bcpe.encode(m.getPassword()));
				System.out.println("수정성공");
				return mr.save(m);
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<String> getIds() {
		try {
			List<String> ids = mr.findAllIds();
			return ids;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<String> getEmails() {
		try {
			List<String> emails = mr.findAllEmails();
			return emails;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Member getById(Member m) {
		try {
			return mr.findById(m.getId()).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Member getMemberByLoginToken(String loginToken) {
		try {
			String id = getLoginedMember(loginToken).getId();
			return mr.findById(id).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String isPasswordCorrect(String idToken, String inputPw) {
		try {
			String id = getLoginedMember(idToken).getId();
			Member m = mr.findById(id).get();
			if (bcpe.matches(inputPw, m.getPassword())) {
				return "Correct";
			}
			return "Incorrect";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신 에러";
		}
	}

	public String resignMember(String idToken, String inputPw) {
		try {
			String id = getLoginedMember(idToken).getId();
			Member m = mr.findById(id).get();
			if (bcpe.matches(inputPw, m.getPassword())) {
				mr.deleteById(id);
				return "resign";
			}
			return "Incorrect";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신 에러";
		}
	}
}
