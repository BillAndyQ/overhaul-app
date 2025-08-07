"use client";
import { useFormContext } from './FormContext';
import { useEffect } from 'react';

export default function FormFile({ label, name }) {
  const { handleChange, dataForm } = useFormContext();

  const value = dataForm[name];

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const isRemoteFile = typeof value === 'string' && value.length > 0;

  const localFile = (value instanceof File)
    ? value
    : (value && value.length && value[0] instanceof File)
      ? value[0]
      : null;

  const fileUrl = `http://localhost:3000/uploads/${value}`;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>

      {/* Mostrar archivo actual desde la URL */}
      {isRemoteFile && (
        <div className="mb-2">
          {/* Botón que abre el modal */}
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#fileModal"
          >
            Abrir archivo
          </button>

          {/* Modal scrollable */}
          <div
            className="modal fade"
            id="fileModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Archivo: {value}</h5>
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
                    style={{ width: '100%', height: '80vh', border: 'none' }}
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
        </div>
      )}

      {!isRemoteFile && (
        <input
          className="form-control"
          type="file"
          name={name}
          id={name}
          onChange={(e) => handleChange(name, e.target.files)}
        />
      )}

      {/* Mostrar archivo local si fue seleccionado */}
      {localFile && (
        <div className="mt-2 text-muted small">
          Archivo nuevo seleccionado: <strong>{localFile.name}</strong>
        </div>
      )}
    </div>
  );
}
