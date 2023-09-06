package com.juve.bbs;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "JUVE_BBS")
public class BBS {

	@Id
	@SequenceGenerator(sequenceName = "JUVE_BBS_SEQ", name = "jbs", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jbs")
	@Column(name = "JB_NO")
	private Integer no;
	@Column(name = "JB_BBS_TYPE")
	private String type;
	@Column(name = "JB_BBS_CATEGORY")
	private String category;
	@Column(name = "JB_BBS_WRITER_NAME")
	private String writerName;
	@Column(name = "JB_BBS_WRITER_ID")
	private String writerId;
	@Column(name = "JB_BBS_TITLE")
	private String title;
	@Column(name = "JB_BBS_CONTEXT")
	private String context;
	@Column(name = "JB_BBS_DATE")
	private Date date;
	@Column(name = "JB_BBS_HITS")
	private Integer hits;
	@Column(name = "JB_BBS_RECOMMENDS")
	private Integer recommends;
	@Column(name = "JB_BBS_ISPUBLIC")
	private String isPublic;
	@Column(name = "JB_BBS_PASSWORD")
	private String password;
}

//CREATE TABLE JUVE_BBS(
//JB_NO number(6) PRIMARY KEY,
//JB_BBS_TYPE varchar2(3 char) NOT NULL,
//JB_BBS_CATEGORY varchar2(4 char),
//JB_BBS_WRITER varchar2(4 char) NOT NULL,
//JB_BBS_TITLE varchar2(100 char),
//JB_BBS_CONTEXT varchar2(4000 char) NOT NULL,
//JB_BBS_DATE DATE NOT NULL,
//JB_BBS_HITS number(6),
//JB_BBS_RECOMEND number(3),
//JB_BBS_ISPUBLIC char(1 char) NOT NULL,
//JB_BBS_PASSWORD varchar2(30 char);
//);

//CREATE SEQUENCE JUVE_BBS_SEQ;