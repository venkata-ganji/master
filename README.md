# TrueCredit MVP - Canada's Smartest Credit Management Platform

> A complete fintech MVP showcasing modern UI, intelligent payment features, and hybrid app capabilities.

## 🎯 Overview

TrueCredit is a Canadian fintech platform that allows users to:
- ✅ Link & manage all credit cards
- ✅ Use **SmartPay™** to intelligently allocate funds across cards
- ✅ Use **PayTogether™** for one-click multi-card payments
- ✅ Earn **1.5% cashback** as TruePoints™
- ✅ Redeem TruePoints in **CredStore™** for gift cards & bill credits
- ✅ Get guidance from a basic **AI Coach**

## 🛠️ Tech Stack

### Frontend (Angular 17+)
- **Angular 17+** with TypeScript
- **Tailwind CSS** for modern fintech UI
- **RxJS** for reactive programming
- **Angular Forms** with validation
- **Capacitor** for hybrid deployment
- **PWA** capabilities

### Backend (Node.js + Express)
- **Express.js** REST API
- **JWT Authentication**
- **bcryptjs** for password hashing
- **CORS** and **Helmet** for security
- **Mock data** storage (in-memory)

## 📁 Project Structure

```
truecredit/
├── client/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── splash/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── link-card/
│   │   │   │   ├── smart-pay/
│   │   │   │   ├── pay-together/
│   │   │   │   ├── rewards/
│   │   │   │   ├── cred-store/
│   │   │   │   ├── ai-coach/
│   │   │   │   └── shared/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── guards/
│   │   ├── environments/
│   │   └── assets/
│   ├── capacitor.config.ts
│   └── package.json
├── server/                 # Express Backend
│   ├── server.js
│   ├── mockData.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd truecredit
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../server
   npm run dev
   ```
   Server will run on `http://localhost:3000`

5. **Start the Frontend Development Server**
   ```bash
   cd ../client
   npm start
   ```
   App will open at `http://localhost:4200`

## 📱 Demo Credentials

Use these credentials to test the application:

**Email:** `john.doe@example.com`  
**Password:** `password`

## 🌟 Key Features & User Flow

### 1. **Splash & Onboarding**
- Beautiful animated splash screen with TrueCredit branding
- Feature highlights and call-to-action buttons
- Auto-redirect for authenticated users

### 2. **Authentication**
- Secure login/register with JWT tokens
- Form validation and error handling
- Demo credentials pre-filled for testing

### 3. **Dashboard**
- Personalized greeting and user stats
- Total balance and TruePoints display
- Quick action buttons for main features
- Credit cards overview with balances and due dates

### 4. **Link Credit Cards**
- Add new credit cards with validation
- Support for Visa, Mastercard, and Amex
- Visual card previews with brand colors

### 5. **SmartPay™**
- Intelligent fund allocation across multiple cards
- Algorithm considers balances and due dates
- Visual representation of payment distribution
- Real-time TruePoints calculation

### 6. **PayTogether™**
- Select multiple cards for payment
- One-click payment processing
- Transaction confirmation and receipt

### 7. **Rewards System**
- 1.5% cashback on all payments as TruePoints
- Transaction history with detailed breakdown
- Real-time balance updates

### 8. **CredStore™**
- Redeem TruePoints for rewards:
  - Tim Hortons gift cards ($5, $10)
  - Walmart gift cards ($10, $25)
  - Subway gift cards ($5)
  - Direct bill credits ($10, $25)
- Visual catalog with point costs
- Instant redemption processing

### 9. **AI Coach**
- Intelligent chat assistant
- Answers common questions about:
  - Payment strategies
  - TruePoints balance
  - Feature explanations
- Contextual responses based on user data

## 📱 Hybrid App Deployment

### Build for Production
```bash
cd client
npm run build
```

### Capacitor Setup (iOS/Android)
```bash
# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run capacitor:build

# Open in native IDE
npx cap open ios
npx cap open android
```

### PWA Deployment
The app is PWA-ready with:
- Service worker for offline functionality
- Manifest file for "Add to Home Screen"
- Responsive design for all devices

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#3b82f6 to #172554)
- **Secondary**: Gray shades (#f8fafc to #0f172a)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Modern card-based layout
- Smooth animations and transitions
- Mobile-first responsive design
- Consistent spacing and shadows

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Credit Cards
- `GET /api/cards/:userId` - Get user's cards
- `POST /api/cards/add` - Add new card

### Payments
- `POST /api/pay/smartpay` - SmartPay allocation
- `POST /api/pay/paytogether` - Process payments

### Rewards
- `GET /api/rewards/:userId` - Get rewards data
- `GET /api/credstore/catalog` - Get reward catalog
- `POST /api/credstore/redeem` - Redeem rewards

### AI Coach
- `POST /api/coach` - Chat with AI assistant

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- CORS protection
- Helmet security headers
- Input validation and sanitization

## 🎯 Performance Features

- Lazy loading for optimal performance
- Optimized bundle size
- Efficient state management
- Responsive images and assets
- Progressive Web App capabilities

## 🧪 Testing

### Demo Flow
1. Open app and view splash screen
2. Login with demo credentials
3. Explore dashboard and card management
4. Test SmartPay with sample data
5. Use PayTogether for payments
6. Check rewards and redeem points
7. Chat with AI Coach

### Test Data
- Pre-loaded user with credit cards
- Sample transactions and rewards
- Realistic financial data for Canada

## 🚀 Deployment Options

### Frontend
- **Vercel/Netlify** for web deployment
- **Capacitor** for iOS/Android app stores
- **PWA** for mobile web experience

### Backend
- **Railway/Render** for API hosting
- **Environment variables** for configuration
- **Database integration** ready (currently uses mock data)

## 🔄 Future Enhancements

### Phase 2 Features
- Real bank integration (Plaid/Yodlee)
- Advanced AI recommendations
- Spending analytics and insights
- Social features and sharing
- Advanced security (2FA, biometrics)

### Technical Improvements
- Real database (PostgreSQL/MongoDB)
- Comprehensive testing suite
- CI/CD pipeline
- Monitoring and analytics
- Performance optimization

## 📞 Support

### Demo Credentials
- **Email**: john.doe@example.com
- **Password**: password

### Test Cards
- TD Cash Back Visa (•••• 1234)
- RBC Rewards Mastercard (•••• 5678)

---

**🇨🇦 Built for Canadian fintech innovation**

*TrueCredit - Canada's smartest credit bill payment & rewards platform*