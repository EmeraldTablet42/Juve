package com.juve.order;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CartListToJsonConverter implements AttributeConverter<List<Cart>, String> {

	private final static ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(List<Cart> carts) {
		try {
			return objectMapper.writeValueAsString(carts);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Cart> convertToEntityAttribute(String dbData) {
		try {
			if (dbData != null) {
				return objectMapper.readValue(dbData, new TypeReference<List<Cart>>() {
				});
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ArrayList<>();
	}
}
