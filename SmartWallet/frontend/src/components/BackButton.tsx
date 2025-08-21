'use client';
import React from 'react';

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}