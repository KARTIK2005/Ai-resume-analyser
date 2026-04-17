import React, { useState } from 'react';
import { UploadResume } from '../components/UploadResume';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { AnalysisResult } from '../components/AnalysisResult';
import { parseResume } from '../services/parserService';
import { analyzeResume } from '../services/geminiService';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError('Please upload a resume first.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // 1. Parse the resume file
      const resumeText = await parseResume(resumeFile);
      
      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error("Could not extract any text from the uploaded file.");
      }

      // 2. Call Gemini API
      const analysisResult = await analyzeResume(resumeText, jobDescription);
      setResult(analysisResult);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Optimize Your Resume for ATS
        </h2>
        <p className="text-lg text-slate-500">
          Upload your resume and paste the job description to get instant feedback, 
          missing keywords, and actionable improvement suggestions.
        </p>
      </div>

      {/* Input Section - Only show when no result */}
      {!result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm">1</span>
              Upload Resume
            </h3>
            <UploadResume file={resumeFile} setFile={setResumeFile} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm">2</span>
              Job Description
            </h3>
            <JobDescriptionInput value={jobDescription} setValue={setJobDescription} />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Action Button */}
      {!result && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition-all shadow-sm shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-0.5"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              'Analyze Now'
            )}
          </button>
        </div>
      )}

      {/* Result Section */}
      {result && (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">Analysis Report</h3>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Start New Analysis
            </button>
          </div>
          <AnalysisResult result={result} />
        </div>
      )}
    </div>
  );
}
