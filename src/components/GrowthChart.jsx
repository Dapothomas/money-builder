import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatter } from '../util/investment';

// Bonus 3: line chart visualising investment growth over time.
// Requires recharts: npm install recharts
const GrowthChart = ({ data }) => {
  const chartData = data.map((yearData) => ({
    year: `Y${yearData.year}`,
    Value: Math.round(yearData.valueEndOfYear),
    Interest: Math.round(yearData.interest),
  }));

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 12, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="#2a3f34" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#9fb3a6' }}
            axisLine={{ stroke: '#2a3f34' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => formatter.format(value)}
            width={84}
            tick={{ fontSize: 11, fill: '#9fb3a6' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => formatter.format(value)}
            contentStyle={{
              background: '#16261e',
              border: '1px solid #2a3f34',
              borderRadius: 8,
              color: '#eef2ea',
            }}
            labelStyle={{ color: '#eef2ea' }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#9fb3a6' }} />
          <Line
            type="monotone"
            dataKey="Value"
            stroke="#d4af37"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Interest"
            stroke="#57a693"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
