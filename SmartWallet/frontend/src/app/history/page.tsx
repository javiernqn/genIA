'use client';

import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import { getTransactions } from '@/lib/api';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  merchant?: {
    name: string;
    category: string;
  };
  status: string;
  createdAt: string;
  metadata?: {
    cashback?: number;
  };
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(filter);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      payment: '💳',
      transfer: '↔️',
      recharge: '📱',
      service: '🏢',
      cashback: '💰'
    };
    return icons[type as keyof typeof icons] || '💳';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'text-green-600',
      pending: 'text-yellow-600',
      failed: 'text-red-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  const formatAmount = (amount: number, type: string) => {
    const sign = type === 'cashback' ? '+' : '-';
    return `${sign}$${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <BackButton />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="p-4">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Historial</h1>
        </div>
        
        {/* Filtros */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'payment', label: 'Pagos' },
              { key: 'transfer', label: 'Transferencias' },
              { key: 'recharge', label: 'Recargas' },
              { key: 'cashback', label: 'Cashback' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  filter === item.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de transacciones */}
      <div className="p-4 space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay transacciones
            </h3>
            <p className="text-gray-500">
              Tus transacciones aparecerán aquí
            </p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {transaction.merchant?.name || transaction.description}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'cashback' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </p>
                  <p className={`text-sm ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'completed' ? 'Completado' :
                     transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                  </p>
                </div>
              </div>
              
              {transaction.metadata?.cashback && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-sm text-green-600">
                    💰 Cashback: +${transaction.metadata.cashback}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}