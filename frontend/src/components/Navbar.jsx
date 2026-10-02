import React from 'react';

export default function Navbar({ cartCount, onOpenCart, onOpenQuiz }) {
  return (
    <header className="w-full bg-white border-b border-pink-100 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img 
            src="/logo.png" 
            alt="VeraBeauty Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-bold tracking-tight text-pink-600 font-serif">
            VeraBeauty
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenQuiz}
            className="px-5 py-2.5 text-xs md:text-sm font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-full transition-colors border border-pink-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>✨</span> Take Hair Quiz
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full transition-colors cursor-pointer flex items-center justify-center w-10 h-10 border border-pink-200"
            aria-label="View Shopping Cart"
          >
            {/* Inline SVG Shopping Bag Icon */}
            <svg className="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            
            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}