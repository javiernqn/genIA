export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  ip: string;
}

export const getLocationFromIP = async (): Promise<LocationData> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country_name,
      ip: data.ip
    };
  } catch (error) {
    throw new Error('Error obteniendo ubicación por IP');
  }
};