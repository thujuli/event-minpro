"use client";

import { formatNumber } from "@/lib/formatter";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-01-01", waiting: 12, process: 3, success: 9, failed: 1 },
  { date: "2024-01-02", waiting: 10, process: 2, success: 10, failed: 0 },
  { date: "2024-01-03", waiting: 8, process: 1, success: 1, failed: 0 },
  { date: "2024-01-04", waiting: 11, process: 9, success: 8, failed: 2 },
  { date: "2024-01-05", waiting: 15, process: 10, success: 9, failed: 1 },
];

const TransactionChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => formatNumber(value as number)} />
        <Tooltip formatter={(value) => formatNumber(value as number)} />
        <Line
          type="monotone"
          dataKey="success"
          stroke="hsl(221.2 83.2% 53.3%)"
          strokeWidth={2}
          name="Success"
        />
        <Line
          type="monotone"
          dataKey="process"
          stroke="hsl(142.1 76.2% 36.3%)"
          strokeWidth={2}
          name="Process"
        />
        <Line
          type="monotone"
          dataKey="waiting"
          stroke="hsl(24.6 95% 53.1%)"
          strokeWidth={2}
          name="Waiting"
        />
        <Line
          type="monotone"
          dataKey="failed"
          stroke="hsl(0 72.2% 50.6%)"
          strokeWidth={2}
          name="Failed"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;
