import { Header } from '@/components/Header';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="text-center space-y-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.div>

          <div>
            <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
            <p className="text-lg text-foreground/60">
              Oops! The page you're looking for doesn't exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-card transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
