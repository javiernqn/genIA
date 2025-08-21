'use client';

import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';

interface Notification {
  id: string;
  type: 'offer' | 'transaction' | 'security' | 'cashback';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Notificaciones según usuario
        const userNotifications = parsedUser.username === 'juan_19' 
          ? [
              {
                id: '1',
                type: 'offer',
                title: '📱 Oferta de celulares',
                message: '30% OFF en iPhone 15 - Solo por hoy',
                time: '5 min',
                read: false
              },
              {
                id: '2',
                type: 'cashback',
                title: '💰 Cashback gaming',
                message: 'Recibiste $200 por compra en Steam',
                time: '1 hora',
                read: false
              },
              {
                id: '3',
                type: 'transaction',
                title: '✅ Recarga exitosa',
                message: 'Recarga de $500 en Personal completada',
                time: '2 horas',
                read: true
              },
              {
                id: '4',
                type: 'security',
                title: '🔒 Login desde Buenos Aires',
                message: 'Acceso desde nueva ubicación detectado',
                time: '1 día',
                read: true
              }
            ]
          : [
              {
                id: '1',
                type: 'offer',
                title: '🚗 Oferta automotriz',
                message: '15% OFF en service completo - YPF',
                time: '10 min',
                read: false
              },
              {
                id: '2',
                type: 'cashback',
                title: '💰 Cashback combustible',
                message: 'Recibiste $350 por carga de nafta',
                time: '2 horas',
                read: false
              },
              {
                id: '3',
                type: 'transaction',
                title: '✅ Pago de seguro',
                message: 'Cuota de seguro automotor pagada',
                time: '4 horas',
                read: true
              },
              {
                id: '4',
                type: 'security',
                title: '🔒 Login desde Neuquén',
                message: 'Acceso desde ubicación habitual',
                time: '1 día',
                read: true
              }
            ];
        
        setNotifications(userNotifications);
      } catch (error) {
        console.error('Error parsing user data');
      }
    }
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      offer: 'bg-purple-100 text-purple-600',
      cashback: 'bg-green-100 text-green-600',
      transaction: 'bg-blue-100 text-blue-600',
      security: 'bg-orange-100 text-orange-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:scale-105 transition-all duration-300 transform cursor-pointer ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {notification.time}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                    {notification.type === 'offer' ? 'Oferta' :
                     notification.type === 'cashback' ? 'Cashback' :
                     notification.type === 'transaction' ? 'Transacción' : 'Seguridad'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay notificaciones
            </h3>
            <p className="text-gray-500">
              Te avisaremos cuando tengas algo nuevo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}