import React from 'react';
import { ScoreGauge } from './Charts/ScoreGauge';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

export function ScoreCard({ score }) {
  let message, colorClass, Icon;

  if (score >= 80) {
    message = "Excellent Match!";
    colorClass = "text-green-600 bg-green-50 border-green-200";
    Icon = Target;
  } else if (score >= 60) {
    message = "Good Potential";
    colorClass = "text-amber-600 bg-amber-50 border-amber-200";
    Icon = TrendingUp;
  } else {
    message = "Needs Improvement";
    colorClass = "text-red-600 bg-red-50 border-red-200";
    Icon = AlertTriangle;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col items-center justify-center border-b border-slate-100">
        <ScoreGauge score={score} />
      </div>
      <div className={`p-4 border-t flex items-center justify-center gap-2 ${colorClass}`}>
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}
