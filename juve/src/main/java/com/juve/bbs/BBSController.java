package com.juve.bbs;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.juve.product.Products;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class BBSController {

	@Autowired
	private BBSDAO bDAO;

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "https://juve.co.kr", "https://juve.co.kr" }, allowCredentials = "true")
	@RequestMapping(value = "/bbs/upload.photo", produces = "application/json;charset=utf-8")
	public @ResponseBody HashMap<String, String> getUpload(@RequestParam(value = "upload") MultipartFile mf,
			HttpServletResponse response, HttpServletRequest request) {
//		response.addHeader("Access-Control-Allow-Credentials", "true");
		System.out.println("업로드요청");
		return bDAO.upload(mf);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/photo/{name}")
	public @ResponseBody Resource getPhoto(@PathVariable("name") String name) {
		return bDAO.getPhoto(name);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/reg.bbs", produces = "application/json;charset=utf-8")
	public @ResponseBody BBS regBBS(BBS bbs, @RequestParam(name = "photos", required = false) List<String> photos,
			HttpServletResponse response) {
		System.out.println(photos);
		System.out.println("글등록요청");
		bDAO.regBBS(bbs, photos);
		return bbs;
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/delete.bbs", produces = "application/json;charset=utf-8")
	public @ResponseBody String deleteBBS(BBS bbs, HttpServletResponse response) {
		System.out.println(bbs.getNo());
		return bDAO.deleteById(bbs.getNo());
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/addHits", produces = "application/json;charset=utf-8")
	public @ResponseBody BBS addHits(BBS bbs, HttpServletResponse response) {
		bDAO.addHits(bbs);
		return bbs;
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/getByTypeAndPage", produces = "application/json;charset=utf-8")
	public @ResponseBody BBSList productGetByPage(@RequestParam(name = "page") Integer page,
			@RequestParam(name = "type") String type, @RequestParam(name = "search") String search,
			HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return bDAO.getByTypeAndPage(page, type, search);
	}

	@CrossOrigin(origins = { "http://localhost", "http://121.188.14.80", "http://118.46.72.171",
			"http://www.juve.co.kr", "http://juve.co.kr", "https://juve.co.kr" })
	@RequestMapping(value = "/bbs/getById", produces = "application/json;charset=utf-8")
	public @ResponseBody BBS bbsGetById(@RequestParam(name = "id") Integer id, HttpServletResponse response) {
//		response.addHeader("Access-Control-Allow-Origin", "http://121.188.14.114");
		return bDAO.getById(id);
	}

}
