import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:block">ExamGuard</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
            Security
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login/student">Student Login</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/login/admin">Admin Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              How It Works
            </a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Security
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login/student">Student Login</Link>
              </Button>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/login/admin">Admin Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
