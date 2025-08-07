// TableContext.js

"use client";
import { createContext, useContext } from "react";

export const TableContext = createContext(null);

export const useTableContext = () => useContext(TableContext);
