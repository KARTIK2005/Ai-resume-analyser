import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-lg ring-1 ring-slate-900/5">
        <p className="text-sm font-semibold text-slate-800">{payload[0].name}</p>
        <p className="text-sm text-slate-600">Count: <span className="font-bold">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

export function SkillMatchChart({ matchedSkillsCount, missingSkillsCount }) {
  const data = [
    { name: 'Matched Skills', value: matchedSkillsCount },
    { name: 'Missing Skills', value: missingSkillsCount },
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <div className="h-64 w-full" style={{ minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm font-medium text-slate-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
