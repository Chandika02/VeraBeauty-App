import React, { useState } from 'react';
import { createOrder } from '../services/api';

export default function CartDrawer({ isOpen, onClose, cartItems, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isOpen) return null;

  // Pricing calculations in INR
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName || !email || !address) {
      alert('Please fill in your name, email, and shipping address.');
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      customerName,
      email,
      phone,
      shippingAddress: address,
      totalAmount: total,
      itemsSummary: cartItems.map((item) => item.name).join(', '),
    };

    createOrder(orderData)
      .then((res) => {
        setOrderSuccess(res.data || { id: Math.floor(Math.random() * 90000) + 10000 });
        onClearCart();
      })
      .catch((err) => {
        console.error('Order submission failed:', err);
        alert('Failed to place order. Ensure Spring Boot backend is running.');
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleCloseDrawer = () => {
    setOrderSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={handleCloseDrawer} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between relative z-10">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <h2 className="text-lg font-black text-gray-900">
                Your Bag ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={handleCloseDrawer}
              className="p-2 text-gray-400 hover:text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-xl"
            >
              ✕
            </button>
          </div>

          {orderSuccess ? (
            /* Success State Screen */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold mb-2">
                ✓
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order Placed Successfully!
              </span>
              <h3 className="text-xl font-black text-gray-900">Thank you for your order</h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Order Reference: <strong className="text-gray-900">#{orderSuccess.id || 'VB-8921'}</strong>. Your items will be dispatched via express delivery.
              </p>
              <button
                onClick={handleCloseDrawer}
                className="w-full mt-6 py-3.5 bg-pink-600 text-white text-xs font-bold rounded-2xl hover:bg-pink-700 transition-colors shadow-sm cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Cart & Checkout Screen */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Free Shipping Progress Indicator */}
              {cartItems.length > 0 && (
                <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                    <span>
                      {amountNeededForFreeShipping > 0
                        ? `Add ₹${amountNeededForFreeShipping} more for FREE Express Shipping!`
                        : '🎉 You unlocked FREE Express Shipping!'}
                    </span>
                  </div>
                  <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pink-600 h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="text-4xl">🛒</div>
                  <p className="text-sm font-bold text-gray-800">Your bag is empty</p>
                  <p className="text-xs text-gray-400">Take our Hair Quiz or browse formulas to add products.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center gap-3 hover:border-pink-200 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center font-bold text-pink-600 text-base shadow-2xs shrink-0">
                        🧴
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-xs">
                          {item.brand || 'VeraBeauty'}
                        </span>
                        <h4 className="font-bold text-xs text-gray-900 truncate mt-0.5">{item.name}</h4>
                        <p className="text-xs font-black text-gray-900 mt-0.5">
                          ₹{Number(item.price || 0).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={onClearCart}
                      className="text-[11px] font-bold text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Input Form */}
              {cartItems.length > 0 && (
                <form onSubmit={handleSubmitOrder} className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-2">
                    Shipping Details
                  </h3>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Shipping Address</label>
                    <textarea
                      required
                      rows="2"
                      placeholder="Flat No, Street Name, City, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-pink-500 transition-all resize-none"
                    />
                  </div>

                  {/* Payment Badge */}
                  <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 flex items-center justify-between text-xs font-bold text-pink-800">
                    <span className="flex items-center gap-1.5">💵 Payment Mode</span>
                    <span className="bg-pink-200/80 text-pink-900 px-2.5 py-0.5 rounded-full text-[10px]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Footer Summary & Order Action Button */}
          {!orderSuccess && cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shippingFee === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-pink-600 text-base">₹{total.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-pink-600 text-white font-extrabold text-xs rounded-2xl hover:bg-pink-700 transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <span>Place Order (COD) • ₹{total.toFixed(0)}</span>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}