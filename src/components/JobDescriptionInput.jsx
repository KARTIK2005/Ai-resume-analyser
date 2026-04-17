import React from 'react';

export function JobDescriptionInput({ value, setValue }) {
  return (
    <div className="w-full h-64 flex flex-col bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5">
        <p className="text-sm font-medium text-slate-700">Paste Job Description</p>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. We are looking for a Software Engineer with experience in React, Node.js, and modern web architectures..."
        className="flex-1 w-full p-4 resize-none outline-none text-slate-800 placeholder-slate-400 font-sans"
      />
    </div>
  );
}
