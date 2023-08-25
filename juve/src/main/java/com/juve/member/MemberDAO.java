package com.juve.member;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberDAO {

	@Autowired
	private MemberRepo mr;

	private BCryptPasswordEncoder bcpe;
	private SimpleDateFormat sdf;

	public MemberDAO() {
		bcpe = new BCryptPasswordEncoder();
		sdf = new SimpleDateFormat("yyyy-MM-dd");
	}

	public Member reg(Member m) {
		try {
			if (m.getBirth() != null) {
				m.setBirthDate(sdf.parse(m.getBirth()));
				System.out.println(m.getBirthDate());
			}
			if (mr.findById(m.getId()).isEmpty()) {
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
}
