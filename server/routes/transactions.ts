import { RequestHandler } from 'express';
import { z } from 'zod';

// In-memory transactions
const transactions: any[] = [];

const transactionSchema = z.object({
  email: z.string().email(),
  type: z.enum(['deposit', 'withdrawal', 'bonus', 'referral']),
  amount: z.number().min(0.01),
  method: z.string().optional(),
});

export const createTransaction: RequestHandler = (req, res) => {
  try {
    const data = transactionSchema.parse(req.body);

    const transaction = {
      id: `tx-${Date.now()}`,
      ...data,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };

    transactions.push(transaction);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const getTransactions: RequestHandler = (req, res) => {
  const email = req.query.email as string;
  const limit = parseInt(req.query.limit as string) || 50;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const userTransactions = transactions
    .filter((tx) => tx.email === email)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);

  res.json(userTransactions);
};

export const getTransaction: RequestHandler = (req, res) => {
  const { id } = req.params;

  const transaction = transactions.find((tx) => tx.id === id);

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.json(transaction);
};

export const updateTransactionStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const transaction = transactions.find((tx) => tx.id === id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = status;
    transaction.updatedAt = new Date().toISOString();

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const initializePayment: RequestHandler = (req, res) => {
  try {
    const { email, amount, method } = req.body;

    // In production, call actual payment gateway (Stripe, PayPal, etc.)
    // For demo, simulate payment processing

    const transaction = {
      id: `tx-${Date.now()}`,
      email,
      type: 'deposit',
      amount,
      method,
      status: 'pending',
      paymentId: `payment-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    transactions.push(transaction);

    // Simulate payment gateway response
    res.status(201).json({
      transactionId: transaction.id,
      paymentId: transaction.paymentId,
      status: 'pending',
      redirectUrl: `https://payment-gateway.com/checkout/${transaction.paymentId}`,
    });
  } catch (error) {
    res.status(400).json({ error: 'Payment initialization failed' });
  }
};

export const confirmPayment: RequestHandler = (req, res) => {
  try {
    const { transactionId, paymentId } = req.body;

    const transaction = transactions.find((tx) => tx.id === transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // In production, verify with payment gateway
    transaction.status = 'completed';
    transaction.confirmedAt = new Date().toISOString();

    res.json({
      message: 'Payment confirmed',
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: 'Payment confirmation failed' });
  }
};

export const requestWithdrawal: RequestHandler = (req, res) => {
  try {
    const { email, amount, method, details } = req.body;

    const transaction = {
      id: `tx-${Date.now()}`,
      email,
      type: 'withdrawal',
      amount,
      method,
      details,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    transactions.push(transaction);

    res.status(201).json({
      message: 'Withdrawal request submitted',
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: 'Withdrawal request failed' });
  }
};

export const getWithdrawalMethods: RequestHandler = (req, res) => {
  const methods = [
    { id: 'bank', name: 'Bank Transfer', processingTime: '1-3 days', minAmount: 10 },
    { id: 'card', name: 'Credit/Debit Card', processingTime: '2-5 business days', minAmount: 10 },
    { id: 'crypto-btc', name: 'Bitcoin', processingTime: 'Instant', minAmount: 0.001 },
    { id: 'crypto-eth', name: 'Ethereum', processingTime: 'Instant', minAmount: 0.01 },
    { id: 'ewallet', name: 'E-Wallet', processingTime: 'Instant', minAmount: 5 },
  ];

  res.json(methods);
};

export const getDepositMethods: RequestHandler = (req, res) => {
  const methods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', processingTime: 'Instant' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', processingTime: 'Same day' },
    { id: 'crypto-btc', name: 'Bitcoin', icon: '₿', processingTime: 'Instant' },
    { id: 'crypto-eth', name: 'Ethereum', icon: 'Ξ', processingTime: 'Instant' },
    { id: 'ewallet', name: 'E-Wallet', icon: '📱', processingTime: 'Instant' },
  ];

  res.json(methods);
};
