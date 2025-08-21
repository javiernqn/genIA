'use client';
import React from 'react';

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  isDefault?: boolean;
}

export default function CreditCard({ cardNumber, cardHolder, expiryDate, cardType, isDefault = false }: CreditCardProps) {
  const getCardColor = () => {
    switch (cardType) {
      case 'visa': return 'from-blue-600 to-blue-800';
      case 'mastercard': return 'from-red-600 to-red-800';
      case 'amex': return 'from-green-600 to-green-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getCardColor()} rounded-2xl p-6 text-white relative overflow-hidden`}>
      {isDefault && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
          Principal
        </div>
      )}
      
      <div className="flex justify-between items-start mb-8">
        <div className="text-lg font-bold uppercase">{cardType}</div>
        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
      </div>
      
      <div className="mb-6">
        <p className="text-xl font-mono tracking-wider">
          {cardNumber.replace(/(.{4})/g, '$1 ').trim()}
        </p>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs opacity-70">TITULAR</p>
          <p className="font-medium">{cardHolder}</p>
        </div>
        <div>
          <p className="text-xs opacity-70">VENCE</p>
          <p className="font-medium">{expiryDate}</p>
        </div>
      </div>
    </div>
  );
}