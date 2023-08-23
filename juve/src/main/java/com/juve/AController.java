package com.juve;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AController {

	@RequestMapping("/aMem")
	public @ResponseBody String aMember() {
		return "aMember";
	}
}
