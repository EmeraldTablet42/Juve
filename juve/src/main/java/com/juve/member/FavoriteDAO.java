package com.juve.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class FavoriteDAO {

	@Autowired
	private FavoriteRepo fr;

	@Autowired
	private MemberDAO mDAO;

	public String addFavoriteByIdAndProductCode(String loginToken, String productCode) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			if (fr.findByFavIdAndProductCode(id, productCode) == null) {
				Favorite fav = new Favorite();
				fav.setFavId(id);
				fav.setProductCode(productCode);
				fr.save(fav);
				return "complete";
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return "DB failed";
		}

	}

	public Favorites getFavoritesById(String loginToken) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			List<Favorite> favorites = fr.findByFavId(id);
			return new Favorites(favorites);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Transactional
	public String removeFavoriteByIdAndProductCode(String loginToken, String productCode) {
		try {
			String id = mDAO.getLoginedMember(loginToken).getId();
			fr.deleteByFavIdAndProductCode(id, productCode);
			return "complete";
		} catch (Exception e) {
			e.printStackTrace();
			return "DB통신에러";
		}
	}
}
