package com.juve.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class ProductController {

	@Autowired
	private ProductDAO pDAO;

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product.upload", produces = "application/json;charset=utf-8")
	public @ResponseBody Product productUpload(
			@RequestParam(name = "productPhotoFile", required = false) MultipartFile mf, Product p,
			HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		response.addHeader("Access-Control-Allow-Credentials", "true");
//		System.out.println(p.getCategory());
//		System.out.println(p.getProductCode());
		System.out.println(p.getProductPhoto());
		System.out.println(mf);
//		return "등록성공";
		return pDAO.upload(mf, p);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product.delete", produces = "application/json;charset=utf-8")
	public @ResponseBody String productDelete(Product p, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		pDAO.delete(p);
		return "deleteComplite";
	}

//	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
//			"https://juve.co.kr","https://juve.co.kr/api" })
	@RequestMapping(value = "/product.get", produces = "application/json;charset=utf-8")
	public @ResponseBody Products productGet(MultipartFile mf, Products p, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		return pDAO.get();
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product.getByPage", produces = "application/json;charset=utf-8")
	public @ResponseBody Products productGetByPage(@RequestParam(name = "page") Integer page,
			@RequestParam(name = "category") Integer category, @RequestParam(name = "price") String price,
			@RequestParam(name = "search") String search, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return pDAO.getByPage(category, price, search, page);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product.getById")
	public @ResponseBody Product productGetByID(@RequestParam(name = "id") String id, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return pDAO.getByID(id);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product.getByCategory")
	public @ResponseBody Products productGetByCategory(@RequestParam(name = "category") String category,
			HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return pDAO.getByCategory(category);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171", "http://juve.co.kr",
			"https://juve.co.kr" })
	@RequestMapping(value = "/product/photo/{name}")
	public @ResponseBody Resource getPhoto(@PathVariable("name") String name) {
		return pDAO.getPhoto(name);
	}

}
