import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary-foreground" />
            </div>
            <span className="font-bold text-lg">ExamGuard</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <a href="#features" className="opacity-80 hover:opacity-100 transition-opacity">
              Features
            </a>
            <a href="#how-it-works" className="opacity-80 hover:opacity-100 transition-opacity">
              How It Works
            </a>
            <a href="#security" className="opacity-80 hover:opacity-100 transition-opacity">
              Security
            </a>
          </nav>

          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} ExamGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
