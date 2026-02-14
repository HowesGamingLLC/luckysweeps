import { Header } from '@/components/Header';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Users, 
  TrendingUp, 
  Award, 
  Coins, 
  Shield, 
  Smartphone, 
  Gamepad2,
  ArrowRight,
  Check,
  Star,
  Crown
} from 'lucide-react';

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Live statistics
  const stats = [
    { value: '$2.4M', label: 'Total Payouts', change: '+12% this month' },
    { value: '125K+', label: 'Active Players', change: '+8.5% growth' },
    { value: '4.9★', label: 'User Rating', change: '45K+ reviews' },
    { value: '98%', label: 'Uptime', change: 'Industry leading' },
  ];

  // Games offered
  const games = [
    { name: 'Spin Wheel', icon: '🎡', players: '45K playing' },
    { name: 'Scratch Cards', icon: '🎫', players: '38K playing' },
    { name: 'Lucky Lottery', icon: '🎰', players: '29K playing' },
    { name: 'Daily Bonuses', icon: '🎁', players: '52K daily' },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Verified Player',
      content: 'Won $500 on my first week! McLuck is legitimate and pays out fast.',
      avatar: '👩‍💼',
      amount: '$500 won',
    },
    {
      name: 'Alex Chen',
      role: 'Trusted User',
      content: 'Been playing for 6 months. The games are fair and the support team is amazing.',
      avatar: '👨‍💻',
      amount: '$2,350 won',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Power User',
      content: 'Love the referral program! Made $1200 from referring friends.',
      avatar: '👩‍🎓',
      amount: '$1,200 earned',
    },
    {
      name: 'James Wilson',
      role: 'VIP Member',
      content: 'Excellent security and instant withdrawals. Highly recommend!',
      avatar: '👨‍💼',
      amount: '$4,800 won',
    },
  ];

  // Trust badges
  const badges = [
    { icon: Shield, text: 'Licensed & Regulated' },
    { icon: Coins, text: 'Instant Payouts' },
    { icon: Users, text: '24/7 Support' },
    { icon: Award, text: 'Fair & Certified' },
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'Premium Games',
      description: 'Spin wheels, scratch cards, lotteries, and more with stunning animations',
    },
    {
      icon: TrendingUp,
      title: 'Real Winnings',
      description: 'Withdraw your winnings instantly to your bank or cryptocurrency wallet',
    },
    {
      icon: Users,
      title: 'Refer & Earn',
      description: 'Earn unlimited commissions by referring friends with your unique link',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Bank-level encryption and responsible gaming features built-in',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Play on any device - desktop, tablet, or mobile with full functionality',
    },
    {
      icon: Crown,
      title: 'VIP Rewards',
      description: 'Exclusive bonuses, early access to new games, and premium support',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-12 md:pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-secondary/10 to-transparent rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">125K+ players earning daily</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block">Win Big, Play Fair</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                on McLuck
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
            >
              Join thousands of verified players winning real money. Instant payouts, certified games, 24/7 support.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                Start Playing Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/games"
                className="w-full sm:w-auto border border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/10 transition-colors"
              >
                View Games
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No fees on deposits</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Fast payouts (24h)</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Licensed & verified</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image Placeholder with gradient */}
          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-24 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card to-card/50 p-8 md:p-12">
              <motion.div
                className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-xl flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-6xl">🎡</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="relative py-12 md:py-16 border-t border-b border-border bg-card/30">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-xl border border-border bg-gradient-to-br from-card/50 to-background/50"
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Choose Your Game
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-foreground/60 max-w-2xl mx-auto"
            >
              From spin wheels to scratch cards - win real money with our certified games
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {games.map((game, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-4">{game.icon}</div>
                <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground">{game.players}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 md:py-24 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Why Choose McLuck?
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-background/50 hover:border-primary/50 transition-all"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Real Players, Real Wins
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-foreground/60 max-w-2xl mx-auto"
            >
              Join verified players who are winning real money every day
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-card/50 to-background/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-4 text-foreground/80">{testimonial.content}</p>
                <p className="text-sm font-bold text-primary">{testimonial.amount}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="relative py-16 md:py-24 bg-card/30">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-4xl font-bold mb-2"
            >
              Trusted & Certified
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-background/50 text-center"
              >
                <badge.icon className="w-8 h-8 text-primary mb-3" />
                <p className="font-semibold text-sm">{badge.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            className="relative rounded-2xl p-8 md:p-16 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Background gradients */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10 text-center space-y-6">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold"
              >
                Ready to Start Winning?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-foreground/70 max-w-2xl mx-auto text-lg"
              >
                Sign up now and get your welcome bonus. No hidden fees, no waiting.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-primary-foreground text-primary px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up Free
                </Link>
                <Link
                  to="/login"
                  className="text-primary underline hover:no-underline font-medium"
                >
                  Already have an account? Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border bg-card/30 py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">McLuck</h3>
              <p className="text-sm text-muted-foreground">
                Licensed & certified gaming platform with fair games and instant payouts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Games</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/games" className="hover:text-primary transition-colors">Spin Wheel</Link></li>
                <li><Link to="/games" className="hover:text-primary transition-colors">Scratch Cards</Link></li>
                <li><Link to="/games" className="hover:text-primary transition-colors">Lottery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
                <li><Link to="/notifications" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-muted-foreground cursor-default">Terms of Service</span></li>
                <li><span className="text-muted-foreground cursor-default">Privacy Policy</span></li>
                <li><span className="text-muted-foreground cursor-default">Responsible Gaming</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 McLuck Gaming. All rights reserved. Licensed & certified.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
