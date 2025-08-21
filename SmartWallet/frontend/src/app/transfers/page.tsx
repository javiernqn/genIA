'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';

export default function TransfersPage() {
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  return (
    <main className="min-h-screen bg-gray-50">
      <Header title="Transferencias" subtitle="Transfiere a cuentas bancarias" showBackButton={true} showNotifications={false} />
      
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nueva Transferencia</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banco
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar banco</option>
                <option value="banco-nacion">Banco Nación</option>
                <option value="banco-provincia">Banco Provincia</option>
                <option value="santander">Santander</option>
                <option value="bbva">BBVA</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de cuenta
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="0000-0000-0000-000000"
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
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Comisión: $50</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Realizar Transferencia
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuentas Guardadas</h3>
          <div className="space-y-3">
            {[
              { bank: 'Banco Nación', account: '****-****-****-1234' },
              { bank: 'Santander', account: '****-****-****-5678' }
            ].map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{account.bank}</p>
                  <p className="text-sm text-gray-500">{account.account}</p>
                </div>
                <button className="text-blue-600 text-sm font-medium">Usar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}