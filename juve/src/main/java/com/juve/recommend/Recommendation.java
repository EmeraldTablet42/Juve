package com.juve.recommend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "JUVE_PRODUCT_RECOMMENDATION")
public class Recommendation {

	@Id
	@SequenceGenerator(sequenceName = "JPR_SEQ", name = "jprs", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jprs")
	@Column(name = "JPR_NO")
	private Integer no;
	@Column(name = "JPR_ID")
	private String recomId;
	@Column(name = "JPR_AGE")
	private Integer age;
	@Column(name = "JPR_GENDER")
	private String gender;
	@Column(name = "JPR_PRODUCTCODE")
	private String productCode;
	@Column(name = "JPR_SCORE")
	private Integer score;

}

//CREATE TABLE JUVE_PRODUCT_RECOMMENDATION (
//JPR_NO NUMBER(7) PRIMARY KEY,
//JPR_ID VARCHAR2(16) REFERENCES JUVE_MEMBER(JM_ID),
//JPR_AGE NUMBER,
//JPR_GENDER CHAR(1),
//JPR_PRODUCTCODE VARCHAR2(7) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE),
//JPR_SCORE NUMBER DEFAULT 0 NOT NULL,
//CONSTRAINT FK_RECOMMENDATION_MEMBER FOREIGN KEY (JPR_ID) REFERENCES JUVE_MEMBER(JM_ID) ON DELETE CASCADE,
//CONSTRAINT FK_RECOMMENDATION_PRODUCT FOREIGN KEY (JPR_PRODUCTCODE) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE) ON DELETE CASCADE
//CREATE SEQUENCE JPR_SEQ;