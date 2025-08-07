// FileCell.jsx
"use client"
import React, { useRef, useState, useEffect } from "react";
// O usa cualquier otro ícono de tu preferencia

export default function FileCell({ onChange, value, accept = "*", className = "" }) {
  const inputRef = useRef(null);
  const [modalId] = useState(() => `fileModal-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
      import('bootstrap/dist/js/bootstrap.bundle.js');
    }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const hasFile = value instanceof File || (typeof value === "string" && value.trim() !== "");
  const getFileUrl = () => {
  if (value instanceof File) {
    return URL.createObjectURL(value);
  } else if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.startsWith("http")) {
      return trimmed;
    }

    // Normaliza ruta para evitar problemas con "\" en Windows
    const normalizedPath = trimmed.replace(/\\/g, "/").replace(/^public\//, "");

    return `/${normalizedPath}`;
  }

  return "";
};

  const fileUrl = getFileUrl();
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>

      {hasFile ? (
        <>
          <button
            type="button"
            className="btn w-full btn-outline-dark border-0 m-0 btn-sm p-0 rounded-0"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 24 24"><g fill="currentColor"><path d="m12 2l.117.007a1 1 0 0 1 .876.876L13 3v4l.005.15a2 2 0 0 0 1.838 1.844L15 9h4l.117.007a1 1 0 0 1 .876.876L20 10v9a3 3 0 0 1-2.824 2.995L17 22H7a3 3 0 0 1-2.995-2.824L4 19V5a3 3 0 0 1 2.824-2.995L7 2z"/><path d="M19 7h-4l-.001-4.001z"/></g></svg>
          </button>
          <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Archivo: {value instanceof File ? value.name : value}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <iframe
                    src={fileUrl}
                    style={{ width: "100%", height: "80vh", border: "none" }}
                    title="Archivo"
                  ></iframe>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>

      ) : (
        <>
          <button
            type="button"
            onClick={handleClick}
            className="btn w-full btn-outline-dark border-0 m-0 btn-sm p-0 rounded-0"
            title="Adjuntar archivo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"/></svg>
          </button>
          
          <input
            type="file"
            ref={inputRef}
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onChange(file);
            }}
          />
        </>
        
      )}

      
    </div>
  );
}
