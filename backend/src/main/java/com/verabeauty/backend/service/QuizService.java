package com.verabeauty.backend.service;

import com.verabeauty.backend.entity.Product;
import com.verabeauty.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class QuizService {

    @Autowired
    private ProductRepository productRepository;

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String apiUrl;

    public Map<String, Object> generateRoutine(Map<String, Object> quizAnswers) {
        String hairType = (String) quizAnswers.getOrDefault("hairType", "Normal");
        String hairConcern = (String) quizAnswers.getOrDefault("hairConcern", "General Maintenance");

        // Fetch matching products directly from your Supabase database
        List<Product> matchingProducts = productRepository.findByHairConcern(hairConcern);
        if (matchingProducts.isEmpty()) {
            matchingProducts = productRepository.findAll();
        }
        List<Product> recommendedProducts = matchingProducts.stream().limit(3).toList();

        // Generate AI Analysis via Gemini (or Smart Fallback)
        String aiAdvice = callGeminiAI(hairType, hairConcern);

        Map<String, Object> result = new HashMap<>();
        result.put("hairType", hairType);
        result.put("hairConcern", hairConcern);
        result.put("routineAdvice", aiAdvice);
        result.put("recommendedProducts", recommendedProducts);

        return result;
    }

    private String callGeminiAI(String hairType, String hairConcern) {
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.equals("YOUR_GEMINI_API_KEY_HERE")) {
            return "For your " + hairType + " hair targeting " + hairConcern + ", apply a gentle sulfate-free cleanser, follow with a targeted hydrating conditioner, and seal with a lightweight serum 2-3 times a week.";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String prompt = "Act as an expert hair care dermatologist. Provide a concise 3-step routine (Wash, Condition, Treat) for a user with "
                    + hairType + " hair and " + hairConcern + " concern. Keep it under 100 words in clean bullet points.";

            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(Map.of("text", prompt)))
                )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List candidates = (List) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map content = (Map) candidate.get("content");
                    List parts = (List) content.get("parts");
                    Map part = (Map) parts.get(0);
                    return (String) part.get("text");
                }
            }
        } catch (Exception e) {
            System.err.println("Gemini API call failed, using smart fallback: " + e.getMessage());
        }

        return "For your " + hairType + " hair targeting " + hairConcern + ", use gentle clarifying washes twice weekly, focus conditioner on ends, and apply active nutrient serums to protect your scalp barrier.";
    }
}