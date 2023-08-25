package com.juve.product;

import java.io.File;
import java.util.ArrayList;
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

@Service
public class ProductDAO {

	@Autowired
	private ProductRepo pr;

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

	public Product upload(MultipartFile mf, Product p) {
		try {
			if (mf != null) {
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

	public void delete(Product p) {
		try {
			pr.deleteById(p.getProductCode());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Products get() {
		try {
			return new Products(pr.findAll(), 0);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

//	public Products getByPage(Integer page) {
//		try {
//			Sort s = Sort.by(Sort.Order.asc("category"), Sort.Order.asc("productNum"));
//			Pageable p = PageRequest.of(page-1, 10, s);
//			List<Product> products = pr.findByProductNameContaining("", p);
//			return new Products(products);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
	public Products getByPage(Integer category, String price, String search, Integer page) {
		try {
//			System.out.println(category);
//			System.out.println(price);
//			System.out.println(search);
			List<String> rstCategories = new ArrayList<>();
			List<String> categories = pr.findDistinctCategories();
			if (category > 0) {
//				System.out.println(categories.size());
//				System.out.println(categories.get(0));
				for (int i = categories.size() - 1; i >= 0; i--) {
					if (category >= 1 << i) {
						System.out.println(categories.get(i));
						rstCategories.add(categories.get(i));
						category -= 1 << i;
					}
				}
			} else {
				rstCategories = categories;
				for (String string : categories) {
					System.out.println(string);
				}
			}

			Sort s = null;
			if (price.equals("desc")) {
				s = Sort.by(Sort.Order.desc("productPrice"), Sort.Order.asc("category"), Sort.Order.asc("productNum"));
			} else if (price.equals("asc")) {
				s = Sort.by(Sort.Order.asc("productPrice"), Sort.Order.asc("category"), Sort.Order.asc("productNum"));
			} else {
				s = Sort.by(Sort.Order.asc("category"), Sort.Order.asc("productNum"));
			}
			Pageable p = PageRequest.of(page - 1, 10, s);
//			Page<Product> pagee = pr.findByProductNameContaining(search, p);
			Page<Product> pagee = pr.findByProductNameContainingAndCategoryIn(search, rstCategories, p);
			int totalPage = pagee.getTotalPages();
			List<Product> products = pagee.getContent();
			return new Products(products, totalPage);
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

	public Products getByCategory(String category) {
		try {
			return new Products(pr.findByCategory(category), 0);
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
