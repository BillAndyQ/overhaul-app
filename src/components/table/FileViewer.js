"use client";
import React, { useState, useEffect } from "react";

export default function FileViewer({ value, className = "" }) {
  const [modalId] = useState(() => `fileModal-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js');
  }, []);

  const getFileUrl = () => {
    if (value instanceof File) return URL.createObjectURL(value);
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.startsWith("http")) return trimmed;
      return `/${trimmed.replace(/\\/g, "/").replace(/^public\//, "")}`;
    }
    return "";
  };

  const fileUrl = getFileUrl();
  if (!fileUrl || value.length==0) return <div className="text-muted w-10 m-0"></div>;

  return (
    <div className={`d-flex align-items-center m-0 p-0 justify-content-center ${className}`}>
      <button
        type="button"
        className="btn btn-outline-dark w-10 border-0 m-0 p-0 rounded-0"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 24 24"><g fill="currentColor"><path d="m12 2l.117.007a1 1 0 0 1 .876.876L13 3v4l.005.15a2 2 0 0 0 1.838 1.844L15 9h4l.117.007a1 1 0 0 1 .876.876L20 10v9a3 3 0 0 1-2.824 2.995L17 22H7a3 3 0 0 1-2.995-2.824L4 19V5a3 3 0 0 1 2.824-2.995L7 2z"/><path d="M19 7h-4l-.001-4.001z"/></g></svg>

      </button>
      <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Archivo: {value instanceof File ? value.name : value}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <iframe src={fileUrl} style={{ width: "100%", height: "80vh", border: "none" }} title="Archivo" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
