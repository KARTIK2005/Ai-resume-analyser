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
    <div className="relative w-full h-56 flex flex-col items-center justify-center overflow-hidden">
      {/* Chart container - takes up the top part */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <RadialBarChart 
              cx="50%" 
              cy="70%" 
              innerRadius="75%" 
              outerRadius="105%" 
              barSize={28} 
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
                cornerRadius={14}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Text container - pushed down to sit inside/below the arc */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-12">
        <span className="text-5xl font-black text-slate-800 tracking-tighter">{score}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] -mt-1">
          ATS Score
        </span>
      </div>
    </div>
  );
}
