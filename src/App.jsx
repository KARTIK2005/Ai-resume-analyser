import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">A</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              AI Resume Analyzer
            </h1>
          </div>
          <nav>
            <a href="https://github.com/KARTIK2005/Ai-resume-analyser" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              GitHub Repo
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Home />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AI Resume Analyzer. Built for Final Year B.Tech Project.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
