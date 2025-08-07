"use client"
import React, { useState, useEffect } from 'react';
import { useFormContext } from './FormContext';

export default function FormSelectExt({children, name, dataUrl, syncFields = [], fieldData = "id", labelField}){
    const {dataForm, handleChange, setValuesFromItem} = useFormContext();
    const [items, setItems] = useState([])

    useEffect(() => {
        if (!dataUrl) return;

        const fetchData = async () => {
        try {
            const res = await fetch(dataUrl);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Error al cargar datos del select:", error);
        }
        };

        fetchData();
    }, [dataUrl]);

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
        const selectedId = e.target.value;
        handleChange(fieldKey, selectedId);

        const selectedItem = items.find(item => String(getNestedValue(item, fieldData)) === selectedId);

        if (selectedItem && syncFields.length > 0) {
        const mappedFields = {};
        syncFields.forEach(field => {
            if (selectedItem[field]) {
            mappedFields[normalizar(field)] = selectedItem[field];
            }
        });
        
        setValuesFromItem(mappedFields, Object.keys(mappedFields));
        }
    };

    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    return (
        <div className="mb-3 form-floating">
            <select 
                id={fieldKey}
                className="form-select"
                name={fieldKey}
                value={dataForm[fieldKey] || ""}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Selecciona una opción</option>
                {children}

                {items.map((item, index) => {
                const value = getNestedValue(item, fieldData);
                    return (
                        <option value={value} key={`${value}-${index}`}>
                        {getNestedValue(item, fieldData)}
                        </option>
                    );
                })}


            </select>
            <label className='form-label'>{capitalizar(labelField)}</label>
        </div>
        
    )
}