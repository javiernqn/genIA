'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateUser } from '@/lib/auth';
import { getLocationFromIP, LocationData } from '@/lib/location';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState<string>('');

  useEffect(() => {
    // Obtener ubicación al cargar la página
    const loadLocation = async () => {
      try {
        const location = await getLocationFromIP();
        setLocationInfo(`${location.city}, ${location.country}`);
      } catch (error) {
        console.log('No se pudo obtener ubicación');
      }
    };
    loadLocation();
  }, []);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    
    setLoading(true);
    
    // Validación para juan_19 y carlos_45
    if (usuario === 'juan_19' || usuario === 'carlos_45') {
      // Obtener geolocalización por IP
      try {
        const location = await getLocationFromIP();
        const { city, country } = location;
        setLocationInfo(`${city}, ${country}`);
      } catch (error) {
        console.log('Error obteniendo ubicación');
      }
      
      // Datos mock según usuario
      const mockUser = usuario === 'juan_19' 
        ? { username: 'juan_19', age: 19, id: '1' }
        : { username: 'carlos_45', age: 45, id: '2' };
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/');
    } else {
      alert('Usuario inexistente');
      setLoading(false);
      setLocationInfo('');
    }
    
    // Código comentado - conexión a Lambda
    /*
    try {
      const location = await getLocationFromIP();
      const { city, country } = location;
      setLocationInfo(`${city}, ${country}`);
      
      const user = await validateUser(usuario, location);
      
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (error) {
      alert('Usuario inexistente');
      setLoading(false);
      setLocationInfo('');
    }
    */
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-blue-700 flex flex-col justify-center p-6 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12 animate-slide-up">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl p-3 animate-bounce-in">
              <img 
                src="/personalpay_logo.jpeg" 
                alt="Personal Pay" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h1 className="text-3xl font-light text-white mb-2 animate-fade-in-delay">Personal Pay</h1>
          </div>
          <p className="text-purple-100 text-lg animate-fade-in-delay-2">Ingresá tu usuario</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 animate-slide-up-delay">
          <div>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-purple-200 text-white placeholder-purple-200 text-lg focus:ring-0 focus:border-white focus:outline-none transition-all duration-500 focus:scale-105 focus:border-b-4 focus:py-5"
              placeholder="Usuario"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !usuario}
            className="w-full bg-white text-purple-600 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform active:scale-95"
          >
            {loading ? 'Ingresando...' : 'Continuar'}
          </button>
        </form>
      </div>
      
      {locationInfo && (
        <div className="text-center text-purple-200 text-sm mt-4 animate-fade-in">
          📍 Conectado desde: {locationInfo}
        </div>
      )}
      
      <div className="text-center text-purple-200 text-sm mt-8 animate-fade-in-delay-3">
        Tu billetera digital inteligente
      </div>
    </div>
  );
}