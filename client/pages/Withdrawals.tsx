import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Building, 
  CreditCard, 
  Bitcoin, 
  ArrowDown,
  Check,
  AlertCircle,
  Clock,
} from 'lucide-react';

const Withdrawals = () => {
  const { user, updateBalance } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState(100);
  const [processing, setProcessing] = useState(false);
  const [accountDetails, setAccountDetails] = useState('');

  const withdrawalMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Building, min: 10, max: 50000, processingTime: '1-3 days' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, min: 10, max: 10000, processingTime: '2-5 business days' },
    { id: 'btc', name: 'Bitcoin', icon: Bitcoin, min: 0.001, max: 5, processingTime: 'Instant' },
    { id: 'eth', name: 'Ethereum', icon: Bitcoin, min: 0.01, max: 50, processingTime: 'Instant' },
  ];

  const currentMethod = withdrawalMethods.find(m => m.id === selectedMethod);

  const handleWithdrawal = async () => {
    if (!selectedMethod || !amount || !accountDetails) return;
    
    if (amount > (user?.balance || 0)) {
      alert('Insufficient balance');
      return;
    }

    setProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Deduct from account
    if (user) {
      updateBalance(user.balance - amount);
    }

    setProcessing(false);
    setAmount(100);
    setSelectedMethod(null);
    setAccountDetails('');
    
    alert(`Withdrawal request submitted: $${amount.toFixed(2)}`);
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
            <h1 className="text-4xl font-bold mb-2">Withdraw Funds</h1>
            <p className="text-foreground/60">Withdraw your winnings to your preferred account</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Withdrawal Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Balance Alert */}
              <motion.div
                variants={itemVariants}
                className="p-4 rounded-lg border border-primary/30 bg-primary/5 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Available Balance</p>
                  <p className="text-2xl font-bold text-primary">${user?.balance.toFixed(2) || '0.00'}</p>
                </div>
              </motion.div>

              {/* Withdrawal Methods */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h2 className="text-2xl font-bold mb-6">Select Withdrawal Method</h2>
                <div className="space-y-4">
                  {withdrawalMethods.map((method) => (
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
                              Min: ${method.min} • Max: ${method.max} • {method.processingTime}
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {selectedMethod === method.id && (
                            <Check className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Withdrawal Details */}
              {selectedMethod && (
                <motion.div
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold">Withdrawal Details</h2>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Withdrawal Amount (USD)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        const max = currentMethod?.max || 0;
                        setAmount(Math.min(val, max));
                      }}
                      disabled={processing}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      min={currentMethod?.min || 0}
                      max={Math.min(currentMethod?.max || 0, user?.balance || 0)}
                      step="1"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Available: ${user?.balance.toFixed(2) || '0.00'} • 
                      Max: ${currentMethod?.max || 0}
                    </p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <p className="text-sm font-medium mb-3">Quick amounts</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            const max = Math.min(currentMethod?.max || 0, user?.balance || 0);
                            setAmount(Math.min(amt, max));
                          }}
                          disabled={processing || amt > (currentMethod?.max || 0) || amt > (user?.balance || 0)}
                          className={`py-2 rounded-lg font-medium transition-all text-sm ${
                            amount === amt && amount <= (currentMethod?.max || 0)
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border hover:border-primary disabled:opacity-50'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account Details */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {selectedMethod === 'btc' ? 'Bitcoin Address' : 
                       selectedMethod === 'eth' ? 'Ethereum Address' :
                       selectedMethod === 'bank' ? 'Account Number' : 'Card Number'}
                    </label>
                    <input
                      type="text"
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                      placeholder={
                        selectedMethod === 'btc' ? '1A1z7agoat...' :
                        selectedMethod === 'eth' ? '0x742d...' :
                        selectedMethod === 'bank' ? '123456789' : '4532...'
                      }
                      disabled={processing}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Withdrawal Amount</span>
                        <span className="font-medium">${amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-bold">
                        <span>Total Debit</span>
                        <span className="text-primary">${amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Withdraw Button */}
                  <button
                    onClick={handleWithdrawal}
                    disabled={processing || amount < (currentMethod?.min || 0) || !accountDetails || amount > (user?.balance || 0)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowDown className="w-5 h-5" />
                        Withdraw ${amount.toFixed(2)}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Withdrawal Info */}
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
                    <p className="font-medium text-primary">Bank Transfer</p>
                    <p className="text-muted-foreground">1-3 business days</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Card</p>
                    <p className="text-muted-foreground">2-5 business days</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Cryptocurrency</p>
                    <p className="text-muted-foreground">Instant</p>
                  </div>
                </div>
              </motion.div>

              {/* Recent Withdrawals */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h3 className="font-bold mb-4">Recent Withdrawals</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">$200.00</p>
                      <p className="text-muted-foreground">Bank Transfer</p>
                    </div>
                    <span className="text-green-500">✓ Completed</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border pt-3">
                    <div>
                      <p className="font-medium">$500.00</p>
                      <p className="text-muted-foreground">Card</p>
                    </div>
                    <span className="text-yellow-500">Processing</span>
                  </div>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h3 className="font-bold mb-4">Requirements</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Account verified
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Email confirmed
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    No pending disputes
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Withdrawals;
