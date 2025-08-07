"use client"
import React, { useState } from 'react';
import FormField from '@/components/form/FormField';
import BaseForm from '@/components/form/BaseForm';
import FormSubmit from '@/components/form/FormSubmit';
import FormSelect from '@/components/form/FormSelect';
import FormSelectExt from '@/components/form/FormSelectExt';
import FormDataList from '@/components/form/FormDataList';

export default function Form() {
  const [dataForm, setDataForm] = useState({})

  function getDireccion(){
    dataForm.key = "Mouse"
    dataForm.valor = "Ratón"
    dataForm.certificadora = "overhaul"
    updateFields()
    
    console.log(dataForm);
  }
  
  function updateFields() {
    setDataForm(prev => ({
      ...prev
    }));
  }
  
  return (
    <div>
        <BaseForm onDataChange = {setDataForm} sendDataUrl="">
          <legend>Formulario</legend>
            <FormField name="key" label={"key"}/>
            <FormField name="valor" label={"valor"}/>

            <FormSelect name="certificadora">
              <option value="overhaul">Overhaul</option>
              <option value="prexa">Prexa</option>
            </FormSelect>
            
            <FormSelectExt name="email" dataUrl="https://jsonplaceholder.typicode.com/users" fieldData='email' labelField="email"></FormSelectExt>
            <FormSelectExt name="name" dataUrl="https://jsonplaceholder.typicode.com/users" fieldData='name' labelField="name"></FormSelectExt>
            <FormSelectExt name="company" dataUrl="https://jsonplaceholder.typicode.com/users" fieldData='company.name' labelField="company"></FormSelectExt>
            
            <FormDataList/>
            <FormSubmit/>
        </BaseForm>
        <button onClick={getDireccion}>
          Test
        </button>
   </div>
  );
}




// Aplicar un diseño inteligente y automático

// nav
// h1
// button

// h-15 altura de elemento
// d-flex Para que sea flexible
// justify-content-center Para centrar horizontalmente
// align-items-center Para centrar verticalmente
// fs-4 Para que el tamaño de fuente sea 4
// align-items

// mx-3 Para que tenga un margen horizontal de 3 unidades
// position-relative Para que el elemento se posicione relativo al nav
// position-absolute Para que el elemento se posicione absolutamente dentro del nav
// end-0 Para que el elemento se posicione al final del nav
// btn estilo boton de bootstrap
// btn-primary Para que el botón tenga el estilo primario de bootstrap

