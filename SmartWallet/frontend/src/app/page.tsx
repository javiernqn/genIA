'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BalanceCard from '@/components/BalanceCard';
import ServicesGrid from '@/components/ServicesGrid';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar si hay token de autenticación
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [router]);
  return (
    <main className="min-h-screen bg-gray-50">
      <Header 
        title={`Hola, ${user?.username || 'Usuario'}`} 
        subtitle="Bienvenido a SmartWallet"
      />
      
      <div className="pb-6">
        <BalanceCard balance={125000} />
      </div>
      
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ofertas personalizadas</h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300 transform">
          <h4 className="text-xl font-bold mb-2">¡Oferta especial!</h4>
          <p className="text-purple-100 mb-4">20% de descuento en restaurantes cercanos</p>
          <button 
            onClick={() => window.location.href = '/offers'}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200 transform active:scale-95"
          >
            Ver ofertas
          </button>
        </div>
      </div>
      
      <ServicesGrid />
      
      {/* Acceso rápido al historial */}
      <div className="px-4 py-2">
        <button 
          onClick={() => window.location.href = '/history'}
          className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 hover:scale-105 transition-all duration-300 transform active:scale-95"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📋</div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Ver historial</h3>
              <p className="text-sm text-gray-500">Todas tus transacciones</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </main>
  )
}