const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
require('dotenv').config();

const sampleTransactions = [
  {
    type: 'payment',
    amount: 15000,
    description: 'Compra en supermercado',
    merchant: {
      name: 'Supermercado Central',
      category: 'Alimentación',
      location: {
        lat: -34.6037,
        lng: -58.3816,
        address: 'Av. Corrientes 1234, CABA'
      }
    },
    status: 'completed',
    paymentMethod: 'card',
    metadata: {
      cashback: 150,
      category: 'food'
    }
  },
  {
    type: 'transfer',
    amount: 25000,
    description: 'Transferencia a María García',
    status: 'completed',
    paymentMethod: 'balance',
    reference: 'TRF001234'
  },
  {
    type: 'recharge',
    amount: 5000,
    description: 'Recarga Movistar',
    status: 'completed',
    paymentMethod: 'card',
    metadata: {
      category: 'mobile'
    }
  },
  {
    type: 'cashback',
    amount: 500,
    description: 'Cashback restaurante',
    merchant: {
      name: 'Restaurante El Buen Sabor',
      category: 'Gastronomía'
    },
    status: 'completed'
  },
  {
    type: 'service',
    amount: 8500,
    description: 'Pago de luz',
    status: 'completed',
    paymentMethod: 'balance',
    metadata: {
      category: 'utilities'
    }
  }
];

async function seedTransactions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwallet');
    
    // Limpiar transacciones existentes
    await Transaction.deleteMany({});
    
    // Insertar transacciones de ejemplo
    const userId = new mongoose.Types.ObjectId();
    const transactions = sampleTransactions.map(t => ({
      ...t,
      userId,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Últimos 30 días
    }));
    
    await Transaction.insertMany(transactions);
    
    console.log('✅ Transacciones de ejemplo creadas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedTransactions();