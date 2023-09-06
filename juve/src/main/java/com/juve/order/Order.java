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
@Entity(name = "JUVE_ORDER")
public class Order {
	@Id
	@SequenceGenerator(sequenceName = "JUVE_ORDER_SEQ", name = "jos", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jos")
	@Column(name = "JO_NO")
	private Integer no;
	@Column(name = "JO_ID")
	private String orderId;
	@Column(name = "JO_ORDERCODE")
	private String orderCode;
	@Column(name = "JO_SENDER")
	private String sender;
	@Column(name = "JO_SENDER_ADDRESS")
	private String senderAddress;
	@Column(name = "JO_SENDER_PHONE")
	private String senderPhone;
	@Column(name = "JO_SENDER_TEL")
	private String senderTel;
	@Column(name = "JO_SENDER_EMAIL")
	private String senderEmail;
	@Column(name = "JO_DESTINATON")
	private String destination;
	@Column(name = "JO_RECIPIENT")
	private String recipient;
	@Column(name = "JO_RECIPIENT_ADDRESS")
	private String recipientAddress;
	@Column(name = "JO_RECIPIENT_PHONE")
	private String recipientPhone;
	@Column(name = "JO_RECIPIENT_TEL")
	private String recipientTel;
	@Column(name = "JO_ORDERSTATUS")
	private Integer orderStatus;
	@Convert(converter = CartListToJsonConverter.class)
	@Column(name = "JO_CARTS")
	private List<Cart> carts;
	@Column(name = "JO_MILEAGE")
	private Integer mileage;
	@Column(name = "JO_TOTALCARTPRICE")
	private Integer totalCartPrice;
	@Column(name = "JO_SHIPFEE")
	private Integer shipfee;
	@Column(name = "JO_FINALPRICE")
	private Integer finalPrice;
	@Column(name = "JO_MESSAGE")
	private String message;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy. M. d. a h:mm:ss")
	@Column(name = "JO_ORDERDATE")
	private Date orderDate;

}

//CREATE TABLE JUVE_ORDER(
//JO_NO number(7) PRIMARY KEY,
//JO_ID varchar2(16),
//JO_SENDER varchar2(4 char) NOT null,
//JO_SENDER_ADDRESS varchar2(100 char) NOT NULL,
//JO_SENDER_PHONE varchar2(13 char) NOT NULL,
//JO_SENDER_TEL varchar2(14 char),
//JO_SENDER_EMAIL varchar2(50 char) NOT NULL,
//JO_DESTINATON varchar2(30 char) NOT NULL,
//JO_RECIPIENT varchar2(4 char) NOT NULL,
//JO_RECIPIENT_ADDRESS varchar2(100 char) NOT NULL,
//JO_RECIPIENT_PHONE varchar2(13 char) NOT NULL,
//JO_RECIPIENT_TEL varchar2(14 char),
//JO_ORDERSTATUS number(1) NOT NULL,
//JO_CARTS varchar2(4000 char) NOT NULL,
//JO_MILEAGE number(7),
//JO_TOTALCARTPRICE number(8) NOT NULL,
//JO_SHIPFEE number(7) NOT NULL,
//JO_FINALPRICE number(8) NOT NULL,
//JO_MESSAGE varchar2(30 chart),
//JO_ORDERDATE DATE NOT NULL,
//CONSTRAINT FK_JUVE_ORDER_MEMBER FOREIGN KEY (JO_ID) REFERENCES JUVE_MEMBER(JM_ID)
//);
//
//CREATE SEQUENCE JUVE_ORDER_SEQ;
