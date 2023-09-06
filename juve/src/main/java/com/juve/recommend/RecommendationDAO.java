package com.juve.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juve.member.Member;

@Service
public class RecommendationDAO {

	@Autowired
	private RecommendationRepo rp;

	public String setRcommByCart(Member m, String productCode, Integer count, Integer score) {
		try {
			if (m == null) {
				m = new Member();
				m.setGender("0");
			}
			if (m.getId() == null) {
				String id = "unsigned";
				Recommendation recom = rp.findByRecomIdAndProductCode(id, productCode);
				if (recom == null) {
					recom = new Recommendation();
					recom.setRecomId(id);
					recom.setProductCode(productCode);
					recom.setScore(score * count);
					if (productCode != null) {
						rp.save(recom);
					}
					return "complete";
				} else {
					recom.setScore(recom.getScore() + (score * count));
					rp.save(recom);
					return "complete";
				}
			} else {
				Recommendation recom = rp.findByRecomIdAndProductCode(m.getId(), productCode);
				if (recom == null) {
					recom = new Recommendation();
					recom.setRecomId(m.getId());
					if (m.getAge() != null) {
						recom.setAge(m.getAge());
					}
					System.out.println("오류직전부분"+m.getId());
					if (!m.getGender().equals("0")) {
						recom.setGender(m.getGender());
					}
					recom.setProductCode(productCode);
					recom.setScore(score * count);
					if (productCode != null) {
						rp.save(recom);
					}
					return "complete";
				} else {
					recom.setScore(recom.getScore() + (score * count));
					rp.save(recom);
					return "complete";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}

	}

}
