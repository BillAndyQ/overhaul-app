"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Enero", ventas: 400 },
  { name: "Febrero", ventas: 300 },
  { name: "Marzo", ventas: 500 },
  { name: "Abril", ventas: 200 },
];

export default function Page() {
  return (
    <div className="px-6 py-4">
      <legend className="text-2xl font-bold mb-6">📊 Dashboard</legend>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta con gráfico */}
        <div className="border rounded-2xl p-4 shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Ventas por Mes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Otra tarjeta */}
        <div className="border rounded-2xl p-4 shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Resumen</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Total Ventas:</span>
              <span className="font-bold">1400</span>
            </li>
            <li className="flex justify-between">
              <span>Clientes Nuevos:</span>
              <span className="font-bold">25</span>
            </li>
            <li className="flex justify-between">
              <span>Pedidos Pendientes:</span>
              <span className="font-bold">8</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
