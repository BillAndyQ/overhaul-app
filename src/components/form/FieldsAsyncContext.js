"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FieldsAsyncContext = createContext();

export function FieldsAsyncProvider({ children }) {
  const [fieldsAsync, setFieldsAsync] = useState({});

  const setAsyncField = (key, value) => {
    setFieldsAsync((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FieldsAsyncContext.Provider value={{ fieldsAsync, setAsyncField }}>
      {children}
    </FieldsAsyncContext.Provider>
  );
}

export function useFieldsAsync() {
  const context = useContext(FieldsAsyncContext);
  if (!context) {
    throw new Error("useFieldsAsync debe usarse dentro de <FieldsAsyncProvider>");
  }
  return context;
}
