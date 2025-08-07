// BaseForm.js
"use client"
import React, {useState, useEffect} from 'react';
import { FormContext } from './FormContext';
import { useRouter } from "next/navigation";

export default function BaseForm({ children, method = "post" , sendDataUrl , idUrlRedirect,className, urlRedirect="", onDataChange, useFormData = false, ...props }) {
  const [dataForm, setDataForm] = useState({});
  const router = useRouter();

  const handleChange = (field, value) => {
    setDataForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
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

  const submitForm = async () => {
    console.log("📦 Datos captados del formulario (objeto plano):", dataForm);
    console.log( "dataForm",dataForm);

    try {
      let response;

      if (useFormData) {
        const formData = toFormData(dataForm);

        console.log("🧾 FormData generado:");
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}: archivo ->`, value.name);
          } else {
            console.log(`${key}:`, value);
          }
        }

        response = await fetch(sendDataUrl, {
          method: "POST",
          body: formData,
        });

      } else {
        console.log("📤 Enviando como JSON...");
        response = await fetch(sendDataUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        });
      }

      if (!response.ok) {
        throw new Error(`❌ Error en la respuesta: ${response.statusText}`);
      }else{
        if(urlRedirect.length !=0){
          window.location.href = urlRedirect;
        }
      }

      const result = await response.json();
      console.log("✅ Respuesta del servidor:", result);

      // Puedes limpiar el formulario aquí si deseas
      // setDataForm({}); o con los campos iniciales

    } catch (error) {
      console.error("❗ Error al enviar el formulario:", error);
    }
  };

  return (
    <FormContext.Provider value={{dataForm, handleChange, setValuesFromItem, submitForm}}>
      <form method={method} {...props} className={`px-4 py-3 ${className}`}>
        {children}
      </form>
      
      <div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </FormContext.Provider>
  )
}

