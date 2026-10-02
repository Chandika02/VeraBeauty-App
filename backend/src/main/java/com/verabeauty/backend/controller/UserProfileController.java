package com.verabeauty.backend.controller;

import com.verabeauty.backend.entity.UserProfile;
import com.verabeauty.backend.repository.UserProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserProfileController {

    private final UserProfileRepository userProfileRepository;

    public UserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    // Save or update hair quiz results
    @PostMapping("/profile")
    public ResponseEntity<UserProfile> saveOrUpdateProfile(@RequestBody UserProfile profile) {
        return userProfileRepository.findByEmail(profile.getEmail())
                .map(existing -> {
                    existing.setName(profile.getName());
                    existing.setHairType(profile.getHairType());
                    existing.setHairConcern(profile.getHairConcern());
                    existing.setScalpType(profile.getScalpType());
                    existing.setSulfateFreeOnly(profile.getSulfateFreeOnly());
                    return ResponseEntity.ok(userProfileRepository.save(existing));
                })
                .orElseGet(() -> ResponseEntity.ok(userProfileRepository.save(profile)));
    }

    // Retrieve user hair profile by email
    @GetMapping("/profile/{email}")
    public ResponseEntity<UserProfile> getProfileByEmail(@PathVariable String email) {
        return userProfileRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}