"use client";
import React from 'react';
import { useFormContext } from './FormContext';

export default function FormAutoFieldNum({config,...props }) {
  const {dataForm, handleChange} = useFormContext();
  
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
  const fieldKey = config.field;
  
  return (
    <div className="floating-input-group mb-3">
      <input
        type="number"
        className="text-xs floating-input"
        {...props}
        id={fieldKey}
        name={fieldKey}
        placeholder=" "  // ¡Importante! espacio para activar floating
        value={dataForm?.[fieldKey] || ""}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        required // esto también ayuda al estado "not empty"
      />
      <label htmlFor={fieldKey} className="floating-label">{capitalizar(config.label)}</label>
    </div>
  );
}
