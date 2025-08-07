"use client";
import React from "react";
import BaseForm from "./form/BaseForm";
import FormField from "./form/FormField";
import FormSubmit from "./form/FormSubmit";

export default function Login({urlAuth, urlRedirect = ""}) {
  
  return (
    <div className="login-container h-screen w-screen start-0 position-absolute d-flex align-items-center justify-content-center">
        <div className="card-login">
            <legend>Login</legend>
            <BaseForm sendDataUrl={urlAuth} urlRedirect={urlRedirect}>
                <FormField name={"username"} label={"Usuario"}></FormField>
                <FormField name={"password"} type="password" label={"Contraseña"}></FormField>
                <FormSubmit>Acceder</FormSubmit>
            </BaseForm>
        </div>
      
      <style jsx>{`
        .login-container {
          background-image: linear-gradient(to top, #0a2133 0%, #094374 100%);
          padding: 2rem;
          color: white;
          text-align: center;
        }
        .card-login {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          color: white;
          max-width: 300px;
          margin: 100px auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}
