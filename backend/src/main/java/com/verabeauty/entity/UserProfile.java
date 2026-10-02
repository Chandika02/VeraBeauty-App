package com.verabeauty.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String hairType;       // e.g., Straight, Wavy, Curly, Coily, Fine, Frizzy
    private String hairConcern;    // e.g., Dandruff, Hair Fall, Dryness, Volume
    private String scalpType;      // e.g., Oily, Dry, Normal, Sensitive
    private Boolean sulfateFreeOnly;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public UserProfile() {}

    public UserProfile(String name, String email, String hairType, String hairConcern, String scalpType, Boolean sulfateFreeOnly) {
        this.name = name;
        this.email = email;
        this.hairType = hairType;
        this.hairConcern = hairConcern;
        this.scalpType = scalpType;
        this.sulfateFreeOnly = sulfateFreeOnly;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHairType() { return hairType; }
    public void setHairType(String hairType) { this.hairType = hairType; }

    public String getHairConcern() { return hairConcern; }
    public void setHairConcern(String hairConcern) { this.hairConcern = hairConcern; }

    public String getScalpType() { return scalpType; }
    public void setScalpType(String scalpType) { this.scalpType = scalpType; }

    public Boolean getSulfateFreeOnly() { return sulfateFreeOnly; }
    public void setSulfateFreeOnly(Boolean sulfateFreeOnly) { this.sulfateFreeOnly = sulfateFreeOnly; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}