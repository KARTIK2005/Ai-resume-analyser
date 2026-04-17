import { Home, Info, Menu, X, Code } from 'lucide-react';
import { useState } from 'react';

const GithubIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function Navbar({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'About Us', icon: Info, id: 'about' },
  ];

  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-3 py-2 sm:px-6 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-lg sm:text-xl leading-none italic">A</span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent xs:block">
              Resume Analyzer
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === link.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>

          {/* Github & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="https://github.com/KARTIK2005/Ai-resume-analyser" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">GitHub</span>
            </a>

            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2 pb-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === link.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
