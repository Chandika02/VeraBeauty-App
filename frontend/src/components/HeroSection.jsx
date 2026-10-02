import React from 'react';
import { Sparkles, ShieldCheck, Leaf, Heart } from 'lucide-react';

export default function HeroSection({ onOpenQuiz }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-pink-50 via-white to-pink-50/40 border border-pink-100 rounded-3xl p-8 lg:p-12 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Salon-Grade Care, Personalized
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Personalized Hair Care, Formulated For You
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Discover formulas matched to your unique scalp health, texture, and goals. Take our quick diagnostic quiz to unlock your custom routine.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onOpenQuiz}
              className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-md hover:bg-pink-700 transition-colors"
            >
              Start Hair Diagnostic
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-pink-100 flex flex-wrap gap-6 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-green-600" /> 100% Vegan</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-pink-600" /> Sulfate-Free</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-500" /> Cruelty-Free</span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200"
            alt="Healthy Hair Care Routine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="font-bold text-lg">Targeted Scalp & Hair Nutrition</h3>
            <p className="text-xs text-gray-200">Curated products screened for maximum efficacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}