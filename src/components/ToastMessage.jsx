"use client";
import { useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default function ToastMessage({ message = "✅ Enviado correctamente" }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new bootstrap.Toast(toastRef.current);
      toast.show();
    }
  }, []);

  return (
    <div
      ref={toastRef}
      className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}
