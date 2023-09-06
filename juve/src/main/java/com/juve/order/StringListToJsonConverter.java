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
public class StringListToJsonConverter implements AttributeConverter<List<String>, String> {

	private final static ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		try {
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		try {
			if (dbData != null) {
//				return objectMapper.readValue(dbData, ArrayList.class);
				return objectMapper.readValue(dbData, new TypeReference<List<String>>() {
				});
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ArrayList<>();
	}
}
