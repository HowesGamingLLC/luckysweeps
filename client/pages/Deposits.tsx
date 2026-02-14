import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Building, 
  Bitcoin, 
  Zap,
  ArrowUp,
  Check,
  Clock,
} from 'lucide-react';

const Deposits = () => {
  const { user, updateBalance } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState(100);
  const [processing, setProcessing] = useState(false);

  const depositMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2%', processingTime: 'Instant' },
    { id: 'bank', name: 'Bank Transfer', icon: Building, fee: '0%', processingTime: '1-2 days' },
    { id: 'btc', name: 'Bitcoin', icon: Bitcoin, fee: '0.5%', processingTime: 'Instant' },
    { id: 'eth', name: 'Ethereum', icon: Bitcoin, fee: '0.5%', processingTime: 'Instant' },
  ];

  const handleDeposit = async () => {
    if (!selectedMethod || !amount || amount < 10) return;

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add funds to account
    const fee = amount * (selectedMethod === 'card' ? 0.02 : selectedMethod === 'btc' || selectedMethod === 'eth' ? 0.005 : 0);
    const finalAmount = amount - fee;
    
    if (user) {
      updateBalance(user.balance + finalAmount);
    }

    setProcessing(false);
    setAmount(100);
    setSelectedMethod(null);
    
    // Show success message (you'd normally use a toast)
    alert(`Successfully deposited $${finalAmount.toFixed(2)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 md:py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-2">Deposit Funds</h1>
            <p className="text-foreground/60">Add funds to your account using multiple payment methods</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Deposit Methods */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                <div className="space-y-4">
                  {depositMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <method.icon className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-bold">{method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Fee: {method.fee} • {method.processingTime}
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {selectedMethod === method.id && (
                            <Check className="w-4 h-4 text-primary-foreground absolute" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Amount Selection */}
              {selectedMethod && (
                <motion.div
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold">Enter Amount</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Math.max(10, parseInt(e.target.value) || 0))}
                      disabled={processing}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      min="10"
                      step="10"
                    />
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <p className="text-sm font-medium mb-3">Quick amounts</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          disabled={processing}
                          className={`py-2 rounded-lg font-medium transition-all ${
                            amount === amt
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border hover:border-primary'
                          } disabled:opacity-50`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deposit Amount</span>
                        <span className="font-medium">${amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="font-medium">
                          -$
                          {(
                            amount *
                            (selectedMethod === 'card'
                              ? 0.02
                              : selectedMethod === 'btc' || selectedMethod === 'eth'
                              ? 0.005
                              : 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-bold">
                        <span>Total Credit</span>
                        <span className="text-primary">
                          $
                          {(
                            amount -
                            amount *
                              (selectedMethod === 'card'
                                ? 0.02
                                : selectedMethod === 'btc' || selectedMethod === 'eth'
                                ? 0.005
                                : 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Button */}
                  <button
                    onClick={handleDeposit}
                    disabled={processing || amount < 10}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Zap className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowUp className="w-5 h-5" />
                        Deposit ${amount.toFixed(2)}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Box */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Processing Times
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-primary">Credit/Debit Card</p>
                    <p className="text-muted-foreground">Instant</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Bank Transfer</p>
                    <p className="text-muted-foreground">1-2 business days</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Cryptocurrency</p>
                    <p className="text-muted-foreground">1-3 confirmations</p>
                  </div>
                </div>
              </motion.div>

              {/* Recent Deposits */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h3 className="font-bold mb-4">Recent Deposits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">$100.00</p>
                      <p className="text-muted-foreground">Card</p>
                    </div>
                    <span className="text-green-500">✓ Completed</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border pt-3">
                    <div>
                      <p className="font-medium">$250.00</p>
                      <p className="text-muted-foreground">Bank Transfer</p>
                    </div>
                    <span className="text-yellow-500">Pending</span>
                  </div>
                </div>
              </motion.div>

              {/* Need Help */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-primary/30 bg-primary/5"
              >
                <h3 className="font-bold mb-3">Need Help?</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Contact our support team for assistance with deposits.
                </p>
                <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium">
                  Contact Support
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Deposits;
