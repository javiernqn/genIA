'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { getNearbyOffers, getCurrentLocation, Offer } from '@/lib/geolocation';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNearbyOffers();
  }, []);

  const loadNearbyOffers = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      const nearbyOffers = await getNearbyOffers(latitude, longitude);
      setOffers(nearbyOffers);
    } catch (error) {
      const defaultOffers = await getNearbyOffers(-34.6037, -58.3816);
      setOffers(defaultOffers);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Gastronomía': '🍽️',
      'Alimentación': '🛒',
      'Entretenimiento': '🎬',
      'Salud': '💊',
      'Transporte': '🚇'
    };
    return icons[category as keyof typeof icons] || '🏪';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Ofertas Cercanas" 
          subtitle="Cargando..."
          showBackButton={true}
          showNotifications={false}
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Ofertas Cercanas" 
        subtitle={`${offers.length} ofertas disponibles`}
        showBackButton={true}
        showNotifications={false}
      />

      <div className="p-4 space-y-4">
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay ofertas cercanas
            </h3>
          </div>
        ) : (
          offers.map((offer, index) => (
            <div
              key={offer.merchantId}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getCategoryIcon(offer.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{offer.name}</h3>
                    <p className="text-sm text-gray-500">{offer.category}</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {offer.discount}
                </span>
              </div>

              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1">{offer.title}</h4>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>📍 {offer.address}</span>
                <span>📏 {offer.distance}m</span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Ver oferta
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}