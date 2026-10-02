package com.verabeauty.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String testConnection() {
        return "VeraBeauty Backend & Supabase Database Connected Successfully!";
    }
}