package com.juve.order;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
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
@Entity(name = "JUVE_ORDER_CART")
public class Cart {

	@Id
	@SequenceGenerator(sequenceName = "JUVE_ORDER_CART_SEQ", name = "josc", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "josc")
	@Column(name = "JOC_NO")
	private Integer no;
	@Column(name = "JOC_ID")
	private String cartId;
	@Column(name = "JOC_PRODUCTCODE")
	private String productCode;
	@Column(name = "JOC_SDRVALUE")
	private String sdrValue;
	@Convert(converter = StringListToJsonConverter.class)
	@Column(name = "JOC_SMTVALUE")
	@Convert(converter = StringListToJsonConverter.class)
	private List<String> smtValue;
	@Convert(converter = StringListToJsonConverter.class)
	@Column(name = "JOC_SSTVALUE")
	private List<String> sstValue;
	@Convert(converter = StringListToJsonConverter.class)
	@Column(name = "JOC_SSMVALUE")
	private List<String> ssmValue;
	@Convert(converter = StringListToJsonConverter.class)
	@Column(name = "JOC_WMTVALUE")
	private List<String> wmtValue;
	@Convert(converter = StringListToJsonConverter.class)
	@Column(name = "JOC_WSTVALUE")
	private List<String> wstValue;
	@Column(name = "JOC_AMOUNT")
	private Integer count;
	@Column(name = "JOC_TOTALPRICE")
	private Integer price;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy. M. d. a h:mm:ss")
	@Column(name = "JOC_REGDATE")
	private Date date;
}

//CREATE TABLE JUVE_ORDER_CART(
//JOC_NO number(6) NOT NULL,
//JOC_ID varchar2(16 char) NOT NULL,
//JOC_PRODUCTNAME varchar2(50 char) NOT NULL,
//JOC_SDRVALUE varchar2(100 char),
//JOC_SMTVALUE varchar2(100 char),
//JOC_SSTVALUE varchar2(100 char),
//JOC_SSMVALUE varchar2(100 char),
//JOC_WMTVALUE varchar2(100 char),
//JOC_WSTVALUE varchar2(100 char),
//JOC_AMOUNT NUMBER(5) NOT NULL,
//JOC_TOTALPRICE number(7) NOT NULL,
//JOC_REGDATE DATE NOT NULL,
//CONSTRAINT CART_ID
//FOREIGN KEY (JOC_ID) REFERENCES JUVE_MEMBER(JM_ID)
//ON DELETE cascade
//);
//
//CREATE SEQUENCE JUVE_ORDER_CART_SEQ;