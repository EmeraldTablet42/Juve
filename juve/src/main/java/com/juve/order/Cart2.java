//package com.juve.order;
//
//import java.util.Date;
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//
//import jakarta.persistence.CollectionTable;
//import jakarta.persistence.Column;
//import jakarta.persistence.ElementCollection;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EntityResult;
//import jakarta.persistence.FieldResult;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.SequenceGenerator;
//import jakarta.persistence.SqlResultSetMapping;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Entity(name = "JUVE_ORDER_CART")
//@SqlResultSetMapping(name = "CartMapping", entities = { @EntityResult(entityClass = Cart2.class, fields = {
//		@FieldResult(name = "no", column = "JOC_NO"), @FieldResult(name = "cartId", column = "JOC_ID"),
//		@FieldResult(name = "productCode", column = "JOC_PRODUCTCODE"),
//// ... 다른 필드들도 여기에 추가
//}) })
//public class Cart2 {
//
//	@Id
//	@SequenceGenerator(sequenceName = "JUVE_ORDER_CART_SEQ", name = "josc", allocationSize = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "josc")
//	@Column(name = "JOC_NO")
//	private Integer no;
//	@Column(name = "JOC_ID")
//	private String cartId;
//	@Column(name = "JOC_PRODUCTCODE")
//	private String productCode;
//	@Column(name = "JOC_SDRVALUE")
//	private String sdrValue;
//	@ElementCollection
//	@CollectionTable(name = "JOC_SMTVALUE_TABLE", joinColumns = @JoinColumn(name = "JOC_NO"))
//	@Column(name = "SMT_VALUE")
//	private List<String> smtValue;
//
//	@ElementCollection
//	@CollectionTable(name = "JOC_SSTVALUE_TABLE", joinColumns = @JoinColumn(name = "JOC_NO"))
//	@Column(name = "SST_VALUE")
//	private List<String> sstValue;
//
//	@ElementCollection
//	@CollectionTable(name = "JOC_SSMVALUE_TABLE", joinColumns = @JoinColumn(name = "JOC_NO"))
//	@Column(name = "SSM_VALUE")
//	private List<String> ssmValue;
//
//	@ElementCollection
//	@CollectionTable(name = "JOC_WMTVALUE_TABLE", joinColumns = @JoinColumn(name = "JOC_NO"))
//	@Column(name = "WMT_VALUE")
//	private List<String> wmtValue;
//	@ElementCollection
//	@CollectionTable(name = "JOC_WSTVALUE_TABLE", joinColumns = @JoinColumn(name = "JOC_NO"))
//	@Column(name = "WST_VALUE")
//	private List<String> wstValue;
//	
//	@Column(name = "JOC_AMOUNT")
//	private Integer count;
//	@Column(name = "JOC_TOTALPRICE")
//	private Integer price;
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy. M. d. a h:mm:ss")
//	@Column(name = "JOC_REGDATE")
//	private Date date;
//}
//
////CREATE TABLE JUVE_ORDER_CART(
////JOC_NO number(6) NOT NULL,
////JOC_ID varchar2(16 char) NOT NULL,
////JOC_PRODUCTNAME varchar2(50 char) NOT NULL,
////JOC_SDRVALUE varchar2(100 char),
////JOC_SMTVALUE varchar2(100 char),
////JOC_SSTVALUE varchar2(100 char),
////JOC_SSMVALUE varchar2(100 char),
////JOC_WMTVALUE varchar2(100 char),
////JOC_WSTVALUE varchar2(100 char),
////JOC_AMOUNT NUMBER(5) NOT NULL,
////JOC_TOTALPRICE number(7) NOT NULL,
////JOC_REGDATE DATE NOT NULL,
////CONSTRAINT CART_ID
////FOREIGN KEY (JOC_ID) REFERENCES JUVE_MEMBER(JM_ID)
////ON DELETE cascade
////);
////
////CREATE SEQUENCE JUVE_ORDER_CART_SEQ;