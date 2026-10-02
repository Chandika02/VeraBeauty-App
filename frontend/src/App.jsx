import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import HairQuiz from './components/HairQuiz';
import { getAIRecommendation } from './services/api';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizRecommendation, setQuizRecommendation] = useState(null);
  const [aiRoutine, setAiRoutine] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuizComplete = (quizAnswers) => {
    setQuizRecommendation(quizAnswers);
    setIsAiLoading(true);

    getAIRecommendation(quizAnswers)
      .then((res) => {
        setAiRoutine(res.data);
      })
      .catch((err) => {
        console.error('Failed to generate AI routine:', err);
        alert('Could not fetch AI recommendation. Ensure Spring Boot backend is running.');
      })
      .finally(() => setIsAiLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main>
        {/* Luxury Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-pink-100 via-pink-50 to-white rounded-3xl p-8 border border-pink-100 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-700 bg-pink-200/60 px-3 py-1 rounded-full">
                Salon-Grade • 100% Vegan
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-3 leading-tight">
                Personalized Hair Care, Formulated For You
              </h1>
              <p className="mt-3 text-gray-600 text-sm md:text-base">
                Explore curated formulas tailored to your scalp health, texture, and individual hair care goals.
              </p>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="mt-6 px-6 py-3 bg-pink-600 text-white text-sm font-bold rounded-full hover:bg-pink-700 transition-colors shadow-sm cursor-pointer"
              >
                ✨ Find Your Routine
              </button>
            </div>

            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200"
                alt="Hair Care Routine"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ==================== PASTE TRUST BADGES HERE ==================== */}
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Free Express Shipping</h4>
                <p className="text-[10px] text-gray-500">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <div>
                <h4 className="font-bold text-xs text-gray-900">100% Vegan & Clean</h4>
                <p className="text-[10px] text-gray-500">Dermatologically tested</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-bold text-xs text-gray-900">AI Personalization</h4>
                <p className="text-[10px] text-gray-500">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Cash on Delivery</h4>
                <p className="text-[10px] text-gray-500">Pay upon delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Profile Banner */}
        {quizRecommendation && (
          <div className="max-w-7xl mx-auto px-6 pt-2">
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
                  Personalized Profile Active
                </span>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  Showing products for: <strong>{quizRecommendation.hairType} Hair</strong> • {quizRecommendation.scalpType} Scalp • Focus: {quizRecommendation.hairConcern}
                </p>
              </div>
              <button
                onClick={() => setQuizRecommendation(null)}
                className="text-xs font-semibold text-pink-600 hover:text-pink-800 underline cursor-pointer"
              >
                Clear Profile
              </button>
            </div>
          </div>
        )}

        <ProductGrid onAddToCart={handleAddToCart} />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onClearCart={handleClearCart}
      />

      <HairQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onRecommend={handleQuizComplete}
      />

      {/* AI Routine Loading Modal */}
      {isAiLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full space-y-4">
            <div className="animate-spin h-10 w-10 border-4 border-pink-600 border-t-transparent rounded-full mx-auto"></div>
            <h3 className="text-base font-bold text-gray-900">Formulating Your AI Routine</h3>
            <p className="text-xs text-gray-500">Analyzing hair structure and matching Supabase products...</p>
          </div>
        </div>
      )}

      {/* AI Routine Result Modal */}
      {aiRoutine && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 my-8">
            <button
              onClick={() => setAiRoutine(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </button>

            <div>
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Gemini AI Routine
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                Custom Routine for {aiRoutine.hairType || quizRecommendation?.hairType} Hair
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Target Concern: <strong className="text-pink-600">{aiRoutine.hairConcern || quizRecommendation?.hairConcern}</strong>
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50/80 to-white p-4 rounded-2xl border border-pink-100 text-xs text-gray-700 leading-relaxed whitespace-pre-line shadow-2xs">
              {aiRoutine.routineAdvice}
            </div>

            {aiRoutine.recommendedProducts && aiRoutine.recommendedProducts.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
                  Recommended Matches From Database
                </h3>
                <div className="space-y-2.5">
                  {aiRoutine.recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-gray-50 hover:bg-pink-50/30 transition-colors rounded-xl border border-gray-100 flex justify-between items-center text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{product.name}</p>
                        <p className="text-gray-500 text-[11px]">{product.brand} • ₹{product.price}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleAddToCart(product);
                          alert(`Added ${product.name} to cart!`);
                        }}
                        className="px-3 py-1.5 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 text-[11px] cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setAiRoutine(null)}
              className="w-full py-3 bg-pink-600 text-white font-bold text-xs rounded-xl hover:bg-pink-700 cursor-pointer shadow-xs"
            >
              Close Routine
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-gray-400 text-xs py-12 mt-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-black text-lg mb-3">VeraBeauty</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Formulating personalized, salon-grade hair care backed by Gemini AI intelligence and clean ingredients.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Hair Care Quiz</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Customer Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Stay Connected</h4>
                <p className="text-[11px] text-gray-400 mb-3">Subscribe for custom hair tips and routine advice.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white focus:outline-none w-full"
                  />
                  <button className="px-3 py-2 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700">
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-800 flex justify-between items-center text-[11px]">
              <p>© 2026 VeraBeauty Inc. All rights reserved.</p>
              <div className="flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </footer>
    </div>
  );
}