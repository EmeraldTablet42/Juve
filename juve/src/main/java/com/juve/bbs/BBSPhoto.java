package com.juve.bbs;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "JUVE_BBS_PHOTO")
public class BBSPhoto {
	@Id
	@Column(name = "JBP_PHOTO_NAME")
	private String photoName;
	@Column(name = "JBP_ID")
	private String writer;
	@Column(name = "JBP_BBS_NO")
	private Integer bbsNo;

}

//CREATE TABLE JUVE_BBS_PHOTO(
//JBP_PHOTO_NAME varchar2(200 char) PRIMARY KEY,
//JBP_ID varchar2(16 char) NOT NULL,
//JBP_BBS_NO number(6) NOT NULL,
//CONSTRAINT BBS_PHOTO_NO
//		FOREIGN KEY(JBP_BBS_NO) REFERENCES JUVE_BBS(JB_NO)
//		ON DELETE cascade
//);