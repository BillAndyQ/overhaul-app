// TableFormContext.tsx
import React, { createContext, useContext } from "react";

const TableFormContext = createContext(null);

export const TableFormProvider = ({ children, value }) => {
  return <TableFormContext.Provider value={value}>{children}</TableFormContext.Provider>;
};

export const useTableForm = () => useContext(TableFormContext);
