const { v4: uuidv4 } = require('uuid');

// Mock Users Database
const users = [
  {
    id: uuidv4(),
    email: 'john.doe@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date('2024-01-15'),
    truePoints: 2450
  }
];

// Mock Credit Cards Database
const creditCards = [
  {
    id: uuidv4(),
    userId: users[0].id,
    cardName: 'TD Cash Back Visa',
    lastFourDigits: '1234',
    balance: 1250.00,
    dueDate: '2024-02-15',
    minimumDue: 35.00,
    brand: 'visa',
    color: '#1a365d'
  },
  {
    id: uuidv4(),
    userId: users[0].id,
    cardName: 'RBC Rewards Mastercard',
    lastFourDigits: '5678',
    balance: 890.50,
    dueDate: '2024-02-20',
    minimumDue: 25.00,
    brand: 'mastercard',
    color: '#c53030'
  }
];

// Mock Transactions Database
const transactions = [
  {
    id: uuidv4(),
    userId: users[0].id,
    type: 'payment',
    amount: 150.00,
    truePointsEarned: 2.25, // 1.5% of amount
    description: 'SmartPay™ - Multiple Cards',
    date: new Date('2024-01-20'),
    cardIds: [creditCards[0].id, creditCards[1].id]
  },
  {
    id: uuidv4(),
    userId: users[0].id,
    type: 'payment',
    amount: 75.00,
    truePointsEarned: 1.13,
    description: 'PayTogether™ - TD Cash Back Visa',
    date: new Date('2024-01-18'),
    cardIds: [creditCards[0].id]
  },
  {
    id: uuidv4(),
    userId: users[0].id,
    type: 'redemption',
    amount: -10.00,
    truePointsUsed: 1000,
    description: 'CredStore™ - Tim Hortons $10 Gift Card',
    date: new Date('2024-01-16'),
    rewardItem: 'Tim Hortons $10'
  }
];

// CredStore Catalog
const credStoreCatalog = [
  {
    id: uuidv4(),
    name: 'Tim Hortons $5 Gift Card',
    pointsCost: 500,
    category: 'food',
    image: 'https://via.placeholder.com/150x100/d4342c/ffffff?text=Tim+Hortons',
    description: 'Enjoy your favorite coffee and treats',
    popular: true
  },
  {
    id: uuidv4(),
    name: 'Tim Hortons $10 Gift Card',
    pointsCost: 1000,
    category: 'food',
    image: 'https://via.placeholder.com/150x100/d4342c/ffffff?text=Tim+Hortons',
    description: 'Double the coffee, double the joy',
    popular: true
  },
  {
    id: uuidv4(),
    name: 'Walmart $10 Gift Card',
    pointsCost: 1000,
    category: 'retail',
    image: 'https://via.placeholder.com/150x100/0071ce/ffffff?text=Walmart',
    description: 'Shop for everything you need'
  },
  {
    id: uuidv4(),
    name: 'Walmart $25 Gift Card',
    pointsCost: 2500,
    category: 'retail',
    image: 'https://via.placeholder.com/150x100/0071ce/ffffff?text=Walmart',
    description: 'More savings for your shopping'
  },
  {
    id: uuidv4(),
    name: 'Subway $5 Gift Card',
    pointsCost: 500,
    category: 'food',
    image: 'https://via.placeholder.com/150x100/00543d/ffffff?text=Subway',
    description: 'Fresh ingredients, made your way'
  },
  {
    id: uuidv4(),
    name: 'Apply $10 to Credit Bill',
    pointsCost: 1000,
    category: 'bill-credit',
    image: 'https://via.placeholder.com/150x100/4a5568/ffffff?text=Bill+Credit',
    description: 'Direct credit to your card balance',
    popular: true
  },
  {
    id: uuidv4(),
    name: 'Apply $25 to Credit Bill',
    pointsCost: 2500,
    category: 'bill-credit',
    image: 'https://via.placeholder.com/150x100/4a5568/ffffff?text=Bill+Credit',
    description: 'Reduce your balance instantly'
  }
];

// AI Coach Responses
const aiCoachResponses = {
  'which card should i pay first': 'Based on your cards, I recommend paying the TD Cash Back Visa first as it has the highest balance ($1,250) and earlier due date (Feb 15). This helps avoid late fees and reduces your highest balance first.',
  'how many points do i have': `You currently have ${users[0].truePoints} TruePoints! That's enough for several rewards in the CredStore™. Check out our popular Tim Hortons gift cards or apply credits directly to your bills.`,
  'what is truepoints': 'TruePoints™ is our exclusive rewards program! You earn 1.5% back on every payment you make through TrueCredit. Use them in the CredStore™ for gift cards to Tim Hortons, Walmart, Subway, or apply them directly as bill credits.',
  'how does smartpay work': 'SmartPay™ intelligently allocates your available funds across your credit cards based on balances, due dates, and interest rates. Just tell us how much you want to pay, and we\'ll optimize the distribution!',
  'what is paytogether': 'PayTogether™ lets you pay multiple credit card bills in one seamless transaction. Select the cards you want to pay, enter the amounts, and we handle the rest with a single confirmation.',
  'default': 'Hi! I\'m your AI Coach. I can help you with questions about your cards, payments, TruePoints, and using TrueCredit features. Try asking me "Which card should I pay first?" or "How many points do I have?"'
};

module.exports = {
  users,
  creditCards,
  transactions,
  credStoreCatalog,
  aiCoachResponses
};