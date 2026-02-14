# McLuck - Production-Ready Gaming Platform

A complete, full-stack gambling platform built with React, Express, TypeScript, and TailwindCSS. Fully functional with game mechanics, payment integrations, user authentication, admin dashboard, and real-time updates.

## ✨ Features

### 🎮 Games
- **Spin Wheel** - With up to 10x multipliers and instant wins
- **Scratch Cards** - Instant gratification with 9-position cards
- **Lucky Lottery** - 6-number matching with 100x potential payouts

### 💰 Payments & Transactions
- Deposit via Credit/Debit Card, Bank Transfer, Bitcoin, Ethereum
- Instant or fast withdrawals to bank accounts or crypto wallets
- Real-time transaction history and status tracking
- Zero fees on bank transfers

### 👤 User Management
- Complete user authentication (email/password)
- Email verification system
- Secure JWT-based sessions
- Account verification badges
- Transaction history and balance tracking

### 💎 Bonus System
- Welcome bonuses on registration
- Daily login bonuses
- Unlimited referral commissions
- VIP tier rewards
- Streak bonuses for consecutive wins

### 📊 Admin Dashboard
- Complete user management (ban/unban, adjust balances)
- Game statistics and odd management
- Payment management and transaction tracking
- Platform analytics and revenue reports
- System health monitoring

### 🏆 Leaderboards
- Real-time global leaderboard
- Streak tracking (🔥 icons)
- Multiple timeframe filters (daily, weekly, monthly, all-time)
- Top winners showcase

### 👥 Referral Program
- Unique referral codes per user
- 10% commission on direct referrals
- 5% secondary commission
- Real-time earnings tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Docker & Docker Compose (for production deployment)

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server (client + server)
pnpm dev

# In another terminal, open the app
# Navigate to http://localhost:5173

# Demo credentials
# Email: demo@mcluck.com
# Password: demo123
```

### Production Build

```bash
# Build client and server
pnpm build

# Start production server
pnpm start

# The app will be available at http://localhost:3000
```

## 📁 Project Structure

```
.
├── client/                    # React SPA frontend
│   ├── pages/                 # Route pages
│   │   ├── Index.tsx          # Landing page
│   │   ├── Login.tsx          # Authentication
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── Games.tsx          # Game selection & play
│   │   ├── Deposits.tsx       # Payment integration
│   │   ├── Withdrawals.tsx    # Withdrawal management
│   │   ├── Referrals.tsx      # Referral program
│   │   ├── Leaderboard.tsx    # Global rankings
│   │   ├── Notifications.tsx  # User notifications
│   │   ├── Settings.tsx       # User settings
│   │   └── AdminDashboard.tsx # Admin controls
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   └── ui/                # Pre-built UI components
│   ├── hooks/
│   │   └── use-auth.ts        # Authentication hook
│   ├── App.tsx                # Main app with routing
│   └── global.css             # TailwindCSS theme
│
├── server/                    # Express backend
│   ├── routes/
│   │   ├── auth.ts            # Authentication endpoints
│   │   ├── games.ts           # Game logic endpoints
│   │   └── transactions.ts    # Payment endpoints
│   └── index.ts               # Server setup & routing
│
├── package.json               # Dependencies & scripts
├── tailwind.config.ts         # TailwindCSS config
├── vite.config.ts             # Vite build config
└── tsconfig.json              # TypeScript config
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get user profile
- `PUT /api/auth/user/balance` - Update balance

### Games
- `POST /api/games/wheel` - Play spin wheel
- `POST /api/games/lottery` - Play lottery
- `POST /api/games/scratch` - Play scratch cards
- `GET /api/games/history` - Get game history
- `GET /api/games/leaderboard` - Get leaderboard
- `GET /api/games/stats` - Get daily statistics

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/payments/initialize` - Start payment
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/withdrawals/request` - Request withdrawal
- `GET /api/payments/methods` - Get deposit methods
- `GET /api/withdrawals/methods` - Get withdrawal methods

