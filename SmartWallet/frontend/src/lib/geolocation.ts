export interface Offer {
  merchantId: string;
  name: string;
  category: string;
  distance: number;
  address: string;
  discount: string;
  title: string;
  description: string;
  tone: 'casual' | 'professional' | 'formal';
}

export const getNearbyOffers = async (latitude: number, longitude: number, radius: number = 5000): Promise<Offer[]> => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const response = await fetch('/api/nearby-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        latitude,
        longitude,
        radius
      })
    });

    if (!response.ok) {
      throw new Error('Error obteniendo ofertas');
    }

    const data = await response.json();
    return data.offers;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutos
    });
  });
};