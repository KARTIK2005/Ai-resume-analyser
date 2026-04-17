import React from 'react';
import { Target, ShieldCheck, Zap, Users } from 'lucide-react';

export default function About({ onExplore }) {
  const features = [
    {
      title: "ATS Optimization",
      desc: "Our AI helps you bypass Applicant Tracking Systems by highlighting keywords you might have missed.",
      icon: Target,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Secure & Private",
      desc: "Your data stays in your browser. We parse PDF and DOCX files locally for maximum privacy.",
      icon: ShieldCheck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Google Gemini Powered",
      desc: "Leveraging the power of state-of-the-art LLMs to provide professional resume insights.",
      icon: Zap,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Built for Students",
      desc: "Designed specifically as a final year B.Tech project to assist entry-level candidates.",
      icon: Users,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900">About AI Resume Analyzer</h2>
        <p className="text-xl text-slate-500 leading-relaxed">
          The ultimate bridge between your potential and your dream job. 
          Analyze your resume with the power of artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
              <f.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center space-y-6">
        <h3 className="text-3xl font-bold">Ready to stand out?</h3>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Start your journey towards a better professional presence today. 
          Upload your resume and get 1:1 expert-level feedback.
        </p>
        <button 
          onClick={onExplore}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
        >
          Check My Resume
        </button>
      </div>
    </div>
  );
}
