'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

export function RevenueChart({ data }: { data: { date: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(35,35,38,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8a8b92" />
        <YAxis tick={{ fontSize: 11 }} stroke="#8a8b92" width={36} />
        <Tooltip formatter={(v: number) => [`€${v.toFixed(2)}`, 'Revenue']} />
        <Line type="monotone" dataKey="revenue" stroke="#232326" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FunnelChart({ data }: { data: { date: string; views: number; orders: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(35,35,38,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8a8b92" />
        <YAxis tick={{ fontSize: 11 }} stroke="#8a8b92" width={30} />
        <Tooltip />
        <Bar dataKey="views" fill="rgba(35,35,38,0.15)" name="Page views" radius={[4, 4, 0, 0]} />
        <Bar dataKey="orders" fill="#e2fa5c" name="Completed orders" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
