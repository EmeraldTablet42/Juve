package com.juve.member;

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
@Entity(name = "JUVE_MEMBER_FAVORITE")
public class Favorite {

	@Id
	@SequenceGenerator(sequenceName = "JUVE_MEMBER_FAVORITE_SEQ", name = "jmfs", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jmfs")
	@Column(name = "JMF_NO")
	private Integer no;
	@Column(name = "JMF_ID")
	private String favId;
	@Column(name = "JMF_PRODUCTCODE")
	private String productCode;

}

//CREATE TABLE JUVE_MEMBER_FAVORITE(
//JMF_NO number(6) NOT NULL,
//JMF_ID varchar2(16 char) NOT NULL,
//JMF_PRODUCTCODE VARCHAR2(7) NOT NULL,
//CONSTRAINT FK_MEMBER_FAVORITE FOREIGN KEY (JMF_ID) REFERENCES JUVE_MEMBER(JM_ID) ON DELETE CASCADE,
//CONSTRAINT FK_PRODUCTCODE_FAVORITE FOREIGN KEY (JMF_PRODUCTCODE) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE) ON DELETE CASCADE
//);

//CREATE SEQUENCE JUVE_MEMBER_FAVORITE_SEQ;