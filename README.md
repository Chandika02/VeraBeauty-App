# VeraBeauty — AI-Powered Personalized Hair Care Platform

VeraBeauty is a full-stack e-commerce web application that delivers personalized, salon-grade hair care routines. Powered by Google Gemini AI, the platform analyzes user hair structure, scalp condition, and primary hair goals to generate custom care routines and pair them with matched products from a PostgreSQL database.

---

## 🏗️ System Architecture

The project follows a standard 3-Tier Architecture:
* **Frontend**: React + Vite, Tailwind CSS, Axios.
* **Backend**: Java 21, Spring Boot 3, Spring Data JPA, Hibernate, RestTemplate.
* **Database**: Supabase PostgreSQL (managed via HikariCP pooler with PgBouncer optimization).
* **AI Engine**: Google Gemini API (`gemini-1.5-flash`).

---

## ✨ Key Features

1. **Interactive Hair Diagnostic Quiz**: 3-step structured questionnaire capturing hair texture, scalp condition, and targeted goals.
2. **Gemini AI Routine Engine**: Sends diagnostic answers to Google Gemini API to return personalized 3-step regimen advice.
3. **Dynamic Catalog Management**: Real-time keyword search, sorting (price low-high, high-low, top-rated), and concern filter pills.
4. **Interactive Shopping Cart & Checkout**: Slide-out cart drawer with free shipping progress bar, Indian Rupee (₹) pricing, and Cash on Delivery (COD) order placement saved to PostgreSQL.
5. **Robust Security & Connection Pooling**: Configured CORS cross-origin security and resolved database connection pooler statement caching (`prepareThreshold=0`).

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieves product catalog from Supabase PostgreSQL |
| `POST` | `/api/quiz/recommend` | Submits quiz parameters to Gemini AI and returns matching products |
| `POST` | `/api/orders` | Persists customer checkout orders to the database |

---

## 🚀 Local Setup & Installation

### Prerequisites
* Java JDK 21 or higher
* Node.js v18+ and npm
* Maven (`mvnw` included)