"use client";
import React from 'react';
import { useTableContext } from '@/components/table/TableContext';

export default function TableField({name, onChange, value,...props }) {
  const {fieldsTable, handleChange} = useTableContext();
  
  const capitalizar = (str) =>
  typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";
  
  const normalizar = (str) => {
    if (typeof str !== "string" || str.length === 0) return "";

    return str
      .normalize("NFD")                // separa tildes
      .replace(/[\u0300-\u036f]/g, "") // elimina los caracteres diacríticos
      .toLowerCase();                  // convierte todo a minúscula
  };
  const fieldKey = normalizar(name);

  return (
    <div className="floating-input-group">
      <input
        type="text"
        className="text-xs floating-input"
        {...props}
        id={fieldKey}
        name={fieldKey}
        placeholder=" "  // ¡Importante! espacio para activar floating
        value={fieldsTable?.[fieldKey] || ""}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        required // esto también ayuda al estado "not empty"
      />
      <label htmlFor={fieldKey} className="floating-label">{name}</label>
    </div>
  );
}
