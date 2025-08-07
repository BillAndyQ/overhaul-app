"use client"
import React, {useState, useEffect} from "react";
import { TableContext } from "@/components/table/TableContext"
import { useSearchParams } from "next/navigation";

export default function BaseTable({children, onDataChange, fieldID, dataURL, fieldData, nameTable,...props}){
    const [dataTable, setDataTable] = useState([]);
    const [fieldsTable, setFieldsTable] = useState({});

    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const URLComplete = `${dataURL}?${queryString}`;

    

    const handleChange = (field, value) => {
        setFieldsTable(prev => ({
          ...prev,
          [field]: value 
        }));
      };
      
      const setValuesFromItem = (item, fields) => {
        const newValues = {};
        fields.forEach(field => {
          if (item[field]) newValues[field] = item[field];
        });
        setFieldsTable(prev => ({ ...prev, ...newValues }));
      };
    
      // Este efecto se ejecuta después del renderizado
      useEffect(() => {
        if (onDataChange) {
          onDataChange(fieldsTable);
        }
      }, [fieldsTable, onDataChange]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(URLComplete);
            const data = await res.json();
            console.log(data);
            
            setDataTable(fieldData ? data[fieldData] : data);
          } catch (error) {
            console.error("Error al obtener productos:", error);
          }
        };

        fetchData();
      }, [URLComplete, fieldData]);

    
      const submitTable = async () => {
        console.log(fieldsTable);
      };

    return(
        <TableContext.Provider value={{dataTable, fieldsTable, fieldID, nameTable, handleChange, setValuesFromItem, submitTable}}>
            {children}
        </TableContext.Provider>
    )
}