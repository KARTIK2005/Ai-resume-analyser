import React from 'react';
import { ScoreCard } from './ScoreCard';
import { SkillMatchChart } from './Charts/SkillMatchChart';
import { CheckCircle2, XCircle, Lightbulb, FileText, Download } from 'lucide-react';
import clsx from 'clsx';

export function AnalysisResult({ result }) {
  const { score = 0, matched_skills = [], missing_skills = [], suggestions = [], summary = "" } = result;

  const handleDownload = () => {
    // A simple handler to print the current window
    // In a full app, we could use html2pdf.js or similar
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 printable-area">
      <div className="flex justify-end p-hide">
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      {/* Top Section: Score & Chart */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-slate-800 px-1">ATS Score</h3>
          <div className="flex-1 min-h-[320px]">
            <ScoreCard score={score} />
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <h3 className="text-lg font-semibold text-slate-800 px-1">Skills Breakdown</h3>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex items-center justify-center min-h-[320px]">
             <SkillMatchChart 
               matchedSkillsCount={matched_skills.length} 
               missingSkillsCount={missing_skills.length} 
             />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-100 text-blue-600 p-2 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Executive Summary</h3>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              {summary || "No summary provided by the analysis."}
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-slate-900">Matched Skills</h3>
          </div>
          {matched_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matched_skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs md:text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm italic">No matching skills found.</p>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <XCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-slate-900">Missing Skills</h3>
          </div>
          {missing_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs md:text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm italic">You have all the required skills!</p>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          <h3 className="text-xl font-bold text-slate-900">Suggestions for Improvement</h3>
        </div>
        
        {suggestions.length > 0 ? (
          <ul className="space-y-4">
            {suggestions.map((sug, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-700 text-sm md:text-base">{sug}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm italic">No specific suggestions at this time.</p>
        )}
      </div>

    </div>
  );
}
