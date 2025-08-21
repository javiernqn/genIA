'use client';
import React, { useState } from 'react';

interface BalanceCardProps {
  balance: number;
  currency?: string;
}

export default function BalanceCard({ balance, currency = '$' }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mx-4 -mt-8 relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm mb-1">Saldo disponible</p>
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {showBalance ? formatBalance(balance) : '••••••'}
            </h2>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showBalance ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-green-600 text-sm font-medium">+2.5%</p>
          <p className="text-gray-400 text-xs">vs mes anterior</p>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Cargar dinero
        </button>
        <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-medium hover:bg-blue-50 transition-colors">
          Transferir
        </button>
      </div>
    </div>
  );
}