package com.juve.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
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

	@RequestMapping(value = "/product.upload", produces = "application/json;charset=utf-8")
	public @ResponseBody Product productUpload(
			@RequestParam(name = "productPhotoFile", required = false) MultipartFile mf, Product p,
			HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		response.addHeader("Access-Control-Allow-Credentials", "true");
//		System.out.println(p.getCategory());
//		System.out.println(p.getProductCode());
		System.out.println(p.getProductPhoto());
		System.out.println(mf);
//		return "등록성공";
		return pDAO.upload(mf, p);
	}

	@RequestMapping(value = "/product.get", produces = "application/json;charset=utf-8")
	public @ResponseBody Products productGet(MultipartFile mf, Products p, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		return pDAO.get();
	}

	@RequestMapping(value ="/product.getById")
	public @ResponseBody Product productGetByID(@RequestParam(name = "id") String id, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost");
		return pDAO.getByID(id);
	}

	@RequestMapping(value = "/product/photo/{name}")
	public @ResponseBody Resource getPhoto(@PathVariable("name") String name) {
		return pDAO.getPhoto(name);
	}

}
