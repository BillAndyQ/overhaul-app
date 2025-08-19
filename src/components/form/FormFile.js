"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "./FormContext";

export default function FormFile({ label, name, accept = "*" }) {
  const { handleChange, dataForm } = useFormContext();
  const inputRef = useRef(null);
  const [modalId] = useState(() => `fileModal-${Math.random().toString(36).slice(2)}`);

  const value = dataForm[name];

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const hasFile =
    value instanceof File ||
    (typeof value === "string" && value.trim() !== "");

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
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>

      <div className="d-flex align-items-center">
        {hasFile ? (
          <>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
            >
              Ver archivo
            </button>

            <div
              className="modal fade"
              id={modalId}
              tabIndex="-1"
              aria-hidden="true"
            >
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
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
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
              className="btn btn-outline-dark btn-sm"
              title="Adjuntar archivo"
            >
              Seleccionar archivo
            </button>

            <input
              type="file"
              ref={inputRef}
              id={name}
              accept={accept}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  handleChange(name, file); //  le pasas un File, no FileList
                }
              }}
            />

          </>
        )}
      </div>

      {/* Mostrar archivo nuevo seleccionado (local) */}
      {value instanceof File && (
        <div className="mt-2 text-muted small">
          Archivo seleccionado: <strong>{value.name}</strong>
        </div>
      )}
    </div>
  );
}
