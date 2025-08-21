'use client';
import React from 'react';

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ActionCard({ title, icon, onClick, variant = 'primary' }: ActionCardProps) {
  const baseClasses = "flex flex-col items-center justify-center p-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md";
  const variantClasses = variant === 'primary' 
    ? "bg-white border border-gray-100" 
    : "bg-gray-50 border border-gray-200";

  return (
    <button 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      <div className="mb-2 text-blue-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center">{title}</span>
    </button>
  );
}