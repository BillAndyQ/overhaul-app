"use client";
import React, {useEffect} from 'react';
import { useFormContext } from './FormContext';

export default function FormAutoDate({ config, ...props }) {
  const { dataForm, handleChange } = useFormContext();
  const fieldKey = config.field;

  const capitalizar = (str) =>
    typeof str === "string" && str.length > 0
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : "";

  const corregirFormatoFecha = (valor) => {
    if (!valor) return "";

    // Ya en formato correcto
    if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) return valor;

    // Formato dd-mm-yyyy
    if (/^\d{2}-\d{2}-\d{4}$/.test(valor)) {
      const [dd, mm, yyyy] = valor.split("-");
      return `${yyyy}-${mm}-${dd}`;
    }

    // Formato ISO con hora (ej. "2025-06-30T05:00:00.000Z")
    if (typeof valor === "string" && valor.includes("T")) {
      return valor.split("T")[0];
    }

    return valor; // deja cualquier otro valor sin modificar
  };

  const valorCorregido = corregirFormatoFecha(dataForm?.[fieldKey] || "");

  return (
    <div className="mb-3">
      <label htmlFor={fieldKey} className="form-label text-xs d-block">
        {capitalizar(config.label)}
      </label>
      <input
        type="date"
        className="text-xs d-block border rounded-3 px-2 py-1"
        {...props}
        id={fieldKey}
        name={fieldKey}
        placeholder=" "
        value={valorCorregido}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        required
      />
    </div>
  );
}