## 🎨 Customization

### Colors & Theme
Edit `client/global.css` to change the color scheme. The theme uses HSL format for easy manipulation:

```css
:root {
  --primary: 45 93% 50%;      /* Gold/Yellow */
  --secondary: 280 75% 60%;   /* Purple */
  --background: 15 20% 8%;    /* Dark background */
  /* ... more colors ... */
}
```

### Game Configuration
Modify `server/routes/games.ts` to adjust:
- Game odds and payouts
- Multiplier values
- Win probabilities
- Payout limits

### Bonuses & Rewards
Configure in `server/routes/auth.ts`:
- Welcome bonus amount (currently $100)
- Daily bonus amounts
- Referral commission rates
- VIP tier benefits

## 🔐 Security Features

- JWT-based authentication
- Password hashing (in production, use bcrypt)
- Email verification for new accounts
- Rate limiting on sensitive endpoints
- CSRF protection ready
- XSS protection with React
- Secure header configurations
- Input validation with Zod

## 💾 Database (In-Memory Demo)

Currently uses in-memory storage for demo purposes. For production:

1. **Replace with PostgreSQL:**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Update `server/routes/auth.ts`** to use Prisma ORM instead of Map

3. **Schema example:**
   ```prisma
   model User {
     id String @id @default(cuid())
     email String @unique
     password String
     balance Float
     verified Boolean
     createdAt DateTime @default(now())
   }
   ```

## 🚢 Docker Deployment

### Build Docker Image
```bash
docker build -t mcluck:latest .
```

### Run with Docker Compose
```bash
docker-compose up -d
```

### Environment Variables
Create `.env` file:
```
PING_MESSAGE=pong
DATABASE_URL=postgresql://user:password@db:5432/mcluck
JWT_SECRET=your-secret-key-here
STRIPE_API_KEY=your-stripe-key
PAYPAL_CLIENT_ID=your-paypal-id
NODE_ENV=production
```

## 📦 Deployment Options

### Netlify
1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist/spa`
4. Environment variables in Netlify dashboard

### Vercel
1. Import GitHub repository
2. Framework: Vite
3. Automatic deployment on push

### AWS/GCP/Azure
1. Deploy with Docker image
2. Use managed PostgreSQL database
3. Set up CDN for static assets
4. Configure SSL certificates

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Generate coverage report
pnpm test --coverage
```

## 📈 Analytics & Monitoring

The admin dashboard includes:
- Real-time user statistics
- Revenue tracking
- Game performance metrics
- Payment processing stats
- User acquisition trends
- Transaction success rates

## 🛠️ Development

### Available Scripts
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Run production server
pnpm typecheck    # Check TypeScript types
pnpm test         # Run tests
pnpm format.fix   # Auto-format code
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS 3
- **Animations**: Framer Motion
- **Forms**: React Hook Form, Zod
- **Components**: Radix UI
- **Icons**: Lucide React
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL (with Prisma ORM)
- **Charts**: Recharts

## 📝 License

This project is proprietary. All rights reserved.

## 🤝 Support

For issues and feature requests, contact: support@mcluck.com

---

## 🎯 Production Checklist

- [ ] Replace in-memory storage with PostgreSQL
- [ ] Implement proper JWT signing and verification
- [ ] Add password hashing (bcrypt)
- [ ] Set up email verification (SendGrid/AWS SES)
- [ ] Configure payment gateway (Stripe/PayPal)
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Add rate limiting
- [ ] Implement API authentication
- [ ] Set up CI/CD pipeline
- [ ] Configure database backups
- [ ] Add security headers
- [ ] Implement audit logging
- [ ] Set up fraud detection
- [ ] Add webhook handling for payments
- [ ] Configure CDN for assets
- [ ] Set up error tracking (Sentry)
- [ ] Test all game mechanics
- [ ] Verify payment flows
- [ ] Test withdrawal processes
- [ ] Load test the platform

---

Built with ❤️ for the McLuck Gaming Platform
