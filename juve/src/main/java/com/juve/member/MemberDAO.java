package com.juve.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberDAO {

	@Autowired
	private MemberRepo mr;
	
	public Member reg(Member m) {
		return m;
	}
	
}
