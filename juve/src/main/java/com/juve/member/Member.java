package com.juve.member;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "JUVE_MEMBER")
public class Member {

	@Id
	@Column(name = "JM_ID")
	private String id;
	@Column(name = "JM_PASSWORD")
	private String password;
	@Column(name = "JM_NAME")
	private String name;
	@Column(name = "JM_ADDRESS")
	private String address;
	@Column(name = "JM_PHONE")
	private String phone;
	@Column(name = "JM_TEL")
	private String tel;
	@Column(name = "JM_EMAIL")
	private String email;
	@Column(name = "JM_GENDER")
	private String gender;
	private String birth;
	@Column(name = "JM_BIRTH")
	private Date birthDate;
	@Column(name = "JM_MILEAGE")
	private Integer mileage;
}
