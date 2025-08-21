// Mock data para fallback
const mockTransactions = [
  {
    _id: '1',
    type: 'payment',
    amount: 15000,
    description: 'Compra en supermercado',
    merchant: { name: 'Supermercado Central', category: 'Alimentación' },
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    metadata: { cashback: 150 }
  },
  {
    _id: '2',
    type: 'transfer',
    amount: 25000,
    description: 'Transferencia a María García',
    status: 'completed',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: '3',
    type: 'cashback',
    amount: 500,
    description: 'Cashback restaurante',
    merchant: { name: 'Restaurante El Buen Sabor', category: 'Gastronomía' },
    status: 'completed',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  }
];

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const getTransactions = async (filter?: string) => {
  try {
    const query = filter && filter !== 'all' ? `?type=${filter}` : '';
    const response = await apiRequest(`/api/transactions${query}`);
    
    if (!response.ok) throw new Error('API Error');
    
    return await response.json();
  } catch (error) {
    console.warn('API timeout/error, using mock data:', error);
    
    // Filtrar mock data si es necesario
    let filteredTransactions = mockTransactions;
    if (filter && filter !== 'all') {
      filteredTransactions = mockTransactions.filter(t => t.type === filter);
    }
    
    return {
      transactions: filteredTransactions,
      totalPages: 1,
      currentPage: 1,
      total: filteredTransactions.length
    };
  }
};