"use client";
import React from 'react';
import { useFormContext } from './FormContext';

export default function FormTextArea({ name, onChange, value, label, ...props }) {
  const { dataForm, handleChange } = useFormContext();

  const capitalizar = (str) =>
    typeof str === "string" && str.length > 0
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : "";

  const normalizar = (str) => {
    if (typeof str !== "string" || str.length === 0) return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const fieldKey = normalizar(name);

  return (
    <div className="form-floating mb-3">
    <textarea
        className="form-control text-xs"
        {...props}
        id={fieldKey}
        name={fieldKey}
        placeholder={capitalizar(label)} // Bootstrap requiere un placeholder (aunque no se muestre)
        value={dataForm?.[fieldKey] || ""}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
        required
        rows={props.rows || 3}
        style={{ height: "auto" }} // opcional si quieres altura automática
    />
    <label htmlFor={fieldKey} className=''>{capitalizar(label)}</label>
    </div>

  );
}
