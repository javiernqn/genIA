'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import CreditCard from '@/components/CreditCard';

export default function CardsPage() {
  const [cards] = useState([
    {
      id: 1,
      cardNumber: '4532123456789012',
      cardHolder: 'JUAN PEREZ',
      expiryDate: '12/26',
      cardType: 'visa' as const,
      isDefault: true
    },
    {
      id: 2,
      cardNumber: '5555123456789012',
      cardHolder: 'JUAN PEREZ',
      expiryDate: '08/25',
      cardType: 'mastercard' as const,
      isDefault: false
    }
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header title="Mis Tarjetas" subtitle="Gestiona tus métodos de pago" showBackButton={true} showNotifications={false} />
      
      <div className="px-4 py-6">
        <div className="space-y-4 mb-6">
          {cards.map((card) => (
            <CreditCard
              key={card.id}
              cardNumber={card.cardNumber}
              cardHolder={card.cardHolder}
              expiryDate={card.expiryDate}
              cardType={card.cardType}
              isDefault={card.isDefault}
            />
          ))}
        </div>
        
        <button className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-gray-600 font-medium">Agregar nueva tarjeta</span>
          </div>
        </button>
        
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificaciones de transacciones</span>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Límite de gastos diario</span>
              <span className="text-blue-600 font-medium">$50,000</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}