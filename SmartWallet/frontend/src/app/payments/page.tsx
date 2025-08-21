'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';

export default function PaymentsPage() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <main className="min-h-screen bg-gray-50">
      <Header title="Pagos" subtitle="Envía dinero fácil y rápido" showBackButton={true} showNotifications={false} />
      
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nuevo Pago</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinatario
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Email o teléfono"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Enviar Pago
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactos Recientes</h3>
          <div className="space-y-3">
            {['María García', 'Juan Pérez', 'Ana López'].map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{contact[0]}</span>
                  </div>
                  <span className="font-medium text-gray-900">{contact}</span>
                </div>
                <button className="text-blue-600 text-sm font-medium">Enviar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}