package com.verabeauty.backend.controller;

import com.verabeauty.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/recommend")
    public ResponseEntity<?> getRoutineRecommendation(@RequestBody Map<String, Object> quizAnswers) {
        try {
            Map<String, Object> recommendation = quizService.generateRoutine(quizAnswers);
            return ResponseEntity.ok(recommendation);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to generate recommendation: " + e.getMessage());
        }
    }
}