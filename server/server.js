const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const {
  users,
  creditCards,
  transactions,
  credStoreCatalog,
  aiCoachResponses
} = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'truecredit-super-secret-key-2024';

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'],
  credentials: true
}));
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Helper function to find user by ID
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

// Helper function to calculate SmartPay allocation
const calculateSmartPayAllocation = (availableFunds, userCards) => {
  if (!userCards.length) return [];

  // Sort cards by priority: highest balance first, then earliest due date
  const sortedCards = [...userCards].sort((a, b) => {
    if (Math.abs(a.balance - b.balance) > 10) {
      return b.balance - a.balance; // Higher balance first
    }
    return new Date(a.dueDate) - new Date(b.dueDate); // Earlier due date first
  });

  const allocation = [];
  let remainingFunds = availableFunds;

  for (const card of sortedCards) {
    if (remainingFunds <= 0) break;

    const recommendedPayment = Math.min(
      remainingFunds,
      Math.max(card.minimumDue, card.balance * 0.3) // Pay at least minimum, ideally 30% of balance
    );

    if (recommendedPayment > 0) {
      allocation.push({
        cardId: card.id,
        cardName: card.cardName,
        lastFourDigits: card.lastFourDigits,
        currentBalance: card.balance,
        paymentAmount: Math.round(recommendedPayment * 100) / 100,
        newBalance: Math.round((card.balance - recommendedPayment) * 100) / 100,
        brand: card.brand,
        color: card.color
      });
      remainingFunds -= recommendedPayment;
    }
  }

  return allocation;
};

// Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TrueCredit API is running', timestamp: new Date().toISOString() });
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (findUserByEmail(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      truePoints: 0
    };

    users.push(newUser);

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        truePoints: newUser.truePoints
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        truePoints: user.truePoints
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Credit Cards Routes
app.get('/api/cards/:userId', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const userCards = creditCards.filter(card => card.userId === userId);
    res.json(userCards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
});

app.post('/api/cards/add', authenticateToken, (req, res) => {
  try {
    const { cardName, lastFourDigits, balance, dueDate, minimumDue, brand = 'visa' } = req.body;
    const userId = req.user.userId;

    if (!cardName || !lastFourDigits || balance === undefined || !dueDate || minimumDue === undefined) {
      return res.status(400).json({ error: 'All card fields are required' });
    }

    // Generate card color based on brand
    const cardColors = {
      visa: '#1a365d',
      mastercard: '#c53030',
      amex: '#38a169'
    };

    const newCard = {
      id: uuidv4(),
      userId,
      cardName,
      lastFourDigits,
      balance: parseFloat(balance),
      dueDate,
      minimumDue: parseFloat(minimumDue),
      brand: brand.toLowerCase(),
      color: cardColors[brand.toLowerCase()] || '#4a5568'
    };

    creditCards.push(newCard);

    res.status(201).json({
      message: 'Card added successfully',
      card: newCard
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding card' });
  }
});

// Payment Routes
app.post('/api/pay/smartpay', authenticateToken, (req, res) => {
  try {
    const { availableFunds } = req.body;
    const userId = req.user.userId;

    if (!availableFunds || availableFunds <= 0) {
      return res.status(400).json({ error: 'Valid available funds amount required' });
    }

    const userCards = creditCards.filter(card => card.userId === userId);
    if (!userCards.length) {
      return res.status(400).json({ error: 'No credit cards found' });
    }

    const allocation = calculateSmartPayAllocation(availableFunds, userCards);
    
    res.json({
      message: 'SmartPay allocation calculated',
      availableFunds,
      allocation,
      totalAllocated: allocation.reduce((sum, item) => sum + item.paymentAmount, 0),
      truePointsToEarn: Math.round(availableFunds * 1.5) / 100 // 1.5% cashback
    });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating SmartPay allocation' });
  }
});

app.post('/api/pay/paytogether', authenticateToken, (req, res) => {
  try {
    const { payments } = req.body; // Array of {cardId, amount}
    const userId = req.user.userId;

    if (!payments || !Array.isArray(payments) || payments.length === 0) {
      return res.status(400).json({ error: 'Payment information required' });
    }

    const userCards = creditCards.filter(card => card.userId === userId);
    const totalAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
    const truePointsEarned = Math.round(totalAmount * 1.5) / 100; // 1.5% cashback

    // Update card balances
    payments.forEach(payment => {
      const card = userCards.find(c => c.id === payment.cardId);
      if (card) {
        card.balance = Math.max(0, card.balance - parseFloat(payment.amount));
      }
    });

    // Update user's TruePoints
    const user = findUserById(userId);
    if (user) {
      user.truePoints = Math.round((user.truePoints + truePointsEarned) * 100) / 100;
    }

    // Create transaction record
    const newTransaction = {
      id: uuidv4(),
      userId,
      type: 'payment',
      amount: totalAmount,
      truePointsEarned,
      description: 'PayTogether™ - Multiple Card Payment',
      date: new Date(),
      cardIds: payments.map(p => p.cardId)
    };
    transactions.push(newTransaction);

    res.json({
      message: 'PayTogether payment successful',
      totalAmount,
      truePointsEarned,
      newTruePointsBalance: user.truePoints,
      transactionId: newTransaction.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing PayTogether payment' });
  }
});

// Rewards Routes
app.get('/api/rewards/:userId', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = findUserById(userId);
    const userTransactions = transactions.filter(t => t.userId === userId);

    res.json({
      currentBalance: user.truePoints,
      transactions: userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rewards' });
  }
});

// CredStore Routes
app.get('/api/credstore/catalog', authenticateToken, (req, res) => {
  try {
    // Sort catalog: popular items first, then by points cost
    const sortedCatalog = [...credStoreCatalog].sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.pointsCost - b.pointsCost;
    });

    res.json(sortedCatalog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching CredStore catalog' });
  }
});

app.post('/api/credstore/redeem', authenticateToken, (req, res) => {
  try {
    const { rewardId } = req.body;
    const userId = req.user.userId;

    if (!rewardId) {
      return res.status(400).json({ error: 'Reward ID required' });
    }

    const user = findUserById(userId);
    const reward = credStoreCatalog.find(r => r.id === rewardId);

    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    if (user.truePoints < reward.pointsCost) {
      return res.status(400).json({ error: 'Insufficient TruePoints' });
    }

    // Deduct points
    user.truePoints -= reward.pointsCost;

    // Create redemption transaction
    const redemptionTransaction = {
      id: uuidv4(),
      userId,
      type: 'redemption',
      amount: -(reward.pointsCost / 100), // Negative for redemption
      truePointsUsed: reward.pointsCost,
      description: `CredStore™ - ${reward.name}`,
      date: new Date(),
      rewardItem: reward.name
    };
    transactions.push(redemptionTransaction);

    res.json({
      message: 'Reward redeemed successfully',
      reward: reward.name,
      pointsUsed: reward.pointsCost,
      newTruePointsBalance: user.truePoints,
      transactionId: redemptionTransaction.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error redeeming reward' });
  }
});

// AI Coach Route
app.post('/api/coach', authenticateToken, (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const normalizedMessage = message.toLowerCase().trim();
    const user = findUserById(userId);
    
    // Find matching response or use default
    let response = aiCoachResponses.default;
    
    for (const [key, value] of Object.entries(aiCoachResponses)) {
      if (key !== 'default' && normalizedMessage.includes(key)) {
        response = value;
        break;
      }
    }

    // Personalize the response with user data
    if (normalizedMessage.includes('points')) {
      response = response.replace('${users[0].truePoints}', user.truePoints.toString());
    }

    res.json({
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing AI Coach request' });
  }
});

// User Profile Route
app.get('/api/user/:userId', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      truePoints: user.truePoints,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TrueCredit API Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🇨🇦 Canada's smartest credit bill payment & rewards platform`);
});