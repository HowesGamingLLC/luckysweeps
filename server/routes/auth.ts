import { RequestHandler } from 'express';
import { z } from 'zod';

// In-memory user storage (in production, use a real database)
const users = new Map<string, {
  id: string;
  email: string;
  password: string;
  balance: number;
  verified: boolean;
  referralCode: string;
  createdAt: string;
}>();

// Demo user
users.set('demo@mcluck.com', {
  id: 'user-1',
  email: 'demo@mcluck.com',
  password: 'demo123',
  balance: 1250,
  verified: true,
  referralCode: 'MCLUCK2024',
  createdAt: new Date().toISOString(),
});

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const handleRegister: RequestHandler = (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    // Check if user already exists
    if (users.has(email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const userId = `user-${Date.now()}`;
    const referralCode = `REF${userId.slice(-6).toUpperCase()}`;

    const newUser = {
      id: userId,
      email,
      password,
      balance: 100, // Initial bonus
      verified: false,
      referralCode,
      createdAt: new Date().toISOString(),
    };

    users.set(email, newUser);

    // In production, generate a proper JWT
    const token = `token-${userId}-${Date.now()}`;

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        balance: newUser.balance,
        verified: newUser.verified,
        referralCode: newUser.referralCode,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    // Find user
    const user = users.get(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In production, generate a proper JWT
    const token = `token-${user.id}-${Date.now()}`;

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        balance: user.balance,
        verified: user.verified,
        referralCode: user.referralCode,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const handleVerifyEmail: RequestHandler = (req, res) => {
  try {
    const { email, code } = req.body;
    const user = users.get(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In production, verify the actual code
    if (code === '123456') {
      user.verified = true;
      res.json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  // In production, invalidate the token
  res.json({ message: 'Logged out successfully' });
};

export const getUser: RequestHandler = (req, res) => {
  // In production, extract user ID from token
  const email = (req.query.email as string) || 'demo@mcluck.com';
  const user = users.get(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    balance: user.balance,
    verified: user.verified,
    referralCode: user.referralCode,
    createdAt: user.createdAt,
  });
};

export const updateUserBalance: RequestHandler = (req, res) => {
  try {
    const { email, amount } = req.body;
    const user = users.get(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance = Math.max(0, user.balance + amount);

    res.json({
      message: 'Balance updated',
      balance: user.balance,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const getAllUsers: RequestHandler = (req, res) => {
  const userList = Array.from(users.values()).map(u => ({
    id: u.id,
    email: u.email,
    balance: u.balance,
    verified: u.verified,
    createdAt: u.createdAt,
  }));

  res.json(userList);
};
