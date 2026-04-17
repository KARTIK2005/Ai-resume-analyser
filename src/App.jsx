import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import { Navbar } from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Floating Glass Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area with padding for the floating navbar */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {currentPage === 'home' ? <Home /> : <About onExplore={() => setCurrentPage('home')} />}
      </main>

      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs italic">A</span>
              </div>
              <span className="font-bold text-slate-900">AI Resume Analyzer</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Empowering candidates with AI-driven insights for professional success.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-semibold text-slate-400">
            <button onClick={() => setCurrentPage('home')} className="hover:text-slate-900 transition-colors">Home</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-slate-900 transition-colors">About Us</button>
            <a href="https://github.com/KARTIK2005/Ai-resume-analyser" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">Source Code</a>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} AI Resume Analyzer. <br className="md:hidden" />
            Final Year B.Tech Project.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
