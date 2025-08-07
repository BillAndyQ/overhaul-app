"use cliente"
import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';

export default function FormAutoSelect({config}){
    const {dataForm, handleChange, setValuesFromItem} = useFormContext();
    const options = config.options


    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        handleChange(fieldKey, selectedId);

        const selectedItem = options.find(item => String(getNestedValue(item, config.field)) === selectedId);

        if (selectedItem && syncFields.length > 0) {
        const mappedFields = {};
        
        setValuesFromItem(mappedFields, Object.keys(mappedFields));
        }
    };

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

    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    const fieldKey = normalizar(config.field);
    
    return(
        <div className="mb-3 form-floating">
            <select 
                id={config.field}
                className="form-select"
                name={config.field}
                value={dataForm[fieldKey] || ""}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Selecciona una opción</option>

                {options.map((item, index) => {
                const value = typeof item === 'object' ? getNestedValue(item, config.field) : item;
                const label = typeof item === 'object' ? getNestedValue(item, labelField) : item;

                return (
                    <option className='text-xs' value={value} key={value}>
                    {label}
                    </option>
                );
                })}


            </select>
            <label className='form-label'>{capitalizar(config.label)}</label>
        </div>
    )
}