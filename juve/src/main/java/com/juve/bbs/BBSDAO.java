package com.juve.bbs;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.juve.product.Product;
import com.juve.product.Products;

@Service
public class BBSDAO {

	@Autowired
	private BBSRepo br;

	@Autowired
	private BBSPhotoRepo bpr;

	@Value("${file.dir}")
	private String folder;

	private String makeFileName(MultipartFile mf) {
		if (mf == null) {
			return null;
		}
		String file = mf.getOriginalFilename(); // a.png
		String type = file.substring(file.lastIndexOf(".")); // .png
		String uuid = UUID.randomUUID().toString(); // sldkjlakjklsd-sajdlk-123
		file = file.replace(type, ""); // a
		return file + uuid + type;
	}

	public HashMap<String, String> upload(MultipartFile mf) {
		try {
			if (mf != null) {
				String file = makeFileName(mf);
				mf.transferTo(new File(folder + "/bbs/photo/" + file));
				System.out.println(file);
				HashMap<String, String> url = new HashMap<>();
				url.put("url", file);
				return url;
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			// 파일 업로드 실패
			return null;
		}
	}

	public BBS regBBS(BBS bbs, List<String> photos) {
		try {
			System.out.println(bbs.getIsPublic());
			br.save(bbs);// bbs의 no는 자동생성 시퀀스
			System.out.println(bbs.getNo());

			BBSPhoto bbsp = new BBSPhoto();
			for (String string : photos) {
				System.out.println(string);
				bbsp.setBbsNo(bbs.getNo());
				System.out.println(bbs.getNo());
				bbsp.setPhotoName(string);
				bbsp.setWriter(bbs.getWriterId());
				try {
					bpr.save(bbsp);
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("사진DB업로드 에러");
					return null;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	public BBSList getByTypeAndPage(Integer page, String type, String search) {
		try {
			Sort s = Sort.by(Sort.Order.desc("date"));
			Pageable p = PageRequest.of(page - 1, 10, s);
			Page<BBS> pagee = br.findByTypeAndTitleContaining(type, search, p);
			int totalPage = pagee.getTotalPages();
			List<BBS> bbsList = pagee.getContent();
			return new BBSList(bbsList, totalPage);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public BBS getById(Integer id) {
		try {
			return br.findById(id).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String deleteById(Integer id) {
		try {
			List<BBSPhoto> photos = bpr.findByBbsNo(id);
			if (!photos.isEmpty()) {
				for (BBSPhoto photo : photos) {
					String fileName = photo.getPhotoName();
					File file = new File(folder + "/bbs/photo/" + fileName);
					if (file.delete()) { // 파일을 삭제합니다.
						System.out.println("파일삭제");
					} else {
						System.out.println("삭제실패");
					}
				}
			}

			br.deleteById(id);
			return "게시글삭제 성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "게시글삭제 실패";
		}
	}

	public Resource getPhoto(String name) {
		try {
			return new UrlResource("file:" + folder + "/bbs/photo/" + name);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void addHits(BBS bbs) {
		try {
			br.addHits(bbs.getNo());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

//	public void delete(Product p) {
//		try {
//			pr.deleteById(p.getProductCode());
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
}
