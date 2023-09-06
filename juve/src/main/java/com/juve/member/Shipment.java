package com.juve.member;

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
@Entity(name = "JUVE_MEMBER_SHIPMENT")
public class Shipment {
	@Id
	@SequenceGenerator(sequenceName = "JUVE_MEMBER_SHIPMENT_SEQ", name = "jmss", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jmss")
	@Column(name = "JMS_NO")
	private Integer no;
	@Column(name = "JMS_ID")
	private String orderId;
	@Column(name = "JMS_DESTINATION")
	private String destination;
	@Column(name = "JMS_NAME")
	private String name;
	@Column(name = "JMS_ADDRESS")
	private String address;
	@Column(name = "JMS_PHONE")
	private String phone;
	@Column(name = "JMS_TEL")
	private String tel;
	@Column(name = "JMS_ISDEFAULT")
	private String isDefault;
	@Column(name = "JMS_REGDATE")
	private Date regDate;
}

//CREATE TABLE JUVE_MEMBER_SHIPMENT(
//		JMS_NO number(5) PRIMARY KEY,
//		JMS_ID varchar2(16 char) NOT NULL,
//		JMS_DESTINATION varchar2(30 char) NOT NULL,
//		JMS_NAME varchar2(4 char) NOT NULL,
//		JMS_ADDRESS varchar2(100 char) NOT NULL,
//		JMS_PHONE varchar2(13 char) NOT NULL,
//		JMS_TEL varchar2(14 char),
//		JMS_ISDEFAULT char(1 char) NOT NULL,
//		JMS_REGDATE DATE NOT NULL,
//		CONSTRAINT SHIPMENT_MEMBER
//			FOREIGN KEY(JMS_ID) REFERENCES JUVE_MEMBER(JM_ID)
//			ON DELETE cascade
//	);
//
//	SELECT * FROM JUVE_MEMBER_SHIPMENT;
//
//	CREATE SEQUENCE JUVE_MEMBER_SHIPMENT_SEQ;
