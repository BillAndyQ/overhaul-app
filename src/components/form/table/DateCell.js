"use client"
import React from "react"

export default function DateCell({ value, onChange }) {
    function formatDate(value) {
      if (!value) return "";

      // Detectar y convertir "DD-MM-YYYY" → "YYYY-MM-DD"
      if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
        const [day, month, year] = value.split("-");
        return `${year}-${month}-${day}`;
      }

      // Si ya es formato correcto
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }

      // Si es Date u otro ISO
      try {
        const date = new Date(value);
        return date.toISOString().split("T")[0];
      } catch {
        return "";
      }
    }

  return (
    <input
      type="date"
      value={formatDate(value)}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-0 bg-transparent px-1"
    />
  )
}
