// FormContext.js

"use client";
import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export const useFormContext = () => useContext(FormContext);