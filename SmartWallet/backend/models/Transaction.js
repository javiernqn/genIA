const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['payment', 'transfer', 'recharge', 'service', 'cashback'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  merchant: {
    name: String,
    category: String,
    location: {
      lat: Number,
      lng: Number,
      address: String
    }
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'balance', 'qr', 'contactless']
  },
  reference: String,
  metadata: {
    cashback: Number,
    offer: String,
    category: String
  }
}, {
  timestamps: true
});

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);