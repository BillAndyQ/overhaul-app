"use client"
import React from "react";

export default function BtnLogout({ urlLogout, className = "", children }) {
  
  const handleLogout = async () => {
    try {
      const response = await fetch(urlLogout, {
        method: "POST",
        credentials: "include", // Enviar cookies si es necesario
      });
      if (response.ok) {
        // Redireccionar o limpiar estado local si es necesario
        window.location.href = "/login"; 
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor de logout", error);
    }
  };

  return (
    <button onClick={handleLogout} className={`${className} d-flex align-items-center gap-2`} >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
      {children}
    </button>
  );
}
