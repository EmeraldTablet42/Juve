package com.juve.product;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductDAO {

	@Autowired
	private ProductRepo pr;

	@Value("${file.dir}")
	private String folder;

	private String makeFileName(MultipartFile mf) {
		if(mf==null) {
			return null;
		}
		String file = mf.getOriginalFilename(); // a.png
		String type = file.substring(file.lastIndexOf(".")); // .png
		String uuid = UUID.randomUUID().toString(); // sldkjlakjklsd-sajdlk-123
		file = file.replace(type, ""); // a
		return file + uuid + type;
	}

	public Product upload(MultipartFile mf, Product p) {
		try {
			if(mf!=null) {
			String file = makeFileName(mf);
			mf.transferTo(new File(folder + "/" + file));
			p.setProductPhoto(file);
			}
		} catch (Exception e) {
			e.printStackTrace();
			// 파일 업로드 실패
			return null;
		}

		try {
			pr.save(p);
			return p;
		} catch (Exception e) {
			e.printStackTrace();
			// DB쪽 문제 발생
			return null;
		}
	}

	public Products get() {
		try {
			return new Products(pr.findAll());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Product getByID(String id) {
		try {
			return pr.findById(id).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Resource getPhoto(String name) {
		try {
			return new UrlResource("file:" + folder + "/" + name);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
