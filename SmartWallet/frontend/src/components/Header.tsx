import React from 'react';
import BackButton from './BackButton';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
  showBackButton?: boolean;
}

export default function Header({ title, subtitle, showNotifications = true, showBackButton = false }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-4 py-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center flex-1">
          {showBackButton && <BackButton />}
          <div className={showBackButton ? 'ml-2' : ''}>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-blue-100 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        
        {showNotifications && (
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => window.location.href = '/notifications'}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">2</span>
            </button>
            
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}