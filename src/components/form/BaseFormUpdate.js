// BaseForm.js

"use client"
import React, {useState, useEffect} from 'react';
import { FormContext } from './FormContext';
import Loader from "@/components/Loader";
import {getChangedFields} from '@/utils/getChangedFields.js';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

export default function BaseFormUpdate({ children, method = "post" , fieldsTables, idData , sendDataUrl = "", getDataUrl,className, onDataChange, useFormData = false, ...props }) {
  const [dataForm, setDataForm] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(fieldsTables);

  // const handleChange = (field, value) => {
  //   dataForm.
  //   setDataForm(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };
  
  const handleChange = (field, value) => {
    setDataForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getDataUrl) {
      const fetchData = async () => {
        try {
          const res = await fetch(getDataUrl);
          const json = await res.json();
          const data = json.result ?? {}
          setOriginalData(data);
          setDataForm(data);
          setLoading(true);
          
        } catch (error) {
          console.error('Error al obtener datos:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [getDataUrl]);

  
  const setValuesFromItem = (item, fields) => {
    const newValues = {};
    fields.forEach(field => {
      if (item[field]) newValues[field] = item[field];
    });
    setDataForm(prev => ({ ...prev, ...newValues }));
  };

  // Este efecto se ejecuta después del renderizado
  useEffect(() => {
    if (onDataChange) {
      onDataChange(dataForm);
    }
  }, [dataForm, onDataChange]);

  const toFormData = (obj) => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value instanceof FileList) {
        // Si es FileList, agregar cada archivo
        Array.from(value).forEach(file => {
          formData.append(key, file);
        });
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value ?? "");
      }
    });
    return formData;
  };

  function toFormDataTables(data, fieldsTables = []) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);

      } else if (fieldsTables.includes(key) && Array.isArray(value)) {
        // Serializa arrays de objetos definidos en fieldsTables
        formData.append(key, JSON.stringify(value));

      } else if (Array.isArray(value)) {
        // Si es un array simple, como ['a', 'b']
        value.forEach(val => formData.append(`${key}[]`, val));

      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));

      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }


  const submitForm = async () => {
    setIsSubmitting(true);
    const dataModificada = getChangedFields(originalData, dataForm);
    console.log("subitForm", dataModificada);
    setLoading(true)
    let formData;
    
    try {
      if(fieldsTables){
        formData = toFormDataTables(dataModificada, fieldsTables);
      }else{
        formData = toFormData(dataModificada);
      }

      console.log("🧾 FormData generado:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: archivo ->`, value.name);
        } else {
          console.log(`${key}:`, value);
        }
      }
      
      const response = await fetch(sendDataUrl + "/" + idData, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`❌ Error en la respuesta: ${response.statusText}`);
      }else{
        setOriginalData(dataForm)
      }
      
      const result = await response.json();
      console.log("✅ Respuesta del servidor:", result);

      setLoading(false)

    } catch (error) {
      console.error("❗ Error al enviar el formulario:", error);
      setLoading(false)

    }
    finally{
      setIsSubmitting(false);
    }
  };

  return (
    <FormContext.Provider value={{dataForm, setDataForm, handleChange, setValuesFromItem, submitForm, isSubmitting}}>
      <form method={method} {...props} className={`px-4 py-3 ${className}`}>
        {children}
      </form>
      {loading && <Loader />}

    </FormContext.Provider>
  )
}

