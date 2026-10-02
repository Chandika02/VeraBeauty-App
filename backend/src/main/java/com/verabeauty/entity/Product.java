package com.verabeauty.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private Double price;
    private String quantity;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @Column(name = "active_ingredients")
    private String activeIngredients;

    @Column(name = "sulfate_free")
    private Boolean sulfateFree;

    @Column(name = "silicone_free")
    private Boolean siliconeFree;

    @Column(name = "paraben_free")
    private Boolean parabenFree;

    @Column(name = "hair_type")
    private String hairType;

    @Column(name = "hair_concern")
    private String hairConcern;

    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String pros;

    @Column(columnDefinition = "TEXT")
    private String cons;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "buy_link")
    private String buyLink;

    @Column(name = "hair_score")
    private Long hairScore;

    public Product() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getActiveIngredients() { return activeIngredients; }
    public void setActiveIngredients(String activeIngredients) { this.activeIngredients = activeIngredients; }

    public Boolean getSulfateFree() { return sulfateFree; }
    public void setSulfateFree(Boolean sulfateFree) { this.sulfateFree = sulfateFree; }

    public Boolean getSiliconeFree() { return siliconeFree; }
    public void setSiliconeFree(Boolean siliconeFree) { this.siliconeFree = siliconeFree; }

    public Boolean getParabenFree() { return parabenFree; }
    public void setParabenFree(Boolean parabenFree) { this.parabenFree = parabenFree; }

    public String getHairType() { return hairType; }
    public void setHairType(String hairType) { this.hairType = hairType; }

    public String getHairConcern() { return hairConcern; }
    public void setHairConcern(String hairConcern) { this.hairConcern = hairConcern; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getPros() { return pros; }
    public void setPros(String pros) { this.pros = pros; }

    public String getCons() { return cons; }
    public void setCons(String cons) { this.cons = cons; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBuyLink() { return buyLink; }
    public void setBuyLink(String buyLink) { this.buyLink = buyLink; }

    public Long getHairScore() { return hairScore; }
    public void setHairScore(Long hairScore) { this.hairScore = hairScore; }
}