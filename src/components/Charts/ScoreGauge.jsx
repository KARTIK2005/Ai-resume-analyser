import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export function ScoreGauge({ score }) {
  const data = [
    {
      name: 'Score',
      value: score,
      fill: score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444',
    }
  ];

  return (
    <div className="relative w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden pt-4">
      {/* Chart container */}
      <div className="w-full h-full max-w-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="80%" 
            innerRadius="80%" 
            outerRadius="120%" 
            barSize={32} 
            data={data} 
            startAngle={180} 
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              minAngle={15}
              background={{ fill: '#f1f5f9' }}
              clockWise
              dataKey="value"
              cornerRadius={16}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Centered Score Text */}
      <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center justify-center">
        <span 
          className="text-5xl sm:text-6xl font-black tracking-tighter leading-none"
          style={{ color: data[0].fill }}
        >
          {score}
        </span>
        <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
          ATS Score
        </span>
      </div>
    </div>
  );
}
