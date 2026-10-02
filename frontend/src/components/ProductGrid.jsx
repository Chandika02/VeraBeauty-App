import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConcern, setSelectedConcern] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.data) setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setError('Could not connect to database. Ensure Spring Boot is running.');
      })
      .finally(() => setLoading(false));
  }, []);

  const concerns = ['All', ...Array.from(new Set(products.map((p) => p.hairConcern).filter(Boolean)))];

  const filteredProducts = products
    .filter((p) => selectedConcern === 'All' || p.hairConcern?.toLowerCase() === selectedConcern.toLowerCase())
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.hairConcern?.toLowerCase().includes(query) ||
        p.ingredients?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (sortBy === 'high-low') return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (sortBy === 'rating') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      return 0;
    });

  if (loading) {
    return (
      <div className="py-16 text-center text-pink-600 font-semibold text-sm">
        Fetching products from database...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500 font-medium text-xs bg-red-50 rounded-2xl max-w-lg mx-auto border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <section className="py-8 max-w-7xl mx-auto px-6">
      {/* Search and Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="🔍 Search shampoo, brand, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-pink-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-pink-500 shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Dynamic Filter Pills */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-4 mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 whitespace-nowrap">
          Focus Concern:
        </span>
        {concerns.map((concern) => (
          <button
            key={concern}
            onClick={() => setSelectedConcern(concern)}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
              selectedConcern === concern
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            {concern}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-gray-400 font-medium text-xs bg-gray-50 rounded-2xl border border-gray-100">
          No products matched your search or selected filter. Try adjusting your query.
        </div>
      ) : (
        /* Real-time Product Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 bg-pink-100/70 px-2.5 py-1 rounded-md">
                    {product.brand || 'VeraBeauty'}
                  </span>
                  {product.rating && (
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      ★ {product.rating}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 text-base mt-3">{product.name}</h3>

                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  {product.hairType && <p><strong>Hair Type:</strong> {product.hairType}</p>}
                  {product.hairConcern && <p><strong>Target:</strong> {product.hairConcern}</p>}
                  {product.quantity && <p><strong>Size:</strong> {product.quantity}</p>}
                  {product.pros && <p className="text-[11px] text-gray-600 italic mt-2 line-clamp-2">{product.pros}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <span className="text-base font-extrabold text-gray-900">
                  ₹{Number(product.price || 0).toFixed(0)}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl hover:bg-pink-700 transition-colors cursor-pointer shadow-2xs"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}