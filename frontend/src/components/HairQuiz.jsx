import React, { useState } from 'react';

export default function HairQuiz({ isOpen, onClose, onRecommend }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hairType: '',
    scalpType: '',
    hairConcern: '',
  });

  if (!isOpen) return null;

  const hairTypeOptions = [
    {
      label: 'Straight',
      desc: 'Sleek, flat texture with fine to medium strands',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: 'Wavy',
      desc: 'Definite S-shape pattern, prone to light frizz',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c3-3 6 3 9 0s6 3 9 0" />
        </svg>
      ),
    },
    {
      label: 'Curly',
      desc: 'Defined ringlets or loops, needs extra moisture',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a4 4 0 018 0 4 4 0 018 0" />
        </svg>
      ),
    },
    {
      label: 'Coily',
      desc: 'Tight zig-zag pattern, prone to shrinkage & dryness',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-6-12v8m12-8v8" />
        </svg>
      ),
    },
  ];

  const scalpTypeOptions = [
    {
      label: 'Oily',
      desc: 'Greasy within 24 hours, needs frequent washing',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m0-18C8 8 6 12 6 15a6 6 0 0012 0c0-3-2-7-6-12z" />
        </svg>
      ),
    },
    {
      label: 'Dry',
      desc: 'Feels tight, itchy, or flaky between washes',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
        </svg>
      ),
    },
    {
      label: 'Normal',
      desc: 'Well-balanced moisture level, low maintenance',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Sensitive',
      desc: 'Easily irritated by new products or hard water',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  const hairConcernOptions = [
    {
      label: 'Dandruff',
      desc: 'Flaking, scalp irritation, and buildup',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Dryness',
      desc: 'Brittle ends, dull appearance, lack of shine',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: 'Frizz Control',
      desc: 'Unruly strands, humidity reaction',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Hair Fall',
      desc: 'Excessive shedding, thinning, weak roots',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
    },
    {
      label: 'Damage Repair',
      desc: 'Split ends from heat or chemical coloring',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'Volume',
      desc: 'Limp, flat hair needing root lift',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7M5 19l7-7 7 7" />
        </svg>
      ),
    },
  ];

  const handleSelect = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      onRecommend(updated);
      onClose();
      setStep(1);
      setFormData({ hairType: '', scalpType: '', hairConcern: '' });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
        >
          ×
        </button>

        {/* Step Indicator Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Step {step} of 3</span>
            <span>{step === 1 ? 'Hair Texture' : step === 2 ? 'Scalp Condition' : 'Primary Goal'}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-pink-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Hair Type */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">What is your natural hair texture?</h2>
            <p className="text-xs text-gray-500 mb-5">Select the pattern closest to your air-dried hair.</p>
            <div className="grid grid-cols-1 gap-3">
              {hairTypeOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect('hairType', opt.label)}
                  className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-gray-100 group-hover:border-pink-200">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-pink-700">{opt.label}</h4>
                    <p className="text-[11px] text-gray-500">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Scalp Type */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">How would you describe your scalp?</h2>
            <p className="text-xs text-gray-500 mb-5">Think about how your root area feels 24-48 hours after washing.</p>
            <div className="grid grid-cols-1 gap-3">
              {scalpTypeOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect('scalpType', opt.label)}
                  className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-gray-100 group-hover:border-pink-200">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-pink-700">{opt.label}</h4>
                    <p className="text-[11px] text-gray-500">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Hair Concern */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">What is your primary hair concern?</h2>
            <p className="text-xs text-gray-500 mb-5">Our AI will prioritize matching products for this target goal.</p>
            <div className="grid grid-cols-2 gap-3">
              {hairConcernOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect('hairConcern', opt.label)}
                  className="flex flex-col items-start p-3 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <div className="p-2 bg-white rounded-xl shadow-2xs border border-gray-100 group-hover:border-pink-200 mb-2">
                    {opt.icon}
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 group-hover:text-pink-700">{opt.label}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="mt-6 text-xs font-bold text-gray-400 hover:text-gray-700 underline cursor-pointer"
          >
            ← Go Back
          </button>
        )}
      </div>
    </div>
  );
}