"use client"
import React, { useState } from 'react';
import { useFormContext } from './FormContext';

export default function FormSelect({children, name, label}){
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

    const fieldKey = normalizar(name);

    const handleSelectChange = (e) => {
        handleChange(fieldKey, e.target.value);
    };

    return (
        <div className="mb-3 form-floating">
            <select 
                id={name}
                className="form-select"
                name={name}
                value={dataForm[fieldKey] || ""}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Selecciona una opción</option>
                {children}
            </select>
            <label className='form-label'>{capitalizar(label)}</label>
        </div>
        
    )
}