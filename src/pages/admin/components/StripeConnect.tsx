import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function StripeConnect() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('United States');
  const [zip, setZip] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiry(value);
  };

  // Get card type based on number
  const getCardType = (number: string) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^(6011|65|64[4-9])/
    };

    const cleanNumber = number.replace(/\D/g, '');
    if (re.visa.test(cleanNumber)) return 'visa';
    if (re.mastercard.test(cleanNumber)) return 'mastercard';
    if (re.amex.test(cleanNumber)) return 'amex';
    if (re.discover.test(cleanNumber)) return 'discover';
    return null;
  };

  const cardType = getCardType(cardNumber);

  return (
    <div className="max-w-[520px] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Payment Form</h1>
          <p className="text-sm text-gray-600 mb-6">Accept credit card payments with Stripe</p>

          {/* Link Header */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#635BFF] font-semibold">link</span>
              <span className="text-sm text-gray-600">You're signed in as spencer@test.com</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">×</button>
          </div>

          {/* User Card Preview */}
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg mb-4">
            <div className="w-10 h-10 rounded-full bg-[#E9D5FF] flex items-center justify-center text-purple-600">
              S
            </div>
            <div>
              <div className="text-sm text-gray-900">spencer@test.com</div>
              <div className="flex items-center gap-2">
                <img src="/american-express.png" alt="Amex" className="h-4" />
                <span className="text-sm text-gray-600">•••• 0005</span>
              </div>
            </div>
          </div>

          {/* Autofill Button */}
          <button className="w-full bg-[#0570DE] text-white py-3 px-4 rounded-lg hover:bg-[#0366d6] transition-colors mb-6">
            Autofill with Link
          </button>

          {/* Card Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 1234 1234 1234"
                  maxLength={19}
                  className="w-full pl-3 pr-24 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img 
                    src="/294654_visa_icon.png" 
                    alt="Visa" 
                    className={`h-5 transition-opacity duration-200 ${cardType === 'visa' || !cardType ? 'opacity-100' : 'opacity-30'}`} 
                  />
                  <img 
                    src="/Mastercard-Logo.wine.png" 
                    alt="Mastercard" 
                    className={`h-5 transition-opacity duration-200 ${cardType === 'mastercard' || !cardType ? 'opacity-100' : 'opacity-30'}`} 
                  />
                  <img 
                    src="/american-express.png" 
                    alt="Amex" 
                    className={`h-5 transition-opacity duration-200 ${cardType === 'amex' || !cardType ? 'opacity-100' : 'opacity-30'}`} 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM / YY"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="CVC"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="90210"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-[#047857] text-white py-3 rounded-lg hover:bg-[#065F46] transition-colors mt-6">
            Pay $10.00
          </button>
        </div>
      </div>
    </div>
  );
}