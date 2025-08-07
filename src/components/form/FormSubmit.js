"use client"
import React, {useContext} from 'react';
import { FormContext } from './FormContext';

export default function FormSubmit({children, ...props}){
    const { submitForm } = useContext(FormContext);

    return (
        <button {...props} type='button' className="btn btn-primary"  onClick={submitForm}>{children || "Registrar"}</button>
    )
}