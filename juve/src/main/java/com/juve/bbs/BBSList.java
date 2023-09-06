package com.juve.bbs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BBSList {

	private List<BBS> bbsList;
	private int totalPage;
}