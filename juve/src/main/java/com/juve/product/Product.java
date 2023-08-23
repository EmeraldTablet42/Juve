package com.juve.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "JUVE_PRODUCT")
public class Product {

	@Id
	@Column(name = "JP_PRODUCTCODE")
	private String productCode;
	@Column(name = "JP_CATEGORY")
	private String category;
	@Column(name = "JP_PRODUCTNUM")
	private Integer productNum;
	@Column(name = "JP_PRODUCTNAME")
	private String productName;
	@Column(name = "JP_PRODUCTPRICE")
	private Integer productPrice;
	@Column(name = "JP_PRODUCTPHOTO")
	private String productPhoto;
}
