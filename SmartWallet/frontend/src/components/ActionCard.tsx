'use client';
import React from 'react';

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ActionCard({ title, icon, onClick, variant = 'primary' }: ActionCardProps) {
  const baseClasses = "flex flex-col items-center justify-center p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 transform active:scale-95";
  const variantClasses = variant === 'primary' 
    ? "bg-white border border-gray-100" 
    : "bg-gray-50 border border-gray-200";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} group`}
      onClick={onClick}
    >
      <div className="mb-2 text-blue-600 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center">{title}</span>
    </button>
  );
}